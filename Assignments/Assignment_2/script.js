const grid = document.getElementById('grid');
const grid_size = 12;
const cells = []; //2D array of rows with columns
// Access a cell by CELLS[row][col]
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
            cells[r][c].style.background=''; //empty cell
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

}

document.addEventListener('DOMContentLoaded', () => {
    makeGrid();     // create the grid first
    showSnake();    // then draw the snake on it
});