const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

let currentPlayer;
let gameGrid;

const winningPositions = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,3,6],
     [1,4,7],
     [2,5,8],
     [0,4,8],
     [2,4,6]
];

// let's create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pe empty krna pdega after clicking newgame button
    boxes.forEach((box,index) => {
        box.innerText = "";
        // pahle handle click me none kiyya tha nhi update krenge to click hi nhi hoga 
        boxes[index].style.pointerEvents = "all";
        // green color ko remove krna hai jb game restart hoga means initialise box with css property again
        box.classList = `box box${index+1}`;
        // upar wale me class 2 hai ek to box and ek bo number ke sath to green color to kisi box me aa ksta hai thats why hmne index use kiya hai
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

// swap function
function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        // all three boxes should be non empty and same in value
        if( (gameGrid[position[0]] !== "" 
            || gameGrid[position[1]] !== "" 
            || gameGrid[position[2]] !== "") 
            && (gameGrid[position[0]] === gameGrid[position[1]]) 
            && (gameGrid[position[1]] === gameGrid[position[2]]) ) 
        {
            // check if winner is X
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }
            else {
                answer = "O";
            }
            // disable pointer event kuki winner mil gaya hai
            boxes.forEach((box,index) => {
                box.style.pointerEvents = "none";
            });

            // now we know  who is the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // it means we have a winner
    if(answer !== ""){
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
    }
    else { 
        // means it is tie
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }

    // another logic for game tied 
    // let fillCount = 0;
    // gameGrid.forEach((box) => {
    //     if(box !== "")
    //         fillCount++;
    // });

    //  board is filled , game is tie
    // if(fillCount === 9) {
    //     gameInfo.innerText = "Game Tied!";
    //     newGameBtn.classList.add("active");
    // }

}

// function to handle click
function handleClick(index){
    if(gameGrid[index] === ""){
        // for ui
        boxes[index].innerText = currentPlayer;
        // for js code status
        gameGrid[index] = currentPlayer;
        // to disable the cursor pointer
        boxes[index].style.pointerEvents = "none";
        // swap the turn for another player
        swapTurn();
        // chcek koi jeeta to nahi
        checkGameOver();
    }
}

// har ek box ke liye click handle kiya hai
boxes.forEach((box,index) => {
    // agar we will console log boxes then it will return nodelist of all th boxes and that's why we ca apply foreach on it 
    box.addEventListener("click",() => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);