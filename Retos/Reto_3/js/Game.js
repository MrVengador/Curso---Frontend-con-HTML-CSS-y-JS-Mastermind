

/**
 * Game logic for a memory card game.
 * 
 * Author: Cristian Peña
 * Email: cristian.penavillar@gmail.com
 * Profession: Ing. en desarrollo de videojuegos y realidad virtual
 */

//Variables globales
// 🔹 Configuración y opciones del juego
let colors = ["Leon", "Ashley", "Ada", "Luis", "Wesker", "Villager", "Salazar", "Mendez", "Saddler", "extra1", "extra2", "extra3"];
let colors_select = [];
let timeFliped = 0.75;
let MaxTime;
let time;
let score = 0;
let AllFliped = false;

// 🔹 Elementos del DOM
const ScoreText = document.getElementById("score");
const TimerText = document.getElementById("time");
const IntentosText = document.getElementById("intentos");
const EndGameText = document.getElementById("EndGameText");

// 🔹 Variables de control del juego
let intervalId; // Intervalo para el temporizador
let intervalFlip; // Intervalo para voltear todas las cartas
let rndColor = 0;
let LastCard = null;
let CurrentCard = null;
let CurrentsCards = [];
let CardsWin = [];
let Intentos = 0;
var maxIntentos = 0;

// 🔹 Inicialización de elementos del DOM
TimerText.textContent = time + " seg";
EndGameText.textContent = "You Are Dead";


// EVENTOS


Game(); //Start Game
console.log("HOLA");
// FUNCIONES

function Game() {

    //Gestion de datos del jugador y juego.

    getUserDates();

    if (nickname == null) {
        nickname = "Leon";
        avatar = "https://i.pinimg.com/736x/ca/4d/63/ca4d63ce276f2bb2d1d024cee4ff2a58.jpg";
        avatarAlt = "Leon";
        numCards = 18;
        dificult = 60;

    }
    console.log("dificult: " + parseInt(dificult));
    MaxTime = parseInt(dificult);

    ViewDates();

    if (!Verification()) {
        console.log("ERROR DE VERIFICACION");
        // location = "index.html";
    }


    StartGame();

    PlayGame();
}


//Datos e intancia de cartas
function StartGame() {
    Instance_item();

    rellenarForm();
    PanelPaint();
    Intentos = maxIntentos;
    IntentosText.textContent = Intentos;

    time = MaxTime;

    TimerText.textContent = time + " seg";

}

//Jugar
function PlayGame() {
    intervalId = setInterval(Timer, 1000);

    if (AllFliped === false)
        ItemEvent();
}



function rellenarForm() {
    console.log("Nickname is: " + nickname + " img " + avatar);
    document.getElementById("UserNickname").textContent = nickname;
    document.getElementById("UserNickname").value = nickname;
    document.getElementById("UserAvatar").src = avatar;
    document.getElementById("UserAvatar").alt = avatarAlt;
    ScoreText.textContent = score;

}


