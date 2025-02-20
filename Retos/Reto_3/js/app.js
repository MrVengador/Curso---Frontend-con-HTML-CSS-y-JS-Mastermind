let User_Name;
let User_Dificult;
let User_NumCards;
var User_AvatarItems;
var User_CurrentAvatar;
var Form_User;

// Inicia la carga de eventos
document.addEventListener('DOMContentLoaded', domCharge);

/**
 * Carga los eventos y selecciona los elementos del DOM.
 */
function domCharge() {


    User_Name = document.getElementById("nickname");
    User_Dificult = document.getElementById("dificult");
    User_NumCards = document.getElementById("NumCards");
    // error = document.getElementById("Error_msg");
    Form_User = document.getElementById("formulario");
    User_CurrentAvatar = document.getElementById("AvatarActual");

    getUserDates();

    // if (sessionStorage.getItem('error')) {
    //     error.innerText = sessionStorage.getItem('error');
    //     sessionStorage.removeItem('error');
    // }

    // Agrega el event listener para el submit del formulario

    if (Form_User) {
        Form_User.addEventListener('submit', View_Dates);

        // console.log("User_CurrentAvatar." + User_CurrentAvatar.alt);

        avatarItems = document.getElementsByClassName("avatarImgItem");

        for (let item of avatarItems) {
            item.addEventListener('dragstart', moviendoImg);
        }

        User_CurrentAvatar.addEventListener('dragover', e => e.preventDefault());
        User_CurrentAvatar.addEventListener('drop', changeImg);
    }
}

function View_Dates(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Asegúrate de que User_Name y su valor estén disponibles antes de validar
    if (User_Name && User_Name.value && !User_Name.value.match(/[a-zA-Z]/)) {
        User_Name.focus();
        return false;
    }

    // Validar el número de tarjetas
    if (User_NumCards && User_NumCards.value == "0") {
        console.log("No se ha seleccionado un tamaño.");
        User_NumCards.focus();
        return false;
    }

    // Si las validaciones son correctas, mostrar la información en la consola
    console.log("Nickname is: " + User_Name.value);
    console.log("Number of cards is: " + User_NumCards.value);

    SaveUserDates(User_Name, User_Dificult, User_NumCards, User_CurrentAvatar);
    ViewDates();

    if (Verification()) {
        location = "Game.html";
        return true;
    } else {
        location = "index.html";
        alert("No ha ingresado un nickname correctamente");
        return false;
    }
}


function moviendoImg(event) {
    User_AvatarItems = event.target;
    console.log("Moviendo la imagen de " + User_AvatarItems.alt);
}

function changeImg(event) {
    User_CurrentAvatar.alt = User_AvatarItems.alt;
    User_CurrentAvatar.src = User_AvatarItems.src;
}

