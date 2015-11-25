# Sudoku.js
### Example
------
Generate a valid sudoku board:

`var sb = new sudoku.SudokuBoard();`

 You can get the cell values with .board:

```
var sb = new sudoku.SudokuBoard();
sb.board[X][Y];
```

Or you can get a string from the board:
```
  var sb = new sudoku.SudokuBoard();
  var text = sb.toString().split(",");
  var tab = "";
  
  for (var t in text) {
      tab += text[t] + "<br/>";
  }
```



### Functions
------
| Function                         						| Description                                                                                      |
|-------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| intialize()                      						| Sets all the values on the board to zero                                                                           |
| generateBoard()                  						| Generates a valid sudoku board                                                                    |
| replaceValue(oldValue, newValue) 						|Rreplaces all oldValue cells in the board with newValue                                            |
| isValidInPos(value, row, column) 						| Checks if value is valid in a cell (returns true o false)                                         |
| toString()                       						| Returns the board into a string in wich the rows are separated by comas<br/> and the columns by spaces |

### Iterations and time
------

|            | test | average iterations | average time (ms) |
|------------:|------|:--------------------:|:--------------:|
| Javascript | 1000 |      20860.032     | 50.313       |


