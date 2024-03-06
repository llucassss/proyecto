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
    cargarProductos();
});

function agregarProducto() {
    // Obtener los valores del formulario
    var nombreProducto = document.getElementById("nombreProducto").value;
    var precioProducto = document.getElementById("precioProducto").value;
    var stockProducto = document.getElementById("stockProducto").value;
    var marcaProducto = document.getElementById("marcaProducto").value;
    var informacionProducto = document.getElementById("informacionProducto").value;

    // Validar que los campos no estén vacíos
    if (nombreProducto.trim() === "" || precioProducto.trim() === "" || 
        stockProducto.trim() === "" || marcaProducto.trim() === "" || informacionProducto.trim() === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Obtener la lista actual de productos desde localStorage
    var productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Genera el ID
    var idProducto = (productos.length + 1).toString();

    // Crea el objeto del producto
    var producto = {
        id: idProducto,
        nombre: nombreProducto,
        precio: precioProducto,
        stock: stockProducto,
        marca: marcaProducto,
        informacion: informacionProducto
    };

    // Agregar el nuevo producto a la lista
    productos.push(producto);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    // Limpiar el formulario
    document.getElementById("formularioProductos").reset();

    // Recargar la tabla de productos
    cargarProductos();
}

function cargarProductos() {
    // Obtener la lista de productos desde localStorage
    var productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Obtener el cuerpo de la tabla
    var cuerpoTabla = document.getElementById("cuerpoTablaProductos");

    // Limpiar la tabla antes de cargar los nuevos datos
    cuerpoTabla.innerHTML = "";

    // Agregar filas a la tabla
    productos.forEach(function(producto, index) {
        var fila = cuerpoTabla.insertRow();

        var celda1 = fila.insertCell(0);
        celda1.textContent = producto.id;

        var celda2 = fila.insertCell(1);
        celda2.textContent = producto.nombre;

        var celda3 = fila.insertCell(2);
        celda3.textContent = producto.precio;

        var celda4 = fila.insertCell(3);
        celda4.textContent = producto.stock;

        var celda5 = fila.insertCell(4);
        celda5.textContent = producto.marca;

        var celda6 = fila.insertCell(5);
        celda6.textContent = producto.informacion;

        // Agregar los botones de editar y eliminar
        var celda7 = fila.insertCell(6);
        celda7.innerHTML = '<button onclick="editarProducto(' + index + ')">Editar</button> ' +
                          '<button onclick="eliminarProducto(' + index + ')">Eliminar</button>';
    });
}

function editarProducto(index) {
    // Obtener la lista actual de productos desde localStorage
    var productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Obtener el producto que se va a editar
    var productoEditar = productos[index];

    // Llenar el formulario con los datos del producto
    document.getElementById("nombreProducto").value = productoEditar.nombre;
    document.getElementById("precioProducto").value = productoEditar.precio;
    document.getElementById("stockProducto").value = productoEditar.stock;
    document.getElementById("marcaProducto").value = productoEditar.marca;
    document.getElementById("informacionProducto").value = productoEditar.informacion;

    // Eliminar el producto de la lista
    productos.splice(index, 1);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    // Recargar la tabla de productos
    cargarProductos();
}

function eliminarProducto(index) {
    // Obtener la lista actual de productos desde localStorage
    var productos = JSON.parse(localStorage.getItem("productos")) || [];

    // Eliminar el producto de la lista
    productos.splice(index, 1);

    // Guardar la lista actualizada en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));

    cargarProductos();
}

function cerrarSesion() {
    // Envía al inicio de sesión
    window.location.href = "login.html";
}

function ventas() {
    // Envía a las ventas
    window.location.href = "venta.html";
}

function buscarProducto() {
    var filtro = document.getElementById("busquedaProducto").value.toLowerCase();
    var productos = JSON.parse(localStorage.getItem("productos")) || [];
    var cuerpoTabla = document.getElementById("cuerpoTablaProductos");

    cuerpoTabla.innerHTML = "";

    productos.forEach(function(producto, index) {
        if (producto.nombre.toLowerCase().includes(filtro)) {
            var fila = cuerpoTabla.insertRow();

            var celda1 = fila.insertCell(0);
            celda1.textContent = producto.id;

            var celda2 = fila.insertCell(1);
            celda2.textContent = producto.nombre;

            var celda3 = fila.insertCell(2);
            celda3.textContent = producto.precio;

            var celda4 = fila.insertCell(3);
            celda4.textContent = producto.stock;

            var celda5 = fila.insertCell(4);
            celda5.textContent = producto.marca;

            var celda6 = fila.insertCell(5);
            celda6.textContent = producto.informacion;

            var celda7 = fila.insertCell(6);
            celda7.innerHTML = '<button onclick="editarProducto(' + index + ')">Editar</button> ' +
                              '<button onclick="eliminarProducto(' + index + ')">Eliminar</button>';
        }
    });
}
