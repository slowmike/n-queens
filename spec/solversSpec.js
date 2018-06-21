describe('solvers', function() {
  window.displayBoard = function() {};

  describe('findNRooksSolution()', function() {
    it('finds a valid solution for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionBoard = new Board(findNRooksSolution(n));
        var numPieces = _.reduce(solutionBoard.rows(), function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);

        expect(solutionBoard.get('n')).to.equal(n);
        expect(numPieces).to.equal(n);
        expect(solutionBoard.hasAnyRooksConflicts()).to.be.equal(false);
      });
    });

  });

  describe('countNRooksSolutions()', function() {

    it('finds the number of valid solutions for n of 1-8', function() {
      _.range(1, 9).map(function(n) {
        var solutionCount = countNRooksSolutions(n);
        var expectedSolutionCount = [1, 1, 2, 6, 24, 120, 720, 5040, 40320][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
      });
    });

  });

  describe('findNQueensSolution()', function() {

    it('finds a valid solution for n of 0-7', function() {
      // Skip 2 and 3 because they have no solution.
      [0, 1, 4, 5, 6, 7, 8].map(function(n) {
        var solutionBoard = new Board(findNQueensSolution(n));
        var numPieces = _.reduce(solutionBoard.rows(), function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);

        expect(solutionBoard.get('n')).to.equal(n);
        expect(numPieces).to.equal(n);
        expect(solutionBoard.hasAnyQueensConflicts()).to.be.equal(false);
      });

      // Check 2 and 3 for no solution
      [2, 3].map(function (n) {
        var solutionBoard = new Board(findNQueensSolution(n));
        var numPieces = _.reduce(solutionBoard.rows(), function(memo, row) {
          return memo + _.reduce(row, function(memo, col) {
            return memo + col;
          }, 0);
        }, 0);

        expect(numPieces).to.equal(0);
        expect(solutionBoard.get('n')).to.equal(n);
      });
    });

  });

  describe('countNQueensSolutions()', function() {
    var n = 8;
    it(`finds the number of valid solutions for n of 0-${n}`, function() {
      _.range(0, n+1).map(function(n) {
        var solutionCount = countNQueensSolutions(n);
        var expectedSolutionCount = [1, 1, 0, 0, 2, 10, 4, 40, 92, 352, 724, 2680, 14200, 73712, 365596, 2279184][n];

        expect(solutionCount).to.be.equal(expectedSolutionCount);
        // expect(solutionCount).to.not.equal(-1);
      });
    });
    // _.range(0, n+1).map(function(n) {
    //   it(`finds the number of valid solutions for n = ${n}`, function() {
    //       var solutionCount = countNQueensSolutions(n);
    //       expect(solutionCount).to.not.equal(-1);
    //   });
    // });
  });

});
