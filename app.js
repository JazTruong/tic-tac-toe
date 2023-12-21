console.log("TIC TAC TOE");

//-- game state (globals)
let currentPlayer = "X";
let xScore = 0;
let oScore = 0;

//-- caching DOM elements reference
const cellsElem = document.querySelectorAll(".cell");
const xScoreElem = document.querySelector(".x-score");
const oScoreElem = document.querySelector(".o-score");
const playerTurnElem = document.querySelector(".player-turn")
const messageElem = document.querySelector(".message");
const drawMessageElem = document.querySelector(".draw-message");
const resetBtn = document.querySelector(".reset-btn");

//-- set up event listeners
for (let cellElem of cellsElem) {
    cellElem.addEventListener("click", handleCellClick)
}

resetBtn.addEventListener("click", handleReset)

//-- event handlers
function handleCellClick(event) {
    const clickedCell = event.target;
    //--set up selected grid - grid change to X or O
    //if nothing in the cell then cell = currentPlayer when click
    if (!clickedCell.textContent) {
       clickedCell.textContent = currentPlayer;
       playerTurnElem.textContent = "X Turn"
    // if currentPlayer already X then change to O then to X
       if (currentPlayer === "X") {
        currentPlayer = "O"
        playerTurnElem.textContent = "O Turn"
       } else {
        currentPlayer = "X"
       }
       //collecting move from player
       const gameBoard = generateGameBoard();
       //console.log(gameBoard); //-- check array output

       const winner = checkWinner(gameBoard);

        if (winner) {
            if (winner === "X") {
                xScore++; // update xScore
                xScoreElem.textContent = xScore;
            } else if (winner === "O") {
                oScore++; // update oScore
                oScoreElem.textContent = oScore;
            }
            //console.log(`Player ${winner} wins!`);
            messageElem.textContent = `${winner} WIN!` // display message
        } else {  
            const draw = checkDraw(gameBoard);
            if (draw && !winner) {
                messageElem.textContent = "DRAW!" //display message 
            }
        }
    } 
}

    //-- generate gameBoard array - 3 rows with 3 items in each row
function generateGameBoard() {
    const gameBoard = [];
    let index = 0;
    
    for (let i = 0; i < 3; i++) {
        const row = [];
        for (let j = 0; j < 3; j++) {
            const cellContent = cellsElem[index++].textContent || "";
            row.push(cellContent);
        }
        gameBoard.push(row);
    }
    return gameBoard;
}
    //-- set up win/loss conditions base on the position of index
    //-- checking ROWS - 3 options
function checkRows(gameBoard) {
    for (let row = 0; row < gameBoard.length; row++) {
        if (gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2]) {
            return gameBoard[row][0]; // return X or O  
        }
    }
    return null; // No winning
}

    //-- checking COLUMNS - 3 options
function checkColumns(gameBoard) {
    for (let col = 0; col < gameBoard.length; col++) {
        if (gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col]) {
            return gameBoard[0][col]; // return X or O
        }
    }
    return null; // No winning
}
    
    //-- checking DIAGONALS - 2 options
function checkDiagonals(gameBoard) {
    if ((gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
        (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0])) {
        return gameBoard[1][1]; // Returns 'X' or 'O' 
    }
    return null; // No winning
}

    // checking winning - by invoking the 3 condition functions and only show the winner X or O in 1 of the 3 conditions. The other 2 return null. 
function checkWinner(gameBoard) {
    const rowWin = checkRows(gameBoard);
    const colWin = checkColumns(gameBoard);
    const diagWin = checkDiagonals(gameBoard);

    return rowWin || colWin || diagWin;
}
    //-- set up draw
        //-- if checkWinner return null then check draw condition (no empty cell)
function checkDraw(gameBoard) {
    for (let row = 0; row < gameBoard.length; row++) {
        for (let col = 0; col < gameBoard[row].length; col++) {
            if (!gameBoard[row][col]) {
                return false;
            }
        }
    }
    return true;
}
//-- update score board - put in handleCellClick function when show win/draw

//-- reset game
function handleReset() {
    for (let cellElem of cellsElem) {
        cellElem.textContent = "";
        messageElem.textContent = "";
        playerTurnElem.textContent = "";
    }
}