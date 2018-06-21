// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var inRow = 0;
      for (slot of this.rows()[rowIndex]) {
        if (slot === 1) {
          inRow++;
        }
      }
      return inRow > 1;
      // var conflicts = function(curIndex, array) {
      //   var numConflicts = 0;
      //   if(curIndex === array[rowIndex].length) {
      //     return numConflicts;
      //   }
      //   if(array[rowIndex][curIndex]) {
      //     numConflicts++;
      //   }
      //   console.log(curIndex);
      //   return numConflicts+conflicts(curIndex+1);
      // };

      // return conflicts(0, this.rows()) > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var hasConflict = false;
      for (var rowIndex in this.rows()) {
        if (this.hasRowConflictAt(rowIndex)) {
          hasConflict = true;
        }
      }
      return hasConflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var inCol = 0;
      for (var row of this.rows()) {
        if(row[colIndex] === 1) {
          inCol++;
        }
      }
      return inCol > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var hasConflict = false;
      for (var colIndex in this.rows()[0]) {
        if (this.hasColConflictAt(colIndex)) {
          hasConflict = true;
        }
      }
      return hasConflict;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var inDiagonal = 0;
      var diagonalIndex = majorDiagonalColumnIndexAtFirstRow;
      var getDiagonalIndex = this._getFirstRowColumnIndexForMajorDiagonalOn;
      var board = this.rows();
      for (var rowIndex in board) {
        for (var colIndex in board[rowIndex]) {
          if (getDiagonalIndex(rowIndex, colIndex) === diagonalIndex && board[rowIndex][colIndex] === 1) {
            inDiagonal++;
          }
        }
      }
      return inDiagonal > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var hasConflict = false;
      for (var rowIndex in this.rows()) {
        for (var colIndex in this.rows()[rowIndex]) {
          var diagonalIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex);
          if (this.hasMajorDiagonalConflictAt(diagonalIndex)) {
            hasConflict = true;
          }
        }
      }
      return hasConflict;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var inDiagonal = 0;
      var diagonalIndex = minorDiagonalColumnIndexAtFirstRow;
      var getDiagonalIndex = this._getFirstRowColumnIndexForMinorDiagonalOn;
      var board = this.rows();
      for (var rowIndex in board) {
        for (var colIndex in board[rowIndex]) {
          if (getDiagonalIndex(JSON.parse(rowIndex), JSON.parse(colIndex)) === diagonalIndex && board[rowIndex][colIndex] === 1) {
            inDiagonal++;
          }
        }
      }
      return inDiagonal > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var hasConflict = false;
      for (var rowIndex in this.rows()) {
        for (var colIndex in this.rows()[rowIndex]) {
          var diagonalIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(JSON.parse(rowIndex), JSON.parse(colIndex));
          if (this.hasMinorDiagonalConflictAt(diagonalIndex)) {
            hasConflict = true;
          }
        }
      }
      return hasConflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
