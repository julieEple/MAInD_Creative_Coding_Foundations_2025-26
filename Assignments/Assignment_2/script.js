const grid = document.getElementById('grid');

const grid_size = 12; //maybe let user choose level which will be defined by gridsize (harder with 40x40 fex)
const cells = []; //2D array of rows with columns
// Access a cell by CELLS[row][col]

let apples = [];
const amountOfApples=3;

let dir = "up";
let paused = false; //ability to pause so that they can choose the character and apple/target 
const avatars = document.querySelectorAll(".avatar");
let headAvatar = "🐸";
let score =0;
const scoreDisplay = document.getElementById("score");

let speed = 500; // beginning speed
let speedIncrement = 10; // to reduce the interval == make speed up
let minSpeed = 100; //not make it tooooo hard

let snake = [ //starting snake can´t be
    {cc: 5, rc: 5}, 
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
            cells[r][c].textContent=''; //empty cell, so that 

        }
    }
    for (let i = 0; i < snake.length; i++) { //go through every part of the snake (every cell element)
        let snakepart = snake[i];
        let r = snakepart.rc; 
        let c = snakepart.cc; 
    
        if (i === 0) {
        cells[r][c].textContent=headAvatar;
        cells[r][c].style.background = 'lightyellow'; // head
        } else {
            if(headAvatar=="🐸"){
                cells[r][c].style.background = "#89fc00"; // body, i want the body color to match the delected avatar
                cells[r][c].textContent='';
            }
            else if(headAvatar=="🦄"){
                cells[r][c].style.background = '#e500a4'; // body, i want the body color to match the delected avatar
                cells[r][c].textContent='';
            }
            else if(headAvatar=="👽"){
                cells[r][c].style.background = 'grey'; // body, i want the body color to match the delected avatar
                cells[r][c].textContent='';
            }
            else if(headAvatar=="🧞‍♂️"){
                cells[r][c].style.background = '#0aefff'; // body, i want the body color to match the delected avatar
                cells[r][c].textContent='';
            }
            else{
                cells[r][c].style.background = '#fc2f00'; // body, i want the body color to match the delected avatar
                cells[r][c].textContent='';
            }
        }
      }
      
      // Draw the apples aswell use emoji later🍎🪰🍄🌎🍟🦌
    for (let i = 0; i < apples.length; i++) {
        let apple = apples[i];
        let r = apple.rc;
        let c = apple.cc;
        if(headAvatar == "🐸"){
            cells[r][c].textContent = '🪰';
        }
        else if(headAvatar == "🦄"){
            cells[r][c].textContent = '🍄';
        }
        else if(headAvatar == "👽"){
            cells[r][c].textContent = '🌎';
        }
        else if(headAvatar == "🧞‍♂️"){
            cells[r][c].textContent = '🍟';
        }
        else{ cells[r][c].textContent = '🦌';} 

    }

}

function makeApple(){
    while (apples.length < amountOfApples) {
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
    if (paused) return; //wouldnt want to move if we are paused ;) 

    let head = snake[0];
    let newHead = { rc: head.rc, cc: head.cc };
  
    if (dir === "up") newHead.rc--;
    if (dir === "down") newHead.rc++;
    if (dir === "right") newHead.cc++;
    if (dir === "left") newHead.cc--;
    //check if head is moving outside of grid
    if ( //if the newHead row is bigger than zero aswell as bigger than the grid size (if not it can go out through the top and through the side hehe)
        newHead.rc < 0 || newHead.rc >= grid_size || newHead.cc < 0 || newHead.cc >= grid_size) {
            startGame();
            return; 
      }
    snake.unshift(newHead); // new head to animate movement 
    // check if snake collides with apple = no tail removed 
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

//check if head is crashing with body (head cooridnates == any of the other array coordinates)
    let crash = false;
    for (let i = 1; i < snake.length; i++) {
        const part = snake[i];
        if (snake[0].rc === part.rc && snake[0].cc === part.cc) {
          crash = true;
          break;
        }
      }
    if(crash == true){
        console.log("den krsæjet")
        startGame();
    }    
    showSnake();
  }
  

function restartGame(){
    // location.reload();
    startGame();

}

function updateScore() {
    scoreDisplay.textContent = score;
}

function eatApple(apple){
        apples.splice(apple, 1);
        score++;
        updateScore();
        const eatSound = document.getElementById("eatSound");
        eatSound.currentTime = 0; 
        eatSound.play();

        speed = Math.max(minSpeed, speed - speedIncrement);
        makeApple();
}

function gameLoop() {
    if (!paused) move(); 
    setTimeout(gameLoop, speed);
}

//need to make changes so that game can be restart without .reload()
function resetValues() {
    apples = [];
    snake = [
        {cc: 5, rc: 5},
        {cc: 5, rc: 6},
        {cc: 5, rc: 7}
    ];
    dir = "up";
    paused = false;
    score = 0;
    speed = 500;
    updateScore();
}

function resetGrid() {
    grid.innerHTML = "";
    cells.length = 0;
}

function startGame() {
    resetValues();
    resetGrid();
    makeGrid();
    makeApple();
    showSnake();
}

document.addEventListener('DOMContentLoaded', () => {
    makeGrid();
    startGame();
    gameLoop();
});

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
//eventlistener for space button which pauses game

    let pauseButtonText = document.getElementById("pause")

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") {
          paused = !paused; // toggle between true/false aka play/pause
          if (paused) {
            pauseButtonText.textContent = "Resume";
        } else {
            pauseButtonText.textContent = "Pause";
        }
        }
      });

      pauseButtonText.addEventListener("click", () => {
        paused = !paused;
        if (paused) {
            pauseButtonText.textContent = "Resume";
        } else {
            pauseButtonText.textContent = "Pause";
        }
    });
    //eventlistener for avatar selection
    document.querySelectorAll(".ava").forEach(avatarDiv => {
        avatarDiv.addEventListener("click", () => {
            headAvatar = avatarDiv.dataset.avatar;
        });
    });
    


