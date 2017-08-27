///// Game Logic /////
//variables
let imagesRoute = '../images/';
let reverseImage = '../images/afayaReverse.jpg';
let first = true;
let totalImagesApp = 71;
let lowDifficultyCol = 4;
let lowDifficultyRow = 4;
let mediumDifficultyCol = 4;
let mediumDifficultyRow = 8;
let highDifficultyCol = 4;
let highDifficultyRow = 15;
let totalImagesInMatriz = 0;
let matrizBoard;


//actions
function newgame() {
    var difficultySelected = $("#difficultyOptions").value;

    switch (difficultySelected) {
        case 'low':
            matrizBoard = createMatriz(lowDifficultyCol, lowDifficultyRow);
            totalImagesInMatriz = lowDifficultyCol * lowDifficultyRow;
            break;
        case 'medium':
            matrizBoard = createMatriz(mediumDifficultyCol, mediumDifficultyRow);
            totalImagesInMatriz = mediumDifficultyCol * mediumDifficultyRow;
            break;
        case 'high':
            matrizBoard = createMatriz(highDifficultyCol, highDifficultyRow);
            totalImagesInMatriz = highDifficultyCol * highDifficultyRow;
            break;
    }

    loadMatrizBoard(totalImagesInMatriz);
    paintBoard();
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

    numbersFound.forEach(function (item, index, array) {
        array[index] = -1;
    });

    for (i = 0; i < numbersFound.length; i++) {
        numberFound = false;
        while (!numberFound) {
            var count = 0;
            var rdmNumber = Math.ceil(Math.random() * totalImagesApp);

            for (k = 0; k < i + 1; k++) {
                if (numbersFound[k] == rdmNumber) {
                    count++;
                    break;
                }
            }

            if (count == 0) {
                numbersFound[i] = rdmNumber;
                numberFound = true;
            }
        }
    }

    //inicializar matrizBoard a -1
    //recorrer array numbersFound dos veces
    //obtener aleatoriamente fila y columna y comprobar esta vacia
}

function paintBoard() {

    var body = document.getElementsByTagName("body")[0];

    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");

    // Crea las celdas
    for (var i = 0; i < 2; i++) {
       
        var hilera = document.createElement("tr");

        for (var j = 0; j < 2; j++) {
            var celda = document.createElement("td");

            var btn = document.createElement('input');
            btn.type = "button";
            btn.className = "btnBoard";
            btn.id = "btnBoard"+matrizBoard[i][j];
            btn.onclick = (function(this) {return function() {testAction(this);}})(this);

            var img = document.createElement('img');
            img.src = "images/"+matrizBoard[i][j]+"jpg";
            img.alt = "imagen"+matrizBoard[i][j];
            img.title = "imagen para emparejar"+matrizBoard[i][j];
            img.style ="display:none;"
            
            celda.appendChild(btn);
            celda.appendChild(img);
            hilera.appendChild(celda);
        }

        // agrega la hilera al final de la tabla (al final del elemento tblbody)
        tblBody.appendChild(hilera);
    }

    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
}

function testAction(entry){
    
}