# This is my README

- drawing the wireframe
- working on html to set up game-frame
- refer to concept of guessing to work out the way to select each grid and display X or O. 

## in JS
//-- game state (globals)

//-- caching DOM elements reference

//-- set up event listeners

//-- event handlers

    //--set up selected grid - grid change to X or O

    //-- collecting player moves and input to an array then compare the index position for winning positions.

    //-- e.g: gameBoard = [
        0[0, 1, 2],
        1[0, 1, 2],
        2[0, 1, 2]
    ]

    //-- check winning base on the 3 winning functions.

    //-- update score board

    //-- set up win/loss
    
    //-- set up draw

    //-- reset game
    
//-- other function

## check list

- I can draw a 3 x 3 board with HTML & CSS

- I can click on any cell to change it to show an X (or some image or token)

- I can alternate between X and O when clicking on cells

- I can console log "win" when 3 x'es has been placed on the first row

- I can console log "X win" when 3 x'es has been placed on any winning row or column or diagonal
** For each winning pattern:
    Check if the symbols in the cell matching the patterns (3 in the row, 3 in the column or 3 in the diagonal) If the symbol matching then declare the player with that symbol is winner.
    
- I can console log "draw" when the game is a draw

- I can keep track of game rounds or score with a win counter

- I can reset the game to play again without refreshing the browser

- and finally.... there are no prompt() or alert() in my code



## challenging
- making winning conditions.
- collecting player moves and generate game board.
- taking most of the time to sort out these 2 functions.