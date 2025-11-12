//creating grid 
document.addEventListener('DOMContentLoaded', () => { //to make sure the grid does not return null 
    const grid = document.getElementById('grid');
    const GRID_SIZE = 12;
  
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const cell = document.createElement('div'); 
        cell.classList.add('cell');                  
        grid.appendChild(cell);                      
      }
    }
  });
  