/**
 * Script para manejar sessionStorage y localStorage en el navegador.
 * Permite almacenar, recuperar y verificar información del usuario.
 *
 * @author Cristian Peña <cristian,p>
 */

// Variables globales
let nickname;
let size;
let avatar;
let avatarAlt;
var geolocationTxt;


/**
 * Guarda los datos del usuario en sessionStorage.
 *
 * @param {*} nick Elemento de entrada del nickname
 * @param {*} size Elemento de entrada del tamaño
 * @param {*} email Elemento de entrada del correo electrónico
 * @param {*} avatarCont Elemento de la imagen del avatar
 */
function SaveUserDates(nick, size, email, avatarCont) {
    sessionStorage.setItem('nickname', nick.value);
    sessionStorage.setItem('size', size.value);
    // sessionStorage.setItem('email', email.value);
    sessionStorage.setItem('avatar', avatarCont.src);
    sessionStorage.setItem('mainColor', avatarCont.alt);
    console.log("Datos de usuario guardados en sessionStorage");
}

/**
 * Recupera el nickname almacenado en sessionStorage.
 *
 * @returns {string | null} Nickname almacenado
 */
function GetNick() {
    return sessionStorage.getItem('nickname');
}

/**
 * Carga los datos del usuario desde sessionStorage.
 */
function getUserDates() {
    nickname = sessionStorage.getItem('nickname');
    size = sessionStorage.getItem('size');
    avatar = sessionStorage.getItem('avatar');
    avatarAlt = sessionStorage.getItem('mainColor');

    console.log("Datos cargados de sessionStorage:");
    console.log("Nick = " + nickname);
    console.log("Size = " + size);
    console.log("Avatar = " + avatar);
    console.log("Color = " + avatarAlt);
}

/**
 * Muestra el nickname almacenado en sessionStorage en la consola.
 */
function ViewDates() {
    let nick = sessionStorage.getItem('nickname');
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
        sessionStorage.setItem('error', 'El nickname debe poseer caracteres válidos.');
        return false;
    }

    console.log("Acceso Concedido");
    return true;
}

/**
 * Obtiene la geolocalización del usuario y la almacena en geolocationTxt.
 */
function DatoGeoLocalizacion() {
    if (!navigator.geolocation) {
        geolocationTxt = "El navegador no es compatible con API Geolocation";
    } else {
        navigator.geolocation.getCurrentPosition(
            // Éxito
            (position) => {
                geolocationTxt = 'Latitud: ' + position.coords.latitude + '\nLongitud: ' + position.coords.longitude;
                console.log(geolocationTxt);
            },
            // Error
            () => {
                geolocationTxt = "La geolocalización no se ha podido realizar.";
                console.log(geolocationTxt);
            }
        );
    }
}

/**
 * Registra el histórico de usuarios en localStorage.
 *
 * @param {*} nick Elemento de entrada del nickname
 */
function historic_User(nick) {
    console.log("Usando LOCAL HISTÓRICO");
    let historicoLocal = localStorage.getItem('historico');
    let historico = historicoLocal ? JSON.parse(historicoLocal) : [];

    let User_Register = {
        user: nick.value,
        fecha: Date.now()
    };

    historico.push(User_Register);
    localStorage.setItem('historico', JSON.stringify(historico));
}