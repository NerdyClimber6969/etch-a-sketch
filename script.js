//panel items
const panel =document.querySelector(".panel");
const modeBtns = document.querySelectorAll(".mode-btn");
const colorPalette = document.querySelector("#color-palette");
const slider = document.querySelector("#slider");

//canvas
const canvas = document.querySelector(".canvas");

let gridSize = 16;
let cellColor = "rgb(0, 0, 0)";
let mode = "color";
let mousePressed = false;

function createGrid(gridSize) {
    for (i=0; i<gridSize; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (j=0; j<gridSize; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            row.appendChild(cell);
        }

        canvas.appendChild(row);
    }
}

function randomColor() {
    const rgb = [];

    for (i=0; i<3; i++) {
        rgb.push(Math.floor(Math.random() * 255));
    }

    return rgb;
};

function changeColor(mode) {
    switch (mode) {
        case "color":
            cellColor = colorPalette.value;
            break;
        case "erase":
            cellColor = "rgb(255, 255, 255)";
            break;
        case "rainbow":
            let [r, g, b] = randomColor();
            cellColor = `rgb(${r}, ${g}, ${b})`;
            break;
    }
}

function draw(event) {
    if (event.target.className === "canvas") {
        return;
    }

    changeColor(mode);
    if (mousePressed === true) {
        event.target.style.backgroundColor = cellColor;
    }
} 

function recreateGrid() {
    canvas.innerHTML = "";
    gridSize = document.querySelector("#slider").value;
    createGrid(gridSize);
}

panel.addEventListener("click", function (event) {
    elementID = event.target.id;
    elemetClass = event.target.className;

    if (elemetClass === "panel-item mode-btn") {
        modeBtns.forEach((btn) => {
            if (btn.id === elementID) {
                btn.style.backgroundColor = "#A9A9A9";
                btn.style.color = "white"; 
            }
    
            else {
                btn.style.backgroundColor = "white";
                btn.style.color = "black";
            }  
        })

        mode = elementID;
    }

    else if (elementID === "clear") {
        recreateGrid();
        return;
    }

    else {
        return;
    }
})

slider.addEventListener("mouseup", function() {
    recreateGrid();
    document.querySelector("#grid-size").innerHTML = `Grid size: ${gridSize} x ${gridSize}`;
})

canvas.addEventListener("mousedown", function() {
    mousePressed = true;
})

canvas.addEventListener("mouseup", function() {
    mousePressed = false;
})

canvas.addEventListener("mouseout", function(event) {
    draw(event);
})

createGrid(gridSize);