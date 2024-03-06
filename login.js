function login() {
    var user = document.getElementById("Usuario").value;
    var pass = document.getElementById("Contraseña").value;

    // Verifica los datos del login
    if (user === "admin" && pass === "admin") {
        localStorage.setItem("userRole", "admin");
        window.location.href = "stock.html";
    } else if (user === "empleado" && pass === "empleado") {
        localStorage.setItem("userRole", "empleado");
        window.location.href = "venta.html";
    } else {
        alert("Datos incorrectos");
    }
}