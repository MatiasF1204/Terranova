// ---------------MENÚ DROPDOWN-----------------

(function(){
    const listElements = document.querySelectorAll('.menu__item--show');
    const list = document.querySelector('.menu__links');
    const menu = document.querySelector('.menu__hamburguer');

    const addClick = ()=>{
        listElements.forEach(element =>{
            element.addEventListener('click', ()=>{

                
                let subMenu = element.children[1];
                let height = 0;
                element.classList.toggle('menu__item--active');


                if(subMenu.clientHeight === 0){
                    height = subMenu.scrollHeight;
                }

                subMenu.style.height = `${height}px`;

            });
        });
    }

    const deleteStyleHeight = ()=>{
        listElements.forEach(element=>{

            if(element.children[1].getAttribute('style')){
                element.children[1].removeAttribute('style');
                element.classList.remove('menu__item--active');
            }

        });
    }


    window.addEventListener('resize', ()=>{
        if(window.innerWidth > 800){
            deleteStyleHeight();
            if(list.classList.contains('menu__links--show'))
                list.classList.remove('menu__links--show');

        }else{
            addClick();
        }
    });

    if(window.innerWidth <= 800){
        addClick();
    }

    menu.addEventListener('click', ()=> list.classList.toggle('menu__links--show'));



})();

// ------------------------------FAQ BUTTONS---------------

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const para = button.nextElementSibling;
        const icon = button.children[1];

        para.classList.toggle('show');
        icon.classList.toggle('rotate');
    })
})

// ---------------------------- CARDS SLIDERS----------------------------------

const productContainers = [...document.querySelectorAll('.product-container')];
const nxtBtn = [...document.querySelectorAll('.nxt-btn')];
const preBtn = [...document.querySelectorAll('.pre-btn')];

productContainers.forEach((item, i) => {
    let containerDimensions = item.getBoundingClientRect();
    let containerWidth = containerDimensions.width;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    })

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    })
})

// ---------------------------- formulario contacto validacion ----------------------------------

let errorNombre = document.getElementById("error-nombre");
let errorTel = document.getElementById("error-tel");
let errorEmail = document.getElementById("error-email");
let errorAsunto = document.getElementById("error-asunto");
let errorMensaje = document.getElementById("error-mensaje");
let errorEnvio = document.getElementById("error-envio");
let formulario = document.getElementById("form-contacto");

formulario.addEventListener('submit', validarEnvio);

function validarNombre() {
    let nombre = document.getElementById("nombre-contacto").value;

    if (nombre.length == 0) {
        errorNombre.innerHTML = "Debe ingresar un nombre!";
        return false;
    }
    if (!nombre.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
        errorNombre.innerText = "Escriba el nombre completo!";
        return false;
    }
    errorNombre.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
}

function validarTelefono() {
    let telefono = document.getElementById("telefono-contacto").value;

    if (telefono.length == 0) {
        errorTel.innerHTML = "Debe ingresar un número de teléfono!";
        return false;
    }
    if (telefono.length !== 10) {
        errorTel.innerHTML = "El número de teléfono debe contener 10 dígitos";
        return false;
    }
    if (!telefono.match(/^[0-9]{10}$/)) {
        errorTel.innerHTML = "El número de teléfono ingresado es incorrecto"
        return false;
    }
    errorTel.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
}

function validarEmail() {
    let email = document.getElementById("email-contacto").value;

    if (email == 0) {
        errorEmail.innerHTML = "Debe ingresar un correo electrónico!";
        return false;
    }

    if (!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        errorEmail.innerHTML = "El correo electrónico ingresado no es válido!"
        return false;
    }
    errorEmail.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;

}

function validarAsunto() {
    let asunto = document.getElementById("asunto-contacto").value;

    if (asunto.length == 0) {
        errorAsunto.innerHTML = "Debe ingresar un asunto!";
        return false;
    }
    errorAsunto.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
}

function validarMensaje() {
    let mensaje = document.getElementById("mensaje-contacto").value;
    const caracteresnecesarios = 30;
    let caracterespendientes = caracteresnecesarios - mensaje.length;

    if (caracterespendientes > 0) {
        errorMensaje.innerHTML = `${caracterespendientes}/${caracteresnecesarios}`;
        return false;
    }
    errorMensaje.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
}

function validarEnvio(evento) {
    evento.preventDefault();
    if (!validarNombre() || !validarTelefono() || !validarEmail() || !validarAsunto() || !validarMensaje()) {
        errorEnvio.style.display = "block";
        errorEnvio.innerHTML = "Por favor complete el formulario";
        setTimeout(function () { errorEnvio.style.display = "none"; }, 3000);
        return false;
    }
    // alert("Su mensaje fue enviado correctamente!");
    this.submit();
}
