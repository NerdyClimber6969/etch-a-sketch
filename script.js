//panel items
const panel =document.querySelector(".panel");
const slider = document.querySelector("#slider");

//canvas
const canvas = document.querySelector(".canvas");

let gridSize = 16;
let cellColor = "rgb(0, 0, 0)";
let earseFlag = false;
let clearFlag = false;
let rainbowFlag = false;
let mousePressed = false;

function createGrid(gridSize) {
    for (i=0; i<gridSize; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (j=0; j<gridSize; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        };

        canvas.appendChild(row);
    }; 
};

function randomColor() {
    const rgb = [];

    for (i=0; i<3; i++) {
        rgb.push(Math.floor(Math.random() * 255));
    };

    return rgb;
};

function draw(event) {
    if (event.target.className === "canvas") {
        return;
    };

    if (rainbowFlag === true) {
        let [r, g, b] = randomColor();
        cellColor = `rgb(${r}, ${g}, ${b})`;
    };

    if (earseFlag === true) {
        cellColor = "rgb(255, 255, 255)";
    };

    if (mousePressed === true) {
        event.target.style.backgroundColor = cellColor;
    };
} 

function recreateGrid() {
    canvas.innerHTML = "";
    gridSize = document.querySelector("#slider").value;
    createGrid(gridSize);
}

panel.addEventListener("click", function (event) {
    elementID = event.target.id;

    switch (elementID) {
        case "rainbow":
            rainbowFlag = !rainbowFlag;
            cellColor = "rgb(0, 0, 0)";
            earseFlag = false;
            break;
        case "erase":
            earseFlag = !earseFlag;
            rainbowFlag = false;
            break;
        case "clear":
            recreateGrid();
    };
});

slider.addEventListener("mouseup", function() {
    recreateGrid();
    document.querySelector("#grid-size").innerHTML = `Grid size: ${gridSize} x ${gridSize}`;
});

canvas.addEventListener("mousedown", function() {
    mousePressed = true;
});

canvas.addEventListener("mouseup", function() {
    mousePressed = false;
});

canvas.addEventListener("mousemove", function(event) {
    draw(event);
});

createGrid(gridSize);