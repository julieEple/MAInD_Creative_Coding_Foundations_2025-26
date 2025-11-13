const grid = document.getElementById('grid');
const grid_size = 12; //maybe let user choose level which will be defined by gridsize (harder with 40x40 fex)
const cells = []; //2D array of rows with columns
// Access a cell by CELLS[row][col]

let apples = [];
let dir = "up";


let snake = [
    {cc: 5, rc: 5}, // head -- column coordinate and row coordinate
    {cc: 5, rc: 6},
    {cc: 5, rc: 7}  // tail
    ];



//creating grid 
function makeGrid(){
    for (let r = 0; r < grid_size; r++) { //will go through every row and all the columns it contains
        const row = []; //makes new row for every 
        for (let c = 0; c < grid_size; c++) {
            const cell = document.createElement('div'); //cell created
            cell.classList.add('cell');  //cell assigned new class cell                 
            grid.appendChild(cell); //cell added to grid whoch works like a container
            row.push(cell); //column-cell is added to the row-array
    }
        cells.push(row); //row is added to 2D array of rows with column cells
    }
}
  

function showSnake(){
    for(let r = 0; r<grid_size; r++){
        for(let c=0; c<grid_size; c++){
            cells[r][c].style.background=''; //empty cell, so that 
        }
    }
    for (let i = 0; i < snake.length; i++) { //go through every part of the snake (every cell element)
        let snakepart = snake[i];
        let r = snakepart.rc; 
        let c = snakepart.cc; 
    
        if (i === 0) {
          cells[r][c].style.background = 'darkgreen'; // head
        } else {
          cells[r][c].style.background = 'limegreen'; // body
        }
      }

      // Draw the apples aswell use emoji later🍎
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        let r = apple.rc;
        let c = apple.cc;
        cells[r][c].style.background = 'red';
    }

}

function makeApple(){
    while (apples.length < 3) {
        const randR = Math.floor(Math.random() * grid_size);
        const randC = Math.floor(Math.random() * grid_size);

        // make sure the apple is not places on the snake hehe
        let onSnake = false;
        for (let part of snake) {
          if (part.rc === randR && part.cc === randC) {
            onSnake = true;
            break; // breaks if true
          }
        }
        if (!onSnake) {
            apples.push({ rc: randR, cc: randC });
          }
    }
}

function move() {
    let head = snake[0];
    let newHead = { rc: head.rc, cc: head.cc };
  
    if (dir === "up") newHead.rc--;
    if (dir === "down") newHead.rc++;
    if (dir === "right") newHead.cc++;
    if (dir === "left") newHead.cc--;
  
    snake.unshift(newHead);
  
    snake.pop();
  
    showSnake();
  }
  



function eatApple(){

}

document.addEventListener('DOMContentLoaded', () => {
    makeGrid();     // create the grid first
    makeApple(); //fill the apple list with cells
    // showSnake();    // then draw the snake on it
    move(); //will be called by thread or listener, but here now so it can be tested
    
});