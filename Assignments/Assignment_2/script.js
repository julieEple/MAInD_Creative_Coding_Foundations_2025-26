//creating grid 
document.addEventListener('DOMContentLoaded', () => { //to make sure the grid does not return null 
    const grid = document.getElementById('grid');
    const GRID_SIZE = 12;

    const CELLS = []; //2D array of rows with columns
    // Access a cell by CELLS[row][col]

    for (let r = 0; r < GRID_SIZE; r++) { //will go through every row and all the columns it contains
        const row = []; //makes new row for every 
        for (let c = 0; c < GRID_SIZE; c++) {
            const cell = document.createElement('div'); //cell created
            cell.classList.add('cell');  //cell assigned new class cell                 
            grid.appendChild(cell); //cell added to grid whoch works like a container
            row.push(cell); //column-cell is added to the row-array
    }
    CELLS.push(row); //row is added to 2D array of rows with column cells
    }
  });
  
  

