window.onload = function () {
    listarClientes();
}

let objClientes;

async function listarClientes() {
    objClientes = {
        url: "Clientes/listarClientes",
        cabeceras: ["ID Cliente", "ID Usuario", "Nombre Usuario", "Email","Nombre", "Apellido", "Telefono"],
        propiedades: ["idCliente", "idUsuario", "nombreUsuario", "email", "nombre", "apellido", "telefono"],
        editar: true,
        eliminar: true,
        propiedadID: "idCliente"
    }
    pintar(objClientes);
}

function MostrarModal() {
    // LimpiarDatos("frmLaboratorio");
    var myModal = new bootstrap.Modal(document.getElementById('modalCliente'));
    myModal.show();
}

async function GuardarCliente() {
    let form = document.getElementById("frmCliente");
    let frm = new FormData(form);

    // Obtener los valores de los campos

    let nombre = document.getElementById("nombre");
    let apellido = document.getElementById("apellido");
    let nombreUsuario = document.getElementById("nombreUsuario");
    let telefono = document.getElementById("telefono");
    let email = document.getElementById("email");

    let contraseña = nombre.value.trim() + apellido.value.trim();

    // Solo encriptar si la contraseña no está vacía
    if (contraseña.trim() !== "") {
        let contraseñaEncrip = await encriptarSha256(contraseña); // Encriptación
        console.log("mi contrase:" + contraseñaEncrip);

        frm.append("contraseña", contraseñaEncrip); // Añadir contraseña encriptada
    } else {
        // Si la contraseña está vacía, no agregarla o agregar un valor por defecto si es necesario
        frm.append("contrasena", ""); // O cualquier valor predeterminado
    }

    for (let [key, value] of frm.entries()) {
        console.log(`${key}: ${value}`);
    }
    // Validar que ningún campo esté vacío o solo tenga espacios en blanco
    if (!nombre.value.trim() || !apellido.value.trim() || !nombreUsuario.value.trim()  || !telefono.value.trim() || !email.value.trim()) {
        Swal.fire("Error", "Por favor, complete todos los campos.", "error");
        return;
    }

    fetchPost("Clientes/GuardarCliente", "text", frm, function (res) {


        if (res >= 0) {
            Swal.fire("Guardado", "Se guardo empleado correctamente.", "success");
            listarClientes();
            LimpiarDatos("frmCliente");

            var myModal = bootstrap.Modal.getInstance(document.getElementById('modalCliente'));
            myModal.hide();
        } else {
            Swal.fire("Eror", "No se puedo guardar empleado", "error");
        }

    });
}

function LimpiarClientes() { 
    LimpiarDatos("frmCliente");
    listarClientes();
}

function Editar(id) {
    console.log(id);
    fetchGet("Clientes/RecuperarCliente/?idCliente=" + id, "json", function (data) {
        setN("idCliente", data.idCliente);
        setN("idUsuario", data.idUsuario);
        setN("nombre", data.nombre);
        SetN("nombreUsuario", data.nombreUsuario);
        setN("apellido", data.apellido);
        setN("email", data.email);
        setN("telefono", data.telefono);


        // Show the modal
        var myModal = new bootstrap.Modal(document.getElementById('modalCliente'));
        myModal.show();
    });
} 