    var sudoku = {
        /////////    GENERATION   ///////
        SudokuBoard: function (arg) {

            this.board = [];

            if (arg instanceof sudoku.SudokuBoard) { // Copy a SudokuBoard
                this.SQUARE_SIZE = arg.SQUARE_SIZE;
                this.BOARD_SIZE = arg.BOARD_SIZE;

                this.board = (JSON.parse(JSON.stringify(arg.board))); // Clone the board


            } else { // New SudokuBoard
                this.SQUARE_SIZE = arg === parseInt(arg, 10) ? arg : 3;
                this.BOARD_SIZE = this.SQUARE_SIZE * this.SQUARE_SIZE;

                this.generateBoard();
            }
        }
    }


    /////////   SudokuBoard functions   //////////

    // Gets the possible boards that can be generated from the current board state.
    // Returns an array of boards. If the board is finished or blocked, returns an empty array.
    sudoku.SudokuBoard.prototype.getPossibleBoards = function () {
        //TODO: trabajando aquiiiiiiiii

        var possBoard = [];
        var asigned = 0;

        var boardAux = new sudoku.SudokuBoard(this);
        var poss = boardAux.getPossibleValues();

        // Easy search
        for (var i = 0; i < poss.length; i++) {
            for (var j = 0; j < poss[i].length; j++) {
                if (typeof poss[i][j] !== 'undefined') {
                    if (poss[i][j].length == 1) {
                        boardAux.board[i][j] = poss[i][j][0];
                        asigned++;
                    }
                }
            }
        }

        if (asigned > 0) { // Unique solutions
            possBoard.push(boardAux);
        } else if (asigned <= 0 && !boardAux.isFinished()) { // No unique possibilities

            // Generate 1 board for each possibility
            for (var i = 0; i < poss.length; i++) {
                for (var j = 0; j < poss[i].length; j++) {
                    if (typeof poss[i][j] !== 'undefined') {
                        for (var w = 0; w < poss[i][j].length; w++) {
                            var newBoard = new sudoku.SudokuBoard(boardAux);
                            newBoard.board[i][j] = poss[i][j][w];
                            possBoard.push(newBoard);
                        }
                    }
                }
            }
        }

        return possBoard;

    }

    // Gets the count of the no blank cells in the board.
    sudoku.SudokuBoard.prototype.getFilledCount = function () {

        var numFilled = 0;

        for (var i = 0; i < this.BOARD_SIZE; i++) {
            for (var j = 0; j < this.BOARD_SIZE; j++) {
                if(this.board[i][j] != 0){
                    numFilled++;
                }
                    
            }
        }

        return numFilled;
    }
    
    // Gets the count of the blank cells in the board.
    sudoku.SudokuBoard.prototype.getBlanksCount = function () {

        var numBlanks = 0;

        for (var i = 0; i < this.BOARD_SIZE; i++) {
            for (var j = 0; j < this.BOARD_SIZE; j++) {
                if(this.board[i][j] == 0){
                    numBlanks++;
                }
                    
            }
        }

        return numBlanks;
    }



    // Sets the entire board to 0
    sudoku.SudokuBoard.prototype.intialize = function () {

        for (var i = 0; i < this.BOARD_SIZE; i++) {

            this.board[i] = [];

            for (var j = 0; j < this.BOARD_SIZE; j++)
                this.board[i][j] = 0;
        }
    }

    // Generate a valid sudoku board
    sudoku.SudokuBoard.prototype.generateBoard = function () {

        this.intialize();

        var iterations = 0;

        for (var num = 1; num <= this.BOARD_SIZE; num++) {

            var bloqued = false;

            // For each SQUARE row
            for (var i = 0; i < this.BOARD_SIZE; i += this.SQUARE_SIZE) {

                var used = {};
                var j = 0;

                // For each SQUARE column
                for (; j < this.BOARD_SIZE; iterations++) {

                    // Generate position in the SQUARE
                    var x = (i + (Math.round(Math.random() * (this.SQUARE_SIZE - 1))));
                    var y = (j + (Math.round(Math.random() * (this.SQUARE_SIZE - 1))));

                    if (Object.keys(used).length == this.BOARD_SIZE) {
                        bloqued = true;
                        break;
                    }

                    if (used[x + "" + y] !== true)
                        used[x + "" + y] = true;

                    // Test if is a valid number
                    if (this.board[x][y] != 0 || !this.isValidInRow(num, x) || !this.isValidInColumn(num, y)) {
                        continue;
                    }
                    this.board[x][y] = num;
                    used = {};

                    j += this.SQUARE_SIZE;
                }

                // If the algorithm is bloqued, go back and try again
                if (bloqued) {

                    this.replaceValue(num, 0);
                    num--;
                    this.replaceValue(num, 0);
                    num--;

                    break;
                }
            }
        }
        return iterations;
    }

    // Replace all cells that have the old value with the new value
    sudoku.SudokuBoard.prototype.replaceValue = function (oldValue, newValue) {
        for (var i = 0; i < this.BOARD_SIZE; i++)
            for (var j = 0; j < this.BOARD_SIZE; j++)
                if (this.board[i][j] == oldValue)
                    this.board[i][j] = newValue;

    }

    // Test if a value is valid in a cell
    sudoku.SudokuBoard.prototype.isValidInPos = function (value, row, column) {
        return this.isValidInRow(value, row) && this.isValidInColumn(value, column) && this.isValidInSquare(value, row, column);
    }

    // Test if a value is valid in a square
    sudoku.SudokuBoard.prototype.isValidInSquare = function (value, row, column) {
        // Calculate the square
        var x = Math.floor(row / this.SQUARE_SIZE) * this.SQUARE_SIZE;
        var y = Math.floor(column / this.SQUARE_SIZE) * this.SQUARE_SIZE;


        for (var i = 0; i < this.SQUARE_SIZE; i++)
            for (var j = 0; j < this.SQUARE_SIZE; j++)
                if (value == this.board[x + i][y + j])
                    return false;


        return true;
    }

    // Test if a value is valid in a column
    sudoku.SudokuBoard.prototype.isValidInColumn = function (value, column) {
        for (var i = 0; i < this.BOARD_SIZE; i++)
            if (this.board[i][column] == value)
                return false;

        return true;
    }

    // Test if a value is valid in a row
    sudoku.SudokuBoard.prototype.isValidInRow = function (value, row) {
        for (var i = 0; i < this.BOARD_SIZE; i++)
            if (this.board[row][i] == value)
                return false;


        return true;
    }

    // Convert the board into a string
    sudoku.SudokuBoard.prototype.toString = function () {
        var b = "";

        for (var i = 0; i < this.BOARD_SIZE; i++) {
            for (var j = 0; j < this.BOARD_SIZE; j++)
                b += this.board[i][j] + " ";
            b += ",";
        }

        return b;
    }