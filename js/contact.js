const formulario = document.querySelector('.formulario');
const errorNombre = document.getElementById('name-error');
const errorApellido = document.getElementById('apellido-error');
const errorTelefono = document.getElementById('telefono-error');
const errorCorreo = document.getElementById('email-error');
const errorAsunto = document.getElementById('asunto-error');
const errorMensaje = document.getElementById('error-mensaje');
const errorEnviar = document.getElementById('error-enviar');
const submitBtn = document.getElementById('submit-btn');
const regex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
const regexNumber = /^[\d\s\+]+$/; // Expresión regular para validar el teléfono

function validarNombre() {
    let name = document.getElementById('nombre-contacto').value;

    if (name.length == 0) {
        errorNombre.innerHTML = 'Debe ingresar un nombre.';
        return false;
    } else if (name.length <= 2) {
        errorNombre.innerHTML = 'Escriba el nombre completo.';
        return false;
    } else if (!regex.test(name)) { // Valida que solo se ingresen letras y espacios
        errorNombre.innerHTML = 'El nombre no puede contener números ni símbolos.';
        return false;
    } else {
        errorNombre.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
        return true;
    }
}

function validarApellido() {
    let apellido = document.getElementById('apellido-contacto').value;

    if (apellido.length == 0) {
        errorApellido.innerHTML = 'Debe ingresar un apellido.';
        return false;
    } else if (apellido.length <= 2) {
        errorApellido.innerHTML = 'Escriba el apellido completo.';
        return false;
    } else if (!regex.test(apellido)) { // Valida que solo se ingresen letras y espacios
        errorApellido.innerHTML = 'El apellido no puede contener números ni símbolos.';
        return false;
    } else {
        errorApellido.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
        return true;
    }
}

function validarTelefono() {
    let telefono = document.getElementById('telefono-contacto').value;

    if (telefono.length == 0) {
        errorTelefono.innerHTML = 'Debe ingresar un teléfono.';
        return false;
    } else if (telefono.length <= 7) {
        errorTelefono.innerHTML = 'El número de telefono debe contener al menos 10 dígitos.';
        return false;
    } else if (!regexNumber.test(telefono)) {
        errorTelefono.innerHTML = 'Ingrese un teléfono válido.';
        return false;
    } else {
        errorTelefono.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
        return true;
    }
}

function validarCorreo() {
    let correo = document.getElementById('email-contacto').value;

    if (correo.length == 0) {
        errorCorreo.innerHTML = 'Ingrese un correo.';
        return false;
    } else if (!correo.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        errorCorreo.innerHTML = 'El correo ingresado no es válido.';
        return false;
    } else {
        errorCorreo.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
        return true;
    }
}

function validarAsunto() {
    let asunto = document.getElementById('asunto-contacto').value;

    if (asunto.length == 0) {
        errorAsunto.innerHTML = 'Ingrese un asunto.';
        return false;
    } else {
        errorAsunto.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
        return true;
    }
}

function validarMensaje() {
    let mensaje = document.getElementById('textarea').value;

    if (mensaje.length == 0) {
        errorMensaje.innerHTML = 'Ingrese un mensaje.';
        return false;
    } else if (mensaje.length <= 5) {
        errorMensaje.innerHTML = 'Ingrese un mensaje más largo.';
        return false;
    } else {
        errorMensaje.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
        return true;
    }
}

function limpiarFormulario() {
    // Obtener todos los inputs y el textarea
    const inputs = formulario.querySelectorAll('input');
    const textareas = formulario.querySelectorAll('textarea');

    // Limpiar el valor de todos los inputs
    inputs.forEach(input => input.value = '');
    // Limpiar el valor de todos los textareas
    textareas.forEach(textarea => textarea.value = '');

    // Limpiar los mensajes de error
    errorNombre.innerHTML = '';
    errorApellido.innerHTML = '';
    errorTelefono.innerHTML = '';
    errorCorreo.innerHTML = '';
    errorAsunto.innerHTML = '';
    errorMensaje.innerHTML = '';
}


function validarEnvio() {
    const nombreValido = validarNombre();
    const apellidoValido = validarApellido();
    const telefonoValido = validarTelefono();
    const correoValido = validarCorreo();
    const asuntoValido = validarAsunto();
    const mensajeValido = validarMensaje();

    if (nombreValido && apellidoValido && telefonoValido && correoValido && asuntoValido && mensajeValido) {
        // Enviar el formulario si todos los campos son válidos
        errorEnviar.innerHTML = '¡Enviado exitosamente!';
        errorEnviar.classList.add('green-text');
        errorEnviar.classList.remove('red-text');
        limpiarFormulario();
    } else {
        errorEnviar.innerHTML = 'Complete el formulario correctamente.';
        errorEnviar.classList.add('red-text');
        errorEnviar.classList.remove('green-text');
    }
}


submitBtn.addEventListener('click', validarEnvio);