//game board
var gameBoard = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]];
//human
var huPlayer = "b";
//ai
var aiPlayer = "w";

//round
var round = 0; //max is 64

//whose turn
var turn = 0; //0 is hu, 1 is ai
var black = 0; //number of black
var white = 0; //number of white

var mode = 0;

function setUp() { //sets up the board
  //checker pattern
  gameBoard[3][3] = "w";
  gameBoard[3][4] = "b";
  gameBoard[4][3] = "b";
  gameBoard[4][4] = "w";

  setTimeout(function(){ display(); }, 500); //displays it

  if(turn == 1 && mode == 1) {
    compMove();
  }
}


function display() { //display the board
  //black and white counts
    black = 0;
    white = 0;
    //sets each td on the screen to either black, white or transparent
    for(i = 0; i < 8; i++) {
      for(j = 0; j < 8; j++) {
        if(gameBoard[i][j] === huPlayer) { //black
          var selector = (i * 8 + j).toString();
          document.getElementById(selector).style.background = "#000000";
          black += 1;
        } else if(gameBoard[i][j] === aiPlayer) { //white
          var selector = (i * 8 + j).toString();
          document.getElementById(selector).style.background = "#ffffff";
          white += 1;
        } else { //transparent
          var selector = (i * 8 + j).toString();
          document.getElementById(selector).style.background = "transparent";
        }
      }
    }
    //sets number of tiles
    document.getElementById("black").innerHTML = "Black - " + black;
    document.getElementById("white").innerHTML = "White - " + white;
    //shows whose turn it is
    if(turn == 0) {
      document.getElementById("turn").innerHTML = "Turn - Black";
    } else {
      document.getElementById("turn").innerHTML = "Turn - White";
    }



}


// 1 player move functions

function userMove(pos) { //user move
  if(turn == 0 && canPlace(gameBoard, pos, huPlayer, aiPlayer)) { //checks if it is humans turn and he/she can place a tile
    gameBoard = updateBoard(gameBoard, pos, huPlayer, aiPlayer); //updates the board

    round += 1; //one more spot is gone

    //checks if each player can make a move, starting with the opposite player, else the game is over
    if(canMove(gameBoard, aiPlayer, huPlayer)) {
      turn = 1;
    } else if(canMove(gameBoard, huPlayer, aiPlayer)) {
      turn = 0;
    } else {
      display();
      setTimeout(function(){ gameOver(); }, 1000);
      return; //exits the function
    }

  }

  display();
  compMove();
}

function compMove() { //computer move

  setTimeout(function(){

  while(turn == 1) { //same as above, checks if the ai can go
    var computerPos = minimax(gameBoard, aiPlayer, 1).index;

    gameBoard = updateBoard(gameBoard, computerPos, aiPlayer, huPlayer); //updates the board

    round += 1; //one more spot is gone

    //checks if each player can make a move, starting with the opposite player, else the game is over
    if(canMove(gameBoard, huPlayer, aiPlayer)) {
      turn = 0;
    } else if(canMove(gameBoard, aiPlayer, huPlayer)){
      turn = 1;
    } else {
      display();
      setTimeout(function(){ gameOver(); }, 1000);
      return; //exits the function
    }
  }

  if(round == 64) { //if all the spots are taken, the game is over
    display();
    setTimeout(function(){ gameOver(); }, 1000);
  }

  display(); //displays the board

}, 1000);
}

//2 player move functions

function move(pos) { //actual move
  if(turn == 0 && canPlace(gameBoard, pos, huPlayer, aiPlayer)) { //checks if it is humans turn and he/she can place a tile
    gameBoard = updateBoard(gameBoard, pos, huPlayer, aiPlayer); //updates the board

    round += 1; //one more spot is gone

    //checks if each player can make a move, starting with the opposite player, else the game is over
    if(canMove(gameBoard, aiPlayer, huPlayer)) {
      turn = 1;
    } else if(canMove(gameBoard, huPlayer, aiPlayer)) {
      turn = 0;
    } else {
      display();
      setTimeout(function(){ gameOver(); }, 1000);
      return; //exits the function
    }

  } else if(turn == 1 && canPlace(gameBoard, pos, aiPlayer, huPlayer)) { //same as above, checks if the ai can go
    gameBoard = updateBoard(gameBoard, pos, aiPlayer, huPlayer); //updates the board

    round += 1; //one more spot is gone

    //checks if each player can make a move, starting with the opposite player, else the game is over
    if(canMove(gameBoard, huPlayer, aiPlayer)) {
      turn = 0;
    } else if(canMove(gameBoard, aiPlayer, huPlayer)){
      turn = 1;
    } else {
      display();
      setTimeout(function(){ gameOver(); }, 1000);
      return; //exits the function
    }
  }

  if(round == 64) { //if all the spots are taken, the game is over
    display();
    setTimeout(function(){ gameOver(); }, 1000);
  }

  display(); //displays the board
}