//Datos del Panel en base a dificultad y numero de cartas.
function PanelPaint() {

    // Lógica para el tamaño de las columnas y filas según las cartas totales (numCards)
    console.log("Usar tamaño de " + numCards + " cartas");

    let columns, rows;

    // Determinar las filas y columnas según el número total de cartas
    if (numCards == 12) {  // Para 12 cartas
        columns = 4;
        rows = 3;
    }

    else if (numCards == 18) {  // Para 18 cartas
        columns = 6;
        rows = 3;
    }

    else if (numCards == 24) {  // Para 24 cartas
        columns = 6;
        rows = 4;
    }

    if (dificult == "120") { //Facil
        intervalFlip = 3;
        maxIntentos = 24;
    }

    else if (dificult == "90") {
        intervalFlip = 2;
        maxIntentos = 9; //Puede fallar 9 veces
    }

    else if (dificult == "45") {
        intervalFlip = 1;
        maxIntentos = 3; //Solo puede fallar 3 vez
    }

    // Aplicar el grid en CSS
    document.getElementById("Game").style.gridTemplateColumns = "repeat(" + columns + ", 1fr)";
    document.getElementById("Game").style.gridTemplateRows = "repeat(" + rows + ", 1fr)";

    // Ajustar el tamaño del contenedor según el tamaño elegido
    if (numCards == 12) { // Para 12 cartas
        document.getElementById("Game").style.width = "700px";
        document.getElementById("Game").style.height = "700px";

        document.getElementById("EndGame").style.width = "700px";
        document.getElementById("EndGame").style.height = "700px";

        document.getElementById("GameContainer").style.width = "740px";
        document.getElementById("GameContainer").style.height = "740px";
    }
    else if (numCards == 18) { // Para 18 cartas
        document.getElementById("Game").style.width = "1050px";
        document.getElementById("Game").style.height = "700px";

        document.getElementById("EndGame").style.width = "1050px";
        document.getElementById("EndGame").style.height = "700px";

        document.getElementById("GameContainer").style.width = "1090px";
        document.getElementById("GameContainer").style.height = "740px";
    }
    else if (numCards == 24) { // Para 24 cartas
        // Ajustamos el tamaño para 24 cartas (6 columnas, 4 filas)
        document.getElementById("Game").style.width = "1050px";  // Un poco más de espacio horizontal
        document.getElementById("Game").style.height = "900px";  // Aumentamos la altura para 4 filas

        document.getElementById("EndGame").style.width = "1050px";
        document.getElementById("EndGame").style.height = "900px";

        document.getElementById("GameContainer").style.width = "1090px";  // Contenedor ligeramente más grande
        document.getElementById("GameContainer").style.height = "940px";  // Aumento en altura



    }
}



function Instance_item() {

    let items = "";
    ColorSelected(); //Selecciona los colores de las cartas aleatoriamente n/2
    console.log("Hay + " + numCards + " cartas");

    // Duplicamos los colores seleccionados para que cada color aparezca dos veces
    let final_colors = [...colors_select, ...colors_select];

    // Mezclar el array final para colocar las cartas en posiciones aleatorias
    final_colors = shuffleArray(final_colors);

    // Generar las cartas
    for (let index = 0; index < numCards; index++) {
        items += `<div class="containerItem"> <div id="${index}" class="item ${final_colors[index]}"><div class="itemBack bg-black"></div>
                    </div> </div>`;
    }

    // Imprimir las cartas en el contenedor
    document.getElementById("Game").innerHTML = items;
}


