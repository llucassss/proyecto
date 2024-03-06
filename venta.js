document.addEventListener("DOMContentLoaded", function() {
    var userRole = localStorage.getItem("userRole");
    if (userRole) {
        var userRoleElement = document.getElementById("userRole");
        userRoleElement.textContent = "Rol: " + userRole;
        if (userRole === "admin") {
            userRoleElement.classList.add("admin");
        } else if (userRole === "empleado") {
            userRoleElement.classList.add("empleado");
        }
    }
    cargarVentas();
});

function registrarVenta() {
    // Obtener valores del formulario
    var nombreProducto = document.getElementById("nombreProducto").value;
    var cantidadVendida = document.getElementById("cantidadVendida").value;
    var precioVenta = document.getElementById("precioVenta").value;

    // Validar que los campos no estén vacíos
    if (nombreProducto.trim() === "" || cantidadVendida.trim() === "" || precioVenta.trim() === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Calcular el total de la venta
    var total = cantidadVendida * precioVenta;

    // Crear objeto de venta
    var venta = {
        nombre: nombreProducto,
        cantidad: cantidadVendida,
        precio: precioVenta,
        total: total
    };

    // Obtener la lista actual de ventas desde localStorage
    var ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // Agregar la nueva venta a la lista
    ventas.push(venta);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("ventas", JSON.stringify(ventas));

    // Limpiar el formulario
    document.getElementById("formularioVenta").reset();

    // Recargar la tabla de ventas
    cargarVentas();
}

function cargarVentas(ventasMostradas) {
    // Obtener la lista de ventas desde localStorage
    var ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // Si no se proporciona ventasMostradas, usar todas las ventas
    ventasMostradas = ventasMostradas || ventas;

    // Obtener el cuerpo de la tabla
    var cuerpoTabla = document.getElementById("cuerpoTablaVentas");

    // Limpiar la tabla antes de cargar los nuevos datos
    cuerpoTabla.innerHTML = "";

    // Variable para almacenar el total de ventas
    var totalVentas = 0;

    // Agregar filas a la tabla y calcular el total de ventas
    ventasMostradas.forEach(function(venta, index) {
        var fila = cuerpoTabla.insertRow();

        var celda1 = fila.insertCell(0);
        celda1.textContent = venta.nombre;

        var celda2 = fila.insertCell(1);
        celda2.textContent = venta.cantidad;

        var celda3 = fila.insertCell(2);
        celda3.textContent = venta.precio;

        var celda4 = fila.insertCell(3);
        celda4.textContent = venta.total.toFixed(2);

        // Agregar el total de esta venta al total general
        totalVentas += venta.total;

        // Agregar los botones de editar y eliminar
        var celda5 = fila.insertCell(4);

        var botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", function () {
            editarVenta(index);
        });
        celda5.appendChild(botonEditar);

        var botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function () {
            eliminarVenta(index);
        });
        celda5.appendChild(botonEliminar);
    });

    // Mostrar el total de las ventas debajo de la tabla
    var totalVentasElement = document.getElementById("totalVentas");
    totalVentasElement.textContent = "Total de ventas: " + totalVentas.toFixed(2);
}

function eliminarVenta(index) {
    // Obtener la lista de ventas desde localStorage
    var ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // Eliminar la venta seleccionada de la lista
    ventas.splice(index, 1);

    // Actualizar la lista en localStorage
    localStorage.setItem("ventas", JSON.stringify(ventas));

    // Recargar la tabla de ventas
    cargarVentas();
}

function editarVenta(index) {
    // Obtener la lista de ventas desde localStorage
    var ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // Obtener la venta específica que se va a editar
    var ventaAEditar = ventas[index];

    // Llenar el formulario con los valores de la venta seleccionada
    document.getElementById("nombreProducto").value = ventaAEditar.nombre;
    document.getElementById("cantidadVendida").value = ventaAEditar.cantidad;
    document.getElementById("precioVenta").value = ventaAEditar.precio;

    // Eliminar la venta seleccionada de la lista
    ventas.splice(index, 1);

    // Actualizar la lista en localStorage
    localStorage.setItem("ventas", JSON.stringify(ventas));

    // Recargar la tabla de ventas
    cargarVentas();
}

function cerrarSesion() {
    // Enviar al formulario de inicio de sesión
    window.location.href = "login.html";
}

document.getElementById("buscarVentas").addEventListener("input", function() {
    var term = this.value.toLowerCase(); // Obtener el término de búsqueda y convertirlo a minúsculas

    // Obtener la lista de ventas desde localStorage
    var ventas = JSON.parse(localStorage.getItem("ventas")) || [];

    // Filtrar las ventas que coincidan con el término de búsqueda
    var ventasFiltradas = ventas.filter(function(venta) {
        return venta.nombre.toLowerCase().includes(term) || 
               venta.cantidad.toString().includes(term) || 
               venta.precio.toString().includes(term) || 
               venta.total.toString().includes(term);
    });

    // Volver a cargar la tabla con las ventas filtradas
    cargarVentas(ventasFiltradas);
});
