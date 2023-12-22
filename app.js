let currentPlayer = "Santa";
let santaScore = 0;
let reindeerScore = 0;

const cellsElem = document.querySelectorAll(".cell");
const santaScoreElem = document.querySelector(".santa-score");
const reindeerScoreElem = document.querySelector(".reindeer-score");
const playerTurnElem = document.querySelector(".player-turn")
const messageElem = document.querySelector(".message");
const drawMessageElem = document.querySelector(".draw-message");
const resetBtn = document.querySelector(".reset-btn");
const audioElem = new Audio("./audio/jingle-bells-bells-only-181672.mp3");

function playSound() {
    audioElem.play()
}

for (let cellElem of cellsElem) {
    cellElem.addEventListener("click", handleCellClick)
}

resetBtn.addEventListener("click", handleReset)
playerTurnElem.addEventListener("click", playSound)

function handleCellClick(event) {
    const clickedCell = event.target;
  
    if (!clickedCell.textContent) {
       clickedCell.textContent = currentPlayer;
       playerTurnElem.textContent = "Santa - turn"
       if (currentPlayer === "Santa") {
        clickedCell.classList.add("santa");
        currentPlayer = "Reindeer"
        playerTurnElem.textContent = "Reindeer - turn"
       } else {
        currentPlayer = "Santa"
        clickedCell.classList.add("reindeer");
       }

       const gameBoard = generateGameBoard();
       const winner = checkWinner(gameBoard);

        if (winner) {
            if (winner === "Santa") {
                santaScore++; 
                santaScoreElem.textContent = santaScore;
            } else if (winner === "Reindeer") {
                reindeerScore++; 
                reindeerScoreElem.textContent = reindeerScore;
            }
            messageElem.textContent = `${winner} Win!` 
        } else {  
            const draw = checkDraw(gameBoard);
            if (draw && !winner) {
                messageElem.textContent = "DRAW!" 
            }
        }
    } 
}

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
    
function checkRows(gameBoard) {
    for (let row = 0; row < gameBoard.length; row++) {
        if (gameBoard[row][0] === gameBoard[row][1] && gameBoard[row][1] === gameBoard[row][2]) {
            return gameBoard[row][0];   
        }
    }
    return null; 
}

function checkColumns(gameBoard) {
    for (let col = 0; col < gameBoard.length; col++) {
        if (gameBoard[0][col] === gameBoard[1][col] && gameBoard[1][col] === gameBoard[2][col]) {
            return gameBoard[0][col]; 
        }
    }
    return null; 
}

function checkDiagonals(gameBoard) {
    if ((gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) ||
        (gameBoard[0][2] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][0])) {
        return gameBoard[1][1]; 
    }
    return null; 
}

function checkWinner(gameBoard) {
    const rowWin = checkRows(gameBoard);
    const colWin = checkColumns(gameBoard);
    const diagWin = checkDiagonals(gameBoard);

    return rowWin || colWin || diagWin;
}

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

function handleReset() {
    for (let cellElem of cellsElem) {
        cellElem.classList.remove("santa");
        cellElem.classList.remove("reindeer");
        cellElem.textContent = "";
        messageElem.textContent = "Santa vs Reindeer";
        playerTurnElem.textContent = "Music";
    }
}