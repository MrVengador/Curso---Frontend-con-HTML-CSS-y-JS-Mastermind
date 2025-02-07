


const User_Money = document.getElementById("Money"); //Valor ingresado
const User_Div = document.getElementById("Divisa"); //Opcion de divisa
const Form_User = document.getElementById("ConversorForm"); //Formulario de Divisa (para el button (submit))
const User_Total = document.getElementById("Total"); //Valor total tras cambio

const error = document.getElementById("Error_msg"); //Mensaje de error

Form_User.addEventListener('submit', Verification);


//Verificamos que este todo
function Verification(event) {
    event.preventDefault(); // Evita que la página se recargue

    if (!User_Money.value.match(/^[1-9]\d*$/)) {
        console.log("No se ha ingresado una cantidad válida de dinero.");
        User_Money.focus();
        event.preventDefault();
        error.innerText = "No ha ingresado una cantidad válida de dinero.";

        return false;
    }

    if (User_Div.value == "0") {
        console.log("No se ha seleccionado una divisa.");
        User_Div.focus();
        event.preventDefault();
        error.innerText = "No ha ingresado una divisa.";

        return false;
    }

    error.innerText = ""
    ConvertMoney();

    return true;
}

//Convertimos la moneda CLP a la solicitada
function ConvertMoney(event) {


    // imprimimos en console los valores para verificar
    console.log("Cantidad de dinero ingresada: " + User_Money.value);
    console.log("Divisa seleccionada: " + User_Div.value);

    //Dolar
    if (User_Div.value == "1") {
        const Divisa = 0.001; /*Aproximado*/
        const Total = User_Money.value * Divisa;
        console.log("Cambio de CLP a USD");
        console.log("El total es $" + Total + " USD");
        //Devolvemos el valor total post cambio de moneda
        User_Total.innerText = "$" + Total;
    }

    //Euro
    else if (User_Div.value == "2") {
        const Divisa = 0.001; /*Aproximado*/
        const Total = User_Money.value * Divisa;
        console.log("Cambio de CLP a EUR");
        console.log("El total es " + Total + " EUR");
        //Devolvemos el valor total post cambio de moneda
        User_Total.innerText = "€" + Total;
    }

    //Yen
    else if (User_Div.value == "3") {
        const Divisa = 0.16; /*Aproximado*/
        const Total = User_Money.value * Divisa;
        console.log("Cambio de CLP a JPY");
        console.log("El total es " + Total + " JPY");
        //Devolvemos el valor total post cambio de moneda
        User_Total.innerText = "¥" + Total;
    }

    //Al terminar de convertir, termina la funcion
    return true;
}