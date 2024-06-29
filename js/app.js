// ---------------MENÚ DROPDOWN funcionamiento-----------------
(function () {

    const listElements = document.querySelectorAll('.menu__item--show');
    const list = document.querySelector('.menu__links');
    const menu = document.querySelector('.menu__hamburguer');

    const addClick = () => {
        listElements.forEach(element => {
            element.addEventListener('click', () => {

                let subMenu = element.children[1];
                let height = 0;
                element.classList.toggle('menu__item--active');

                if (subMenu.clientHeight === 0) {
                    height = subMenu.scrollHeight;
                }

                subMenu.style.height = `${height}px`;

            });
        });
    }

    const deleteStyleHeight = () => {
        listElements.forEach(element => {

            if (element.children[1].getAttribute('style')) {
                element.children[1].removeAttribute('style');
                element.classList.remove('menu__item--active');
            }

        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) {
            deleteStyleHeight();
            if (list.classList.contains('menu__links--show'))
                list.classList.remove('menu__links--show');
        } else {
            addClick();
        }
    });

    if (window.innerWidth <= 800) {
        addClick();
    }
    menu.addEventListener('click', () => list.classList.toggle('menu__links--show'));
})();

// ---------------------------- MODALES ----------------------------------
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const userIcon = document.querySelector('.menu .icons .user-icon');
const modalLogin = document.querySelector('.modalBox');
const closeModal = document.querySelector('.modalBox .formu .formu__close');


// Función manejadora para ambos botones
function handleClick() {
    modalLogin.classList.remove('active'); // Comportamiento a ejecutar
}

// Añade el evento 'click' a ambos botones
[userIcon, loginBtn, signupBtn].forEach(button => {
    button.addEventListener('click', handleClick);
});

// Añade el evento para cerrar el modal
closeModal.addEventListener('click', () => {
    modalLogin.classList.add('active');
});



