

//Variables
let colors = ["Eris", "Roxy", "Sylphiette", "Rudeus"];
var Marcando = false;
let lastItem;
let disponibles = [];
let ocupados = [];
var MaxTime = 30;
let time = MaxTime;
const ScoreText = document.getElementById("score");
let score = 0;

const TimerText = document.getElementById("time");
TimerText.textContent = time + " seg";

let intervalId;
let Play = true;
let colors_select = [];
let rndColor = 0;

// EVENTOS


Game(); //Start Game

// FUNCIONES

function Game() {

    getUserDates();

    if (nickname == null) {
        nickname = "Test";
        avatar = "https://i.pinimg.com/736x/ca/4d/63/ca4d63ce276f2bb2d1d024cee4ff2a58.jpg";
        avatarAlt = "Rudeus";
        size = 3;
    }

    ViewDates();

    if (!Verification()) {
        console.log("ERROR DE VERIFICACION");
        // location = "index.html";
    }

    rellenarForm();
    PanelPaint();

    PlayGame();
}



function PlayGame() {
    Play = true;
    intervalId = setInterval(Timer, 1000);

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


function PanelPaint() {

    console.log("Usar size de " + size);
    document.getElementById("Game").style.gridTemplateColumns = "repeat(" + size + ",1fr)";
    document.getElementById("Game").style.gridTemplateRows = "repeat(" + size + ",1fr)";

    if (size == 3) {
        document.getElementById("Game").style.maxWidth = "500px";
        document.getElementById("Game").style.minWidth = "400px";

        document.getElementById("GameContainer").style.width = "600px";
        document.getElementById("GameContainer").style.height = "600px";

        document.getElementById("EndGame").style.width = "600px";
        document.getElementById("EndGame").style.height = "600px";
    }
    else if (size == 4) {
        document.getElementById("Game").style.maxWidth = "550px";
        document.getElementById("Game").style.minWidth = "450px";

        document.getElementById("GameContainer").style.width = "650px";
        document.getElementById("GameContainer").style.height = "650px";

        document.getElementById("EndGame").style.width = "650px";
        document.getElementById("EndGame").style.height = "650px";

    }
    else if (size == 5) {
        document.getElementById("Game").style.maxWidth = "725px";
        document.getElementById("Game").style.minWidth = "650px";

        document.getElementById("GameContainer").style.width = "850px";
        document.getElementById("GameContainer").style.height = "850px";

        document.getElementById("EndGame").style.width = "850px";
        document.getElementById("EndGame").style.height = "850px";
    }
    Instance_item();


}


function Instance_item() {

    let items = "";
    colors_select = [];
    // Randomizar el orden de la lista
    do {
        rndColor = getRandomInt(4);
        console.log(colors[rndColor] + "-" + avatarAlt);

    } while (colors[rndColor] == avatarAlt);
    colors_select.push(avatarAlt);
    colors_select.push(colors[rndColor]);

    for (let index = 0; index < (size * size); index++) {
        //if (index % 2 > 0 || index == 0)
        rndColor = getRandomInt(2);

        items += `<div class="containerItem"> <div id="${index}" class="item ${colors_select[rndColor]}"></div> </div>`

    }
    // console.log(items);
    document.getElementById("Game").innerHTML = items;

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


function ItemEvent() {
    const items = document.getElementsByClassName("item");

    for (let item of items) {
        item.addEventListener("mousedown", SelectItem);
        console.log(Marcando);
        item.addEventListener("mouseover", continueSelectItems);
        item.addEventListener("mouseup", stopSelectItems);
    }

}

function SelectItem(event) {
    // console.log("Marcando un item " + event.target.classList); //Verificador de item selecionado
    let item = event.target;
    let containerItem = event.target.parentElement;

    if (!ocupados.includes(parseInt(item.id))) {

        for (let index = 0; index < colors.length; index++) {
            if (item.classList.contains(colors[index])) {
                containerItem.classList.add(colors[index]);
                score++;
                ScoreText.textContent = score;
                ocupados.push(parseInt(item.id));
            }
        }
        lastItem = item;

        if (!Marcando) Marcando = true;


        disponibles = CalcularAdyacente(parseInt(item.id));
    }


}



function continueSelectItems(event) {
    // console.log("Marcando item " + event.target.classList); //Verificador de item selecionado
    // console.log("Last Item " + lastItem.classList);
    let Pass = false;
    if (Marcando) {
        let item = event.target;
        let containerItem = event.target.parentElement;
        // console.log("Marcando containerItem " + containerItem.classList); //Verificador de item selecionado

        for (let index = 0; index < colors.length; index++) {
            if (item.classList.contains(colors[index]) && lastItem.classList.contains(colors[index])
                && disponibles.includes(parseInt(item.id))) {
                Pass = true;
                containerItem.classList.add(colors[index]);
            }
        }
        Marcando = Pass;
        console.log(Marcando);


        if (Pass) {
            console.log("PASANDO");
            disponibles = CalcularAdyacente(parseInt(item.id));
            score++;

        }

        else {
            console.log("GAME OVER");
            FormatedColors(false);
            score = 0;
        }
        ScoreText.textContent = score;

    }
}

function FormatedColors(Reset) {
    const containerItems = document.getElementsByClassName("containerItem");
    const items = document.getElementsByClassName("item");

    ocupados = [];
    for (let index = 0; index < containerItems.length; index++) {

        for (let colorIndex = 0; colorIndex < colors.length; colorIndex++) {

            if (Reset) {
                items[index].classList.remove(colors[colorIndex]);
            }

            if (containerItems[index].classList.contains(colors[colorIndex])) {

                containerItems[index].classList.remove(colors[colorIndex]);
                break;
            }
        }
    }
}

function PaintColors() {
    const items = document.getElementsByClassName("item");
    colors_select = [];

    // Randomizar el orden de la lista
    do {
        rndColor = getRandomInt(4);
        console.log(colors[rndColor] + "-" + avatarAlt);

    } while (colors[rndColor] == avatarAlt);

    colors_select.push(avatarAlt);
    colors_select.push(colors[rndColor]);
    console.log(colors_select[0] + "-" + colors_select[1]);


    for (let index = 0; index < items.length; index++) {
        // if (index % 2 > 0 || index == 0)
        rndColor = getRandomInt(2);

        items[index].classList.add(colors_select[rndColor]);
    }
}

function stopSelectItems(event) {

    Marcando = false;
}


function CalcularAdyacente(idSelect) {
    let adyacentes = [];

    // Superior
    if ((idSelect - size) >= 0)
        adyacentes.push(idSelect - size);

    // Inferior
    if ((idSelect + size) < (size * size))
        adyacentes.push(idSelect + size); // Se corrigió el error

    // Izquierda
    if ((idSelect % size) > 0)
        adyacentes.push(idSelect - 1);

    // Derecha
    if ((idSelect + 1) % size > 0)
        adyacentes.push(idSelect + 1);

    // Imprimir los valores correctos
    // for (let index = 0; index < adyacentes.length; index++) {
    //     console.log("ADYACENTE " + adyacentes[index]);
    // }

    return adyacentes; // Devolver los valores si necesitas usarlos después
}

function Timer() {

    if (time > 0) {
        console.log(time);
        TimerText.textContent = time + " seg";
        time--;
    }
    else {
        console.log(time);
        TimerText.textContent = time + " seg";
        GameOver();

        if (time <= 0) {
            console.log("GAME OVER!!!!");
            document.getElementById("EndGame").classList.add("GameOverColor");

            document.getElementById("EndGame").style.zIndex = 2;
            document.getElementById("Game").style.zIndex = 1;


            document.getElementById("newGame").addEventListener("click", ResetGame);

        }
    }
}

function GameOver() {
    clearInterval(intervalId);
    const items = document.getElementsByClassName("item");
    for (let item of items) {
        item.removeEventListener("mousedown", SelectItem);
        item.removeEventListener("mouseover", continueSelectItems);
    }
    FormatedColors(true); // Limpiar los colores
    console.log("GAME OVER! Presiona el botón de reinicio para jugar nuevamente.");


}

// Función para reiniciar el juego cuando se presiona el botón
function ResetGame() {
    console.log("RESET");

    time = MaxTime;
    score = 0;
    Play = true; // Permitir jugar nuevamente

    TimerText.textContent = time + " seg";
    ScoreText.textContent = score;

    ocupados = []; // Resetear los elementos ocupados
    Marcando = false; // Reiniciar el estado de selección

    FormatedColors(true); // Limpiar los colores
    PaintColors();
    document.getElementById("EndGame").style.zIndex = -1;
    document.getElementById("Game").style.zIndex = 2;

    PlayGame(); // Iniciar el juego nuevamente

    //Opcion de reinicio del curso
    // document.getElementById("newGame").addEventListener("click", (e) => location.reload());
}

