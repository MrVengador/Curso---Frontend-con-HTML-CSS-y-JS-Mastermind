/*
    sessionStorage es una API de almacenamiento en el navegador que permite 
    guardar datos de manera temporal. La información almacenada en sessionStorage 
    solo persiste mientras la pestaña del navegador esté abierta. Una vez que la 
    pestaña se cierra, los datos se eliminan automáticamente. 

    En este caso, utilizamos sessionStorage para guardar y recuperar un nickname.
*/


let nickname;

var geolocationTxt;


// Función para almacenar el nickname en sessionStorage
function UserDates(nick) {
    // Guarda el valor del input (nick.value) en sessionStorage con la clave 'nickname'
    sessionStorage.setItem('nickname', nick.value);
    console.log("Guardo nickname"); // Mensaje de confirmación en la consola
}

// Función para recuperar y mostrar el nickname almacenado en sessionStorage
function ViewDates() {
    // Recupera el valor almacenado en sessionStorage con la clave 'nickname'
    let nick = sessionStorage.getItem('nickname');
    nickname = nick;
    // Muestra el nickname en la consola
    console.log("El nombre guardado es " + nick);
}



function Verification() {

    console.log("Verificación:")

    if (nickname == null || nickname == "Hola") {
        console.log("Acceso Denegado");
        sessionStorage.setItem('error', 'El nickname debe poseer caracteres validos.')
        return false;
    }

    console.log("Acceso Concedido");
    return true;

}





// GEOLOCALIZACION - Mueve esta función antes de su uso
function DatoGeoLocalizacion() {
    if (!navigator.geolocation) {
        geolocationTxt = "El navegador no es compatible con API Geolocation";
    } else {
        navigator.geolocation.getCurrentPosition(
            // Éxito
            (position) => {
                geolocationTxt = 'Latitud: ' + position.coords.latitude + '\nLongitud: ' + position.coords.longitude;
                console.log(geolocationTxt); // Mueve el console.log aquí para asegurar que tenga valor
            },
            // Error
            () => {
                geolocationTxt = "La geolocalización no se ha podido realizar.";
                console.log(geolocationTxt);
            }
        );
    }
}

// Ahora sí se puede llamar sin problemas
// DatoGeoLocalizacion();



//LocalStorage
function historic_User(nick) {

    console.log("Usando LOCAL HISTORICO");
    let historicoLocal = localStorage.getItem('historico');
    let historico;

    if (historicoLocal == null) {
        historico = [];

    }
    else {
        historico = JSON.parse(historicoLocal);
    }

    console.log(historico);

    let User_Register = {
        user: nick.value,
        fecha: Date.now()

    }


    historico.push(User_Register);

    localStorage.setItem('historico', JSON.stringify(historico));
}