function gameOver() { //called when the game is over
  alert("game over");
  //says who won
  if(black > white) {
    alert("black won");
  } else if(black < white) {
    alert("white won");
  } else if(black == white) {
    alert("tie");
  }
  reset(); //resets the game
}

function reset() { //resets all variables
  gameBoard = [[0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7], [0, 1, 2, 3, 4, 5, 6, 7]];
  huPlayer = "b";
  aiPlayer = "w";
  round = 0;
  if(mode == 2) {
    turn = 0;
  }
  setUp(); //sets up the board
}

function getEmpty(b) { //returns an array of all positions(integers) that are empty
  var board = clone(b);
  var posArray = [];
  for(var i = 0; i < board.length; i++) {
    for(var j = 0; j < board[i].length; j++) {
      if(board[i][j] !== huPlayer && board[i][j] !== aiPlayer) { //makes sure it isn't filled
        posArray.push(i * 8 + j); //returns integer form (0 - 63)
      }
    }
  }
  return posArray; //returns array
}

function canMove(b, player, otherPlayer) { //checks if the player can move
  var posMoves = 0;
  var posArray = getEmpty(b); //gets all empty spots
  for(var x = 0; x < posArray.length; x++) {
      if(canPlace(b, posArray[x], player, otherPlayer)) { //checks if placing that tile in the spot will change the board
        posMoves += 1;
      }
    }


  if(posMoves !== 0) { //if there are possible spots
    return true;
  } else { //no possible spots
    return false;
  }
}

function canPlace(b, pos, player, otherPlayer) { //checks if you can place a tile in that position that will change the board
  var prevBoard = clone(b);
  var changedBoard = updateBoard(clone(b), pos, player, otherPlayer); //changed board

  var jPos = pos % 8;
  var iPos = Math.floor(pos / 8);
  prevBoard[iPos][jPos] = player; //with the new tile in place in the previous board


  if(checkSame(prevBoard, changedBoard)) { //checks if the arrays are the same
    return false;
  } else {
    if(b[iPos][jPos] !== player && b[iPos][jPos] !== otherPlayer) { //makes sure that the position is an empty tile
      return true;
    } else {
      return false;
    }

  }

}

function checkSame(array1, array2) { //compares two 2D arrays
  if(array1.length == array2.length) { //checks if the lengths are the same
    for(i = 0; i < array1.length; i++) {
      for(j = 0; j < array1[i].length; j++) {
        if(array1[i][j] !== array2[i][j]) { //compares each position
          return false;
        }
      }
    }
    return true;
  } else {
    return false;
  }
}


function clone(array) { //returns a cloned 2D array
	var newArray = []; //clone
  for(i = 0; i < array.length; i++) {
  	newArray[i] = [];
    for(j = 0; j < array[i].length; j++) {
    	newArray[i][j] = array[i][j]; //adds to clone
    }
  }
  return newArray;
}


