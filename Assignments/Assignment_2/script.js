const grid = document.getElementById('grid');
const grid_size = 12; //maybe let user choose level which will be defined by gridsize (harder with 40x40 fex)
const cells = []; //2D array of rows with columns
// Access a cell by CELLS[row][col]

let apples = [];
let dir = "up";
let score = "0";


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
  
    snake.unshift(newHead); // new head to animate movement 

    // check if snake collides with apple
    let ate = false; 
    for (let i = 0; i < apples.length; i++) {
      const apple = apples[i];
      if (apple.rc === newHead.rc && apple.cc === newHead.cc) {
        eatApple(i); 
        ate = true;
        break;
      }
    }
  
//only remove tail if we don´t eat apple (if we eat apple the snake grows)
    if (!ate) snake.pop();
  
    showSnake();
  }
  

function eatApple(apple){
        apples.splice(apple, 1);
        
}

document.addEventListener('DOMContentLoaded', () => {
    makeGrid();     // create the grid first
    makeApple(); //fill the apple list with cells
    showSnake();    // then draw the snake on it
    setInterval(move, 1000);
    
//make button panel so I can change directons
    document.getElementById("up").addEventListener("click", () => dir = "up");
    document.getElementById("down").addEventListener("click", () => dir = "down");
    document.getElementById("left").addEventListener("click", () => dir = "left");
    document.getElementById("right").addEventListener("click", () => dir = "right");
  
    // also add keyboard 
    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") dir = "up";
      if (event.key === "ArrowDown") dir = "down";
      if (event.key === "ArrowLeft") dir = "left";
      if (event.key === "ArrowRight") dir = "right";
    });
    
});