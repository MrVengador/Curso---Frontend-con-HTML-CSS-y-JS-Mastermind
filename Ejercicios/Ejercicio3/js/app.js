/**
 * @author Cristian Peña <cristian.penavillar@gmail.com>
 */

// Variables globales
var User_Name;
var User_Size;
var Email;
var Form_User;
var error;
var avatarItems;
var itemIMG;
var currentAvatar;

// Inicia la carga de eventos
document.addEventListener('DOMContentLoaded', domCharge);

/**
 * Carga los eventos y selecciona los elementos del DOM.
 */
function domCharge() {
    User_Name = document.getElementById("nickname");
    User_Size = document.getElementById("size");
    Email = document.getElementById("correo");
    Form_User = document.getElementById("formulario");
    error = document.getElementById("Error_msg");
    getUserDates();

    if (sessionStorage.getItem('error')) {
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }

    // Agrega el event listener para el submit del formulario
    Form_User.addEventListener('submit', View_Dates);

    currentAvatar = document.getElementById("AvatarActual");
    avatarItems = document.getElementsByClassName("avatarImgItem");

    for (let item of avatarItems) {
        item.addEventListener('dragstart', moviendoImg);
    }

    currentAvatar.addEventListener('dragover', e => e.preventDefault());
    currentAvatar.addEventListener('drop', changeImg);
}

/**
 * Maneja el evento dragstart para mover la imagen del avatar.
 *
 * @param {Event} event Evento de arrastre
 */
function moviendoImg(event) {
    itemIMG = event.target;
    console.log("Moviendo la imagen de " + itemIMG.alt);
}

/**
 * Cambia la imagen del avatar al soltarla.
 *
 * @param {Event} event Evento de soltar
 */
function changeImg(event) {
    currentAvatar.alt = itemIMG.alt;
    currentAvatar.src = itemIMG.src;
}

/**
 * Maneja la validación del formulario y guarda los datos del usuario.
 *
 * @param {Event} event Evento de envío del formulario
 * @returns {boolean} True si la validación es exitosa, False en caso contrario
 */
function View_Dates(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Validar el nickname
    if (!User_Name.value.match(/[a-zA-Z]/)) {
        User_Name.focus();
        error.innerText = "No ha ingresado un nickname correctamente.";
        return false;
    }

    // Validar el tamaño seleccionado
    if (User_Size.value == "0") {
        console.log("No se ha seleccionado un tamaño.");
        User_Size.focus();
        error.innerText = "No ha ingresado un tamaño.";
        return false;
    }

    // Si las validaciones son correctas, mostrar la información en la consola
    console.log("Nickname is: " + User_Name.value);
    console.log("Size is: " + User_Size.value);
    // console.log("Email is: " + Email.value);
    error.innerText = "";

    SaveUserDates(User_Name, User_Size, Email, currentAvatar);
    ViewDates();
    historic_User(User_Name);

    if (Verification()) {
        location = "Game.html";
        return true;
    } else {
        location = "index.html";
        alert("No ha ingresado un nickname correctamente");
        return false;
    }
}