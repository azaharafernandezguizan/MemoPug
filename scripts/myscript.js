///// Game Logic /////
//variables
let imagesRoute = '../images/';
let reverseImage = '../images/afayaReverse.jpg';
let first = true;
let totalImagesApp = 71;
let lowDifficultyRow = 4;
let lowDifficultyCol = 4;
let mediumDifficultyRow = 4;
let mediumDifficultyCol = 8;
let highDifficultyRow = 4;
let highDifficultyCol = 10;
let totalImagesInMatriz = 0;
let matrizBoard;

var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var isCronoRunning = false;

function inicioCronometro () {
	controlCronometro = setInterval(cronometro,10);
}

function pararCronometro () {
	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
    visor.innerHTML = "00:00:00:00:00";
}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
        visor.innerHTML=horas+":"+minutos+":"+segundos+":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
		visor.innerHTML=horas+":"+minutos+":"+segundos+":"+centesimas;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
		visor.innerHTML=horas+":"+minutos+":"+segundos+":"+centesimas;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
		visor.innerHTML=horas+":"+minutos+":"+segundos+":"+centesimas;
	}
}

//actions
function newgame() {
    visor=document.getElementById("timeObtained");
    if(isCronoRunning){
        pararCronometro();
    }
    

    var difficultySelected = $("#difficultyOptions")[0].value;
    var isSelected = true;
    
    switch (difficultySelected) {
        case 'low':
            matrizBoard = createMatriz(lowDifficultyRow, lowDifficultyCol);
            totalImagesInMatriz = lowDifficultyCol * lowDifficultyRow;
            break;
        case 'medium':
            matrizBoard = createMatriz(mediumDifficultyRow, mediumDifficultyCol);
            totalImagesInMatriz = mediumDifficultyCol * mediumDifficultyRow;
            break;
        case 'high':
            matrizBoard = createMatriz(highDifficultyRow, highDifficultyCol);
            totalImagesInMatriz = highDifficultyCol * highDifficultyRow;
            break;
        default:
            var errorMessageBox = document.getElementById("ErrorMessage");
            if(errorMessageBox.childNodes.length==0){
                formatError();
            }
            isSelected= false;
            
    }

    if(isSelected){

        hideError();
        var botonJugar=document.getElementById("playButton");
        botonJugar.firstChild.data = "Nuevo Juego";
        loadMatrizBoard(totalImagesInMatriz);
        paintBoard();
        inicioCronometro();
        isCronoRunning=true;
    }
    
}

function formatError(){
    var errorDisplayed = document.createTextNode("Debes seleccionar un nivel de dificultad!");
    var divError = document.getElementById("ErrorMessage");
    divError.appendChild(errorDisplayed);
    $("#ErrorMessage").css("background-color", "yellow");
    $("#ErrorMessage").css("color", "black");
    $("#ErrorMessage").css("font-weight", "bold");
    $("#ErrorMessage").css("font-size", "24px");
    $("#ErrorMessage").css("text-align", "center");
}

function hideError(){
    $("#ErrorMessage").css("display", "none");
}

function createMatriz(rows, cols) {
    var matriz = new Array(rows);

    for (i = 0; i < rows; i++) {
        matriz[i] = new Array(cols);
    }

    return matriz;
}

function loadMatrizBoard(imagesNumber) {
    var numberFound = false;
    var imagesToSearch = imagesNumber / 2;
    var numbersFound = new Array(imagesToSearch);

    for (i = 0; i < numbersFound.length; i++) {
        numberFound = false;
        while (!numberFound) {
            var rdmNumber = Math.ceil(Math.random() * totalImagesApp);

            if (numbersFound.indexOf(rdmNumber) == -1) {
                numbersFound[i] = rdmNumber;
                numberFound = true;
            }
        }
    }

    var numbersDuplicate = numbersFound.concat(numbersFound);
    var positionFound = new Array(numbersDuplicate.length);

    for (i = 0; i < matrizBoard.length; i++) {
        for (j = 0; j < matrizBoard[0].length; j++) {
            numberFound = false;
            while (!numberFound) {
                var rdmNumber = Math.floor(Math.random() * numbersDuplicate.length);

                if (positionFound.indexOf(rdmNumber) == -1) {
                    positionFound.push(rdmNumber);
                    matrizBoard[i][j] = numbersDuplicate[rdmNumber];
                    numberFound = true;
                }
            }
        }
    }
}

function paintBoard() {
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < matrizBoard.length; i++) {
        var hilera = document.createElement("tr");

        for (var j = 0; j < matrizBoard[0].length; j++) {
            var celda = document.createElement("td");

            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btnBoard";
            btn.id = "btnBoard" + matrizBoard[i][j];
            btn.onclick = "testAction("+btn.id+","+matrizBoard[i][j]+")";
            btn.style = "background-image: url('images/afayaReverse.jpg');height:125px;width:125px;";

            var img = document.createElement('img');
            img.src = "images/" + matrizBoard[i][j] + ".jpg";
            img.alt = "imagen pug numero " + matrizBoard[i][j];
            img.title = "imagen para emparejar numero " + matrizBoard[i][j];
            img.style = "display:none;"

            celda.appendChild(btn);
            celda.appendChild(img);
            hilera.appendChild(celda);
        }

        tblBody.appendChild(hilera);
    }


    tabla.appendChild(tblBody);
    tabla.setAttribute("border", "2");

    $("#gamingTable").html(tabla);
}

function testAction(idBoton,numImage) {
    alert("Pulsado boton " + idBoton + " e imagen "+ numImage);
}