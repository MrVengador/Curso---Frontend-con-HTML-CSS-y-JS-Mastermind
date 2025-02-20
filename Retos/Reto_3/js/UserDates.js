/**
 * Script para manejar localStorage y localStorage en el navegador.
 * Permite almacenar, recuperar y verificar información del usuario.
 *
 * @author Cristian Peña <cristian,p>
 */

// Variables globales
let nickname;
let dificult;
let numCards;
let avatarCont;

/**
 * Guarda los datos del usuario en localStorage.
 *
 * @param {*} nick Elemento de entrada del nickname
 * @param {*} size Elemento de entrada del tamaño
 * @param {*} email Elemento de entrada del correo electrónico
 * @param {*} avatarCont Elemento de la imagen del avatar
 */
function SaveUserDates(nick, dificultad, numCards, avatarCont) {
    localStorage.setItem('nickname', nick.value);
    localStorage.setItem('dificult', dificultad.value);
    localStorage.setItem('cards', numCards.value);
    localStorage.setItem('avatar', avatarCont.src);
    localStorage.setItem('mainColor', avatarCont.alt);

    console.log("Datos de usuario guardados en localStorage");
}
/**
 * Recupera el nickname almacenado en localStorage.
 *
 * @returns {string | null} Nickname almacenado
 */
function GetNick() {
    return localStorage.getItem('nickname');
}

/**
 * Carga los datos del usuario desde localStorage.
 */
function getUserDates() {
    nickname = localStorage.getItem('nickname') || "Leon";
    dificult = parseInt(localStorage.getItem('dificult')) || 60;
    numCards = parseInt(localStorage.getItem('cards')) || 18;
    avatar = localStorage.getItem('avatar') || "https://i.pinimg.com/736x/c7/47/cf/c747cfb912013cc4290c52fa3a7677dc.jpg";
    avatarAlt = localStorage.getItem('mainColor') || "Leon";

    console.log("Datos cargados de localStorage:");
    console.log("Nick = " + nickname);
    console.log("Dificultad = " + dificult);
    console.log("Número de objetivos = " + numCards);
    console.log("Avatar = " + avatar);
    console.log("Color principal = " + avatarAlt);
}
/**
 * Muestra el nickname almacenado en localStorage en la consola.
 */
function ViewDates() {
    let nick = localStorage.getItem('nickname');
    nickname = nick;
    console.log("El nombre guardado es: " + nick);
}




/**
 * Verifica si el nickname es válido.
 *
 * @returns {boolean} True si es válido, False si no lo es
 */

function Verification() {
    console.log("Verificación:");
    console.log("Nickname: " + nickname);

    if (nickname == null || nickname === "Hola") {
        console.log("Acceso Denegado");
        localStorage.setItem('error', 'El nickname debe poseer caracteres válidos.');
        return false;
    }

    console.log("Acceso Concedido");
    return true;
}