// Función para mezclar un array utilizando sort y Math.random()
function shuffleArray(array) {
    // Utiliza sort() para ordenar el array de forma aleatoria
    // Math.random() genera un número entre 0 y 1, restando 0.5 hace que la comparación sea aleatoria
    return array.sort(() => Math.random() - 0.5);
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function ItemEvent() {
    const items = document.getElementsByClassName("item");

    for (let item of items) {
        item.addEventListener("click", SelectItem);
    }
}


function SelectItem(event) {

    if (time > 0) {
        if (CurrentCard != null) {
            LastCard = CurrentCard;
        }

        let item = event.currentTarget; // Captura el elemento clickeado
        let itemBack = item.getElementsByClassName("itemBack");

        console.log("Carta seleccionada: " + item.id);
        console.log("Background: " + itemBack[0].style.zIndex);
        let foundColor = colors.find(color => item.classList.contains(color)); // Busca la clase de color

        console.log("Carta seleccionada: " + item.id);
        console.log("Cartas actuales: " + CurrentsCards);

        if ((!CurrentsCards.includes(item.id) || CurrentsCards.length === 0) && CurrentsCards.length < 2 && !CardsWin.includes(item.id)) { // Verifica si la carta ya fue seleccionada

            console.log("Color encontrado: " + foundColor);
            CurrentCard = foundColor; // Guarda el color en CurrentCard
            CurrentsCards.push(item.id)
            item.classList.toggle("flipped");
            // itemBack[0].style.zIndex = "-1";




            if (CurrentCard == LastCard) {
                console.log("Cartas iguales");

                ScoreText.textContent = score;
                CurrentCard = null;
                LastCard = null;
                CardsWin.push(CurrentsCards[0]);
                CardsWin.push(CurrentsCards[1]);
                console.log("Cartas ganadas: " + CardsWin.length);
                CurrentsCards = [];
                if (CardsWin.length > numCards / 2)
                    score += 2;
                else
                    score++;

                ScoreText.textContent = score;
            }

            else if (CurrentCard != null && LastCard != null && CurrentCard != LastCard) {
                {
                    console.log("Cartas diferentes");
                    Intentos--;
                    IntentosText.textContent = Intentos;

                    // Espera 1 segundo antes de voltear las cartas incorrectas
                    setTimeout(() => {
                        flippedCards();

                        //Formatea las cartas seleccionadas
                        CurrentCard = null;
                        LastCard = null;
                        CurrentsCards = [];

                    }, timeFliped * 1000);

                }
            }
        }
    }
}




function ItemsAllFlip() {
    const items = document.getElementsByClassName("item");

    for (let item of items) {
        item.classList.toggle("flipped"); // Alterna la clase "flipped" al hacer clic //Voltea con zIndex
    }
}


function flippedCards() {

    const items = document.getElementsByClassName("item");

    items[CurrentsCards[0]].classList.toggle("flipped");
    items[CurrentsCards[1]].classList.toggle("flipped");
}


function Timer() {
    time--;
    TimerText.textContent = time + " seg";

    if (time <= 0 || Intentos <= 0) {
        EndGameText.textContent = "You Are Dead";
        EndGameText.classList.remove("text-success");
        EndGameText.classList.add("text-danger");
        EndGame();
    }
    else {
        console.log(time);
        if (time <= MaxTime - intervalFlip && !AllFliped) {
            console.log("AllFlip");
            ItemsAllFlip();
            AllFliped = true;
        }

        if (CardsWin.length == numCards) {
            EndGameText.textContent = "Felicidades, has ganado!";
            EndGameText.classList.remove("text-danger");
            EndGameText.classList.add("text-success");
            EndGame();
        }
    }
}

function FormatedColors() {
    const items = document.getElementsByClassName("item");

    for (let item of items) {
        for (let color of colors) {
            if (item.classList.contains(color)) {
                item.classList.remove(color);
            }
        }
    }
}

function ColorSelected() {
    colors_select = [];

    // Seleccionamos numCards/2 colores aleatorios
    while (colors_select.length < numCards / 2) {
        let rndColor = getRandomInt(colors.length);
        // Evitar duplicados en colors_select
        while (colors_select.includes(colors[rndColor])) {
            rndColor = getRandomInt(colors.length);
        }
        colors_select.push(colors[rndColor]);
    }

    console.log("Colores seleccionados: " + colors_select);
}

function PaintColors() {
    const items = document.getElementsByClassName("item");
    ColorSelected(); //Selecciona los colores de las cartas aleatoriamente n/2

    console.log("Hay " + numCards + " cartas");

    let final_colors = [...colors_select, ...colors_select];

    // Mezclar el array final para colocar las cartas en posiciones aleatorias
    final_colors = shuffleArray(final_colors);


    for (let index = 0; index < items.length; index++) {
        let item = items[index];
        item.classList.add(final_colors[index]);
        console.log("Item: " + item.id + " Color: " + final_colors[index]);
    }
}



function EndGame() {

    clearInterval(intervalId);
    const items = document.getElementsByClassName("item");

    for (let item of items) {
        item.removeEventListener("mousedown", SelectItem);
    }

    console.log("GAME OVER! Presiona el botón de reinicio para jugar nuevamente.");
    document.getElementById("EndGame").style.zIndex = 2;
    document.getElementById("Game").style.zIndex = 1;

    document.getElementById("newGame").addEventListener("click", ResetGame);


}

function ResetGame() {
    console.log("RESET");

    time = MaxTime;
    score = 0;
    AllFliped = false;

    TimerText.textContent = time + " seg";
    ScoreText.textContent = score;

    LastCard = null;
    CurrentCard = null;
    CurrentsCards = [];
    CardsWin = [];
    Intentos = maxIntentos;
    IntentosText.textContent = Intentos;

    FormatedColors(); // Limpiar los colores
    PaintColors();

    document.getElementById("EndGame").style.zIndex = -1;
    document.getElementById("Game").style.zIndex = 2;
    intervalId = setInterval(Timer, 1000);

}