function updateBoard(b, pos, player, otherPlayer) { //updates the board

  var board = clone(b); //clone of board

  //position of new tile
  var jPos = pos % 8;
  var iPos = Math.floor(pos / 8);


  board[iPos][jPos] = player;

  var flipArray = []; //array of tiles to be flipped
  var tempArray = []; //temporary array of tiles that can be flipped


  //total of 8 directions to be checked
  //2 VERTICAL, 2 HORIZONTAL, 4 DIAGONAL
  //all 8 loops have the same format

  //VERTICAL

  //check up
  for(i = 0; i < iPos; i++) { //checking moving up);
    if(board[iPos - i - 1][jPos] == otherPlayer) { //checks if it is an opposite tile
      tempArray.push([iPos - i - 1, jPos]); //adds to array
    } else if(board[iPos - i - 1][jPos] == player) { //checks if it is the same tile
      flipArray = addToArray(tempArray, flipArray); //adds all those that are in the temparray to the flip array
      break;
    } else { //since the tiles in that line can't be flipped, it breaks
      break;
    }
  }

  //check down

  tempArray = []; //resets

  for(i = 0; i < 7 - iPos; i++) { //checking moving up);
    if(board[iPos + i + 1][jPos] == otherPlayer) {
      tempArray.push([iPos + i + 1, jPos]);
    } else if(board[iPos + i + 1][jPos] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  //HORIZONTAL

  tempArray = []; //resets

  //check left
  for(j = 0; j < jPos; j++) { //checking moving up);
    if(board[iPos][jPos - j - 1] == otherPlayer) {
      tempArray.push([iPos, jPos - j - 1]);
    } else if(board[iPos][jPos - j - 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  //check right

  tempArray = [];  //resets

  for(j = 0; j < 7 - jPos; j++) { //checking moving up);
    if(board[iPos][jPos + j + 1] == otherPlayer) {
      tempArray.push([iPos, jPos + j + 1]);
    } else if(board[iPos][jPos + j + 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  //DIAGONAL

  //right left down up

  tempArray = [];  //resets

  var min; //min value in that diagonal line

  //value derives from i and j position of the  pos
  if(jPos < iPos) {
    min = jPos;
  } else {
    min = iPos;
  }


  for(j = 0; j < min; j++) { //checking moving up);
    if(board[iPos - j - 1][jPos - j - 1] == otherPlayer) {
      tempArray.push([iPos - j - 1, jPos - j - 1]);
    } else if(board[iPos - j - 1][jPos - j - 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  //left right up down

  tempArray = []; //resets

  var max = 0; //max value in diagonal line

  //value derives from i and j position of the pos

  if(jPos < iPos) { //left side
    var iTemp = iPos;
    while(iTemp !== 7) {
      max += 1;
      iTemp += 1;
    }
  } else { //right side
    var jTemp = jPos;
    while(jTemp !== 7) {
      max += 1;
      jTemp += 1;
    }
  }


  for(i = 0; i < max; i++) { //checking moving up //right here
    if(board[iPos + i + 1][jPos + i + 1] == otherPlayer) {
      tempArray.push([iPos + i + 1, jPos + i + 1]);
    } else if(board[iPos + i + 1][jPos + i + 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  //left right down up

  tempArray = []; //resets

  var min; //min value in line

  //value derives from i and j position of the  pos
  if(iPos + jPos < 8) {
    min = iPos;
  } else {
    min = 7 - jPos;
  }

  for(j = 0; j < min; j++) { //checking moving up);
    if(board[iPos - j - 1][jPos + j + 1] == otherPlayer) {
      tempArray.push([iPos - j - 1, jPos + j + 1]);
    } else if(board[iPos - j - 1][jPos + j + 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }



  //right left up down

  tempArray = []; //resets temp array

  var max = 0; //max value in line

  //value derives from i and j position of the  pos
  if(iPos + jPos < 8) { //left side
    var jTemp = jPos;
    while(jTemp !== 0) {
      max += 1;
      jTemp -= 1;
    }
  } else { //right side
    var iTemp = iPos;
    while(iTemp !== 7) {
      max += 1;
      iTemp += 1;
    }
  }

  for(i = 0; i < max; i++) { //checking moving up);
    if(board[iPos + i + 1][jPos - i - 1] == otherPlayer) {
      tempArray.push([iPos + i + 1, jPos - i - 1]);
    } else if(board[iPos + i + 1][jPos - i - 1] == player) {
      flipArray = addToArray(tempArray, flipArray);
      break;
    } else {
      break;
    }
  }

  board = flipValue(flipArray, board); //flips all the values
  return board;
}

function addToArray(array1, array2) { //adds values from one array to another
  for(i = 0; i < array1.length; i++) {
    array2.push(array1[i]);
  }
  return array2; //returns combined array
}


function flipValue(array, board) { //fips values in board array
  for(z = 0; z < array.length; z++) {
    //gets i and j pos and flips
    var i = array[z][0];
    var j = array[z][1];
    if(board[i][j] == huPlayer) {
      board[i][j] = aiPlayer;
    } else if(board[i][j] == aiPlayer) {
      board[i][j] = huPlayer;
    }
  }
  return board; //returns flipped board
}

function calcScore(b, player) { //calculates score
  var board = clone(b);
  var score = 0;
  for(i = 0; i < board.length; i++) {
    for(j = 0; j < board[i].length; j++) {
      if(board[i][j] == aiPlayer) { //ai is plus maximum
        score += 1; //multiplies by it region value
      } else if(board[i][j] == huPlayer) { //human is minus minimum
        score -= 1; //multiply by region value
      }
    }
  }
  return score;

}

function riskRegions(i, j) { //returns value of risk region
  var pos = i * 8 + j;
  //r1 - inner 4 * 4 - 1
  var r1 = 2;
  var arrayR1 = [18, 19, 20, 21, 26, 27, 28, 29, 34, 35, 36, 37, 42, 43, 44, 45];
  //r2 - border around r1 except corners - 0.5;
  var r2 = 3;
  var arrayR2 = [10, 11, 12, 13, 17, 22, 25, 30, 33, 38, 41, 46, 50, 51, 52, 53];
  //r3 - border of grid except corner and tiles next to corners - 2
  var r3 = 1;
  var arrayR3 = [2, 3, 4, 5, 16, 24, 32, 40, 23, 31, 39, 47, 58, 59, 60, 61];
  //r4 - three tiles touching each corner horizontally, vertically and diagonally - 0.25
  var r4 = 4;
  var arrayR4 = [1, 8, 9, 6, 14, 15, 48, 49, 57, 54, 55, 62];
  //r5 - corners - 4
  var r5 = 0;
  var arrayR5 = [0, 7, 56, 63];

  //identify which region it is in
  if(inArray(arrayR1, pos)) {
    return r1;
  } else if(inArray(arrayR2, pos)) {
    return r2;
  } else if(inArray(arrayR3, pos)) {
    return r3;
  } else if(inArray(arrayR4, pos)) {
    return r4;
  } else if(inArray(arrayR5, pos)) {
    return r5;
  }

}

function inArray(array, char) { //returns true if in array
  for(var i = 0; i < array.length; i++) {
    if(array[i] == char) {
      return true;
    }
  }
  return false;
}


function potentialSpots(b, player, otherPlayer) { //returns potential spots for move
  var board = clone(b);
  var posArray = getEmpty(board); //gets all empty spots
  var potentialArray = [];
  for(var x = 0; x < posArray.length; x++) {
      if(canPlace(b, posArray[x], player, otherPlayer)) { //checks if placing that tile in the spot will change the board
        potentialArray.push(posArray[x]);
      }
    }
  return potentialArray;
}


function minimax(newBoard, player, layer) { //minimax function aka ai function
  //get the number of available spots to move
  var availSpots;
  if(player == aiPlayer) {
    availSpots = potentialSpots(clone(newBoard), aiPlayer, huPlayer);
  } else if(player == huPlayer) {
    availSpots = potentialSpots(clone(newBoard), aiPlayer, huPlayer);
  }


  //return score if
  if(layer == 6) { //furthest layer
    return {score:calcScore(newBoard, player)};
  } else if(availSpots.length == 0) { //no more spots available
    return {score:calcScore(newBoard, player)};
  }




  var moves = []; //array of all possible moves

  for(var i = 0; i < availSpots.length; i++) { //for each move
    var move = {}; //create object of move
    move.index = availSpots[i]; //pos of move
    move.board = clone(newBoard); //board of move

    //updates the board with the move
    if(player == huPlayer) {
      move.board = updateBoard(move.board, move.index, huPlayer, aiPlayer);
    } else if(player == aiPlayer) {
      move.board = updateBoard(move.board, move.index, aiPlayer, huPlayer);
    }

    //gets score of the move
    if(player == aiPlayer) {
      var result = minimax(move.board, huPlayer, layer + 1); //calls minimax again until it gets score
      move.score = result.score;
    } else if(player == huPlayer) {
      var result = minimax(move.board, aiPlayer, layer + 1); //calls minimax again until it gets score
      move.score = result.score;
    }

    moves.push(move); //pushes the move to the array

  }

  var bestMove = 0; //best move index
  moves = getBestRisk(moves);
  //console.log("moves");
  //console.log(moves);
  if(player === aiPlayer){ //maximize ai
    var bestScore = moves[0].score;
    for(var i = 0; i < moves.length; i++){ //maximize ai
      if(moves[i].score > bestScore){ //search for the highest score
        bestScore = moves[i].score;
        bestMove = i;
      }
    }

  } else {
  // else loop over the moves and choose the move with the lowest score
    var bestScore = moves[0].score;
    for(var i = 0; i < moves.length; i++){ //minimize human
      if(moves[i].score < bestScore){ //search for the lowest score
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  // return the chosen move (object) from the moves array
  return moves[bestMove];
}

function getBestRisk(moves) {
  var riskArray = [];
  for(var i = 0; i < 5; i++) {
    riskArray.push([]);
  }
  for(var i = 0; i < moves.length; i++) {
    var pos = moves[i].index;
    var jPos = pos % 8;
    var iPos = Math.floor(pos / 8);
    var index = riskRegions(iPos, jPos);
    riskArray[index].push(moves[i]);
  }

  for(var i = 0; i < riskArray.length; i++) {
    if(riskArray[i].length !== 0) {
      return riskArray[i];
    }
  }
}


$(document).ready(function() { //onclick for a td
    $("td").click(function(event) {
      if(mode == 1) {
        userMove(event.target.id);
      } else if(mode == 2) {
        move(event.target.id);
      }
    });
});

$(document).ready(function() { //onclick for a td
    $(".one").click(function(event) {
        mode = 1;
        document.getElementById("players").style.visibility = "hidden";
        document.getElementById("game").style.visibility = "visible";
        setUp();
    });
});

$(document).ready(function() { //onclick for a td
    $(".two").click(function(event) {
        mode = 2;
        document.getElementById("players").style.visibility = "hidden";
        document.getElementById("game").style.visibility = "visible";
        setUp();
    });
});
