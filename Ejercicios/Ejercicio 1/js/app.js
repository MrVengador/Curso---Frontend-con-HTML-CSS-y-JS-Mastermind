// Selecciona los elementos del DOM
const User_Name = document.getElementById("nickname");
const User_Size = document.getElementById("size");
const Form_User = document.getElementById("formulario");

const error = document.getElementById("Error_msg");


// Agrega el event listener para el submit del formulario
Form_User.addEventListener('submit', View_Dates);

// Define la función View_Dates y recibe el evento
function View_Dates(event) {
    event.preventDefault(); // Evita que la página se recargue

    // Validar el nickname
    if (!User_Name.value.match(/[a-zA-Z]/)) {
        User_Name.focus(); // Coloca el cursor en el campo de texto para que el usuario lo complete
        event.preventDefault();
        error.innerText = "No ha ingresado un nickname correctamente."
        return false; // Detiene la ejecución de la función y evita que el formulario continúe
    }

    // Validar el tamaño seleccionado
    if (User_Size.value == "0") {
        console.log("No se ha seleccionado un tamaño.");
        User_Size.focus();
        event.preventDefault();
        error.innerText = "No ha ingresado un tamaño."

        return (false);
    }


    // Si las validaciones son correctas, mostrar la información en la consola
    console.log("Nickname is: " + User_Name.value);
    console.log("Size is: " + User_Size.value);
    error.innerText = ""


    return true; // Indica que la validación fue exitosa

}
