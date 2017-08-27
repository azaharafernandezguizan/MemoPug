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
    var difficultySelected = $("#difficultyOptions")[0].value;

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
        numberFound = false;
        while (!numberFound) {
            var rdmNumber = Math.ceil(Math.random() * totalImagesApp);

            if (numbersFound.indexOf(rdmNumber) == -1) {
                array[index] = rdmNumber;
                numberFound = true;
            }
        }
    });

    var numbersDuplicate = numbersFound.concat(numbersFound);
    var positionFound = new Array(numbersDuplicate.length);

    for (i = 0; i < matrizBoard.length; i++) {
        for (i = 0; i < matrizBoard[0].length; i++) {
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
    var body = document.getElementsByTagName("body")[0];

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
            btn.id = "btnBoard"+matrizBoard[i][j];
            btn.onclick = (function() {return function() {testAction();}})();

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