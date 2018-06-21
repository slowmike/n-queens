/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});
  //iterate from 1 to n
    //use toggle to switch board(i,i) to 1
  //return board
  for(var i = 0; i < n; i++) {
    solution.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  // create new board sized n,n
  var board = new Board({n: n});
  // create a counter var for number of rooks placed
  var rookCount = 0;
  // create new function that takes in currentRow, board??
  var repeat = function(currentRow, boardState) {
    // if currentRow is equal to n
    if (currentRow >= n) {
      // if currentRow is equal to number of rooks
      if (currentRow === rookCount) {
        // solutionCount++;
        solutionCount++;
      }
      // return
      return;
    }

    // iterate through the row
    for (var i = 0; i < n; i++) {
      // toggle and add one to rook counter
      boardState.togglePiece(currentRow, i);
      rookCount++;
      // if there is no conflict
      if (!boardState.hasColConflictAt(i) && !boardState.hasRowConflictAt(currentRow)) {
        console.log(JSON.stringify(boardState));
        // rune the function with nextrow, board
        repeat(currentRow+1, boardState);
      }
      // toggle and minus one to rook counter
      boardState.togglePiece(currentRow, i);
      rookCount--;
    }
  }
  repeat(0, board);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  // create new board sized n,n
  var board = new Board({n: n});
  // create a counter var for number of rooks placed
  var queenCount = 0;
  var found = false;
  // create new function that takes in currentRow, board??
  var repeat = function(currentRow, boardState) {
    // if currentRow is equal to n
    if (currentRow >= n) {
      // if currentRow is equal to number of rooks
      if (currentRow === queenCount) {
        // solutionCount++;
        found = true;
      }
      // return
      return boardState;
    }

    // iterate through the row
    for (var i = 0; i < n; i++) {
      // toggle and add one to rook counter
      boardState.togglePiece(currentRow, i);
      queenCount++;
      // if there is no conflict
      if (!boardState.hasAnyQueenConflictsOn(currentRow, i)) {
        // rune the function with nextrow, board
        repeat(currentRow+1, boardState);
      }
      // toggle and minus one to rook counter
      //console.log(JSON.stringify(boardState.rows()));
      if(!found) {
        boardState.togglePiece(currentRow, i);
        queenCount--;
      } else {
        return boardState;
      }
    }
    return boardState;
  }
  solution = repeat(0, board).rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  // create new board sized n,n
  var board = new Board({n: n});
  // create a counter var for number of rooks placed
  var queenCount = 0;
  // create new function that takes in currentRow, board??
  var repeat = function(currentRow, boardState) {
    // if currentRow is equal to n
    if (currentRow >= n) {
      // if currentRow is equal to number of rooks
      if (currentRow === queenCount) {
        // solutionCount++;
        solutionCount++;
      }
      // return
      return;
    }

    // iterate through the row
    for (var i = 0; i < n; i++) {
      // toggle and add one to rook counter
      boardState.togglePiece(currentRow, i);
      queenCount++;
      // if there is no conflict
      if (!boardState.hasAnyQueenConflictsOn(currentRow, i)) {
        console.log(JSON.stringify(boardState));
        // rune the function with nextrow, board
        repeat(currentRow+1, boardState);
      }
      // toggle and minus one to rook counter
      boardState.togglePiece(currentRow, i);
      queenCount--;
    }
  }
  repeat(0, board);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
