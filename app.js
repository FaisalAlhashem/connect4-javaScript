// DOM Elements
const allCells = document.querySelectorAll(".cell:not(.row-top)");
const topCells = document.querySelectorAll(".cell.row-top");
const resetButton = document.querySelector(".reset");
const AiButton = document.querySelector(".AI");
const Aispan = document.querySelector(".AIstatus");
const statusSpan = document.querySelector(".status");

// columns
const column0 = [
  allCells[35],
  allCells[28],
  allCells[21],
  allCells[14],
  allCells[7],
  allCells[0],
  topCells[0],
];
const column1 = [
  allCells[36],
  allCells[29],
  allCells[22],
  allCells[15],
  allCells[8],
  allCells[1],
  topCells[1],
];
const column2 = [
  allCells[37],
  allCells[30],
  allCells[23],
  allCells[16],
  allCells[9],
  allCells[2],
  topCells[2],
];
const column3 = [
  allCells[38],
  allCells[31],
  allCells[24],
  allCells[17],
  allCells[10],
  allCells[3],
  topCells[3],
];
const column4 = [
  allCells[39],
  allCells[32],
  allCells[25],
  allCells[18],
  allCells[11],
  allCells[4],
  topCells[4],
];
const column5 = [
  allCells[40],
  allCells[33],
  allCells[26],
  allCells[19],
  allCells[12],
  allCells[5],
  topCells[5],
];
const column6 = [
  allCells[41],
  allCells[34],
  allCells[27],
  allCells[20],
  allCells[13],
  allCells[6],
  topCells[6],
];
const columns = [column0, column1, column2, column3, column4, column5, column6];

// rows
const topRow = [
  topCells[0],
  topCells[1],
  topCells[2],
  topCells[3],
  topCells[4],
  topCells[5],
  topCells[6],
];
const row0 = [
  allCells[0],
  allCells[1],
  allCells[2],
  allCells[3],
  allCells[4],
  allCells[5],
  allCells[6],
];
const row1 = [
  allCells[7],
  allCells[8],
  allCells[9],
  allCells[10],
  allCells[11],
  allCells[12],
  allCells[13],
];
const row2 = [
  allCells[14],
  allCells[15],
  allCells[16],
  allCells[17],
  allCells[18],
  allCells[19],
  allCells[20],
];
const row3 = [
  allCells[21],
  allCells[22],
  allCells[23],
  allCells[24],
  allCells[25],
  allCells[26],
  allCells[27],
];
const row4 = [
  allCells[28],
  allCells[29],
  allCells[30],
  allCells[31],
  allCells[32],
  allCells[33],
  allCells[34],
];
const row5 = [
  allCells[35],
  allCells[36],
  allCells[37],
  allCells[38],
  allCells[39],
  allCells[40],
  allCells[41],
];
const rows = [row0, row1, row2, row3, row4, row5, topRow];

//variables
let islive = true;
let yellowIsNext = true;
let ai = false;

//functions
const getClassListArray = (cell) => {
  const classList = cell.classList;
  return [...classList];
};
const getCellLocation = (cell) => {
  classList = getClassListArray(cell);
  const rowClass = classList.find((classname) => classname.includes("row"));
  const colClass = classList.find((classname) => classname.includes("col"));
  let rowIndex = parseInt(rowClass[4], 10);
  let colIndex = parseInt(colClass[4], 10);
  if (isNaN(rowIndex)) {
    rowIndex = -1;
  }
  return [rowIndex, colIndex];
};
//clears the color of a given cell
const clearCell = (cell) => {
  cell.classList.remove("yellow");
  cell.classList.remove("red");
  cell.classList.remove("win");
};

const getFirstOpenCellFromColumn = (colIndex) => {
  const col = columns[colIndex];
  for (let row = 0; row <= 5; row++) {
    if (
      !col[row].classList.contains("yellow") &&
      !col[row].classList.contains("red")
    ) {
      return col[row];
    }
  }
  return null;
};

const togglePlayer = () => {
  yellowIsNext = !yellowIsNext;
};

const checkWinningCells = (winningCells) => {
  if (winningCells.length < 4) return;
  islive = false;
  for (const winningcell of winningCells) {
    winningcell.classList.add("win");
  }
  statusSpan.textContent = `${yellowIsNext ? "yellow" : "red"} has won`;
};

const checkGameStatus = (cell) => {
  const color = getColorOfCell(cell);
  if (!color) return;
  const [rowIndex, colIndex] = getCellLocation(cell);
  checkHorizontally(cell, color, rowIndex, colIndex);
  checkVertically(cell, color, rowIndex, colIndex);
  checkDiagonally(cell, color, rowIndex, colIndex);
};

const checkHorizontally = (cell, color, rowIndex, colIndex) => {
  let winningCells = [cell];
  let rowToCheck = rows[rowIndex];
  //checking right of the given cell
  for (
    let i = colIndex + 1;
    i < rowToCheck.length && winningCells.length < 4;
    i++
  ) {
    const cellToCheck = rowToCheck[i];
    if (getColorOfCell(cellToCheck) !== color) break;
    winningCells.push(cellToCheck);
  }
  //checking left of the given cell
  for (let i = colIndex - 1; i >= 0 && winningCells.length < 4; i--) {
    const cellToCheck = rowToCheck[i];
    if (getColorOfCell(cellToCheck) !== color) break;
    winningCells.push(cellToCheck);
  }
  checkWinningCells(winningCells);
};

const checkVertically = (cell, color, rowIndex, colIndex) => {
  let winningCells = [cell];
  //checking below the given cell
  for (let i = rowIndex + 1; i <= 5; i++) {
    const cellToCheck = rows[i][colIndex];
    if (getColorOfCell(cellToCheck) !== color || i === 6) break;
    winningCells.push(cellToCheck);
  }
  checkWinningCells(winningCells);
};

const checkDiagonally = (cell, color, rowIndex, colIndex) => {
  let winningCells = [cell];
  //checking up-right
  for (let i = colIndex + 1, j = rowIndex - 1; i <= 6 && j >= 0; i++, j--) {
    const cellToCheck = rows[j][i];
    if (getColorOfCell(cellToCheck) !== color) break;
    winningCells.push(cellToCheck);
  }
  //checking down-left of the given cell
  for (let i = colIndex - 1, j = rowIndex + 1; i >= 0 && j <= 5; i--, j++) {
    const cellToCheck = rows[j][i];
    if (getColorOfCell(cellToCheck) !== color) break;
    winningCells.push(cellToCheck);
  }
  checkWinningCells(winningCells);
  //reseting and checking up-left
  winningCells = [cell];
  for (let i = colIndex - 1, j = rowIndex - 1; i >= 0 && j >= 0; i--, j--) {
    const cellToCheck = rows[j][i];
    if (getColorOfCell(cellToCheck) !== color) break;
    winningCells.push(cellToCheck);
  }
  // checking down-right
  for (let i = colIndex + 1, j = rowIndex + 1; i >= 0 && j <= 5; i++, j++) {
    const cellToCheck = rows[j][i];
    if (getColorOfCell(cellToCheck) !== color) break;
    winningCells.push(cellToCheck);
  }
  checkWinningCells(winningCells);
};

const getColorOfCell = (cell) => {
  const classList = getClassListArray(cell);
  if (classList.includes("yellow")) return "yellow";
  if (classList.includes("red")) return "red";
  return null;
};

const getScore = (cell) => {
  let yellowScore = 0;
  let redScore = 0;
  const [rowIndex, colIndex] = getCellLocation(cell);
  let winningCells = [];
  let rowToCheck = rows[rowIndex];

  //checking right of the given cell
  for (
    let i = colIndex + 1;
    i < rowToCheck.length && winningCells.length < 4;
    i++
  ) {
    const cellToCheck = rowToCheck[i];
    // if (getColorOfCell(cellToCheck) === null) break;
    if (getColorOfCell(cellToCheck) === "yellow") yellowScore++;
    else if (getColorOfCell(cellToCheck) === "red") redScore++;
    if (
      i + 1 < rowToCheck.length &&
      getColorOfCell(rowToCheck[i + 1]) === "yellow"
    ) {
      winningCells.push(cellToCheck);
    } else break;
  }
  console.log("winning cells");
  console.log(winningCells);
  if (winningCells.length >= 4) return 1000;
  else return yellowScore > redScore ? yellowScore : redScore;
};

const AImove = () => {
  if (!ai) return;
  if (yellowIsNext) return;
  let moves = [];
  for (let i = 0; i < topRow.length; i++) {
    const [rowIndex, colIndex] = getCellLocation(topRow[i]);
    let cell = getFirstOpenCellFromColumn(colIndex);
    moves.push(cell);
  }
  let scores = [];
  for (const cell of moves) {
    scores.push(getScore(cell));
  }
  console.log(scores);
};

//event handlers
const handleCellMouseOver = (e) => {
  if (!islive) return;
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);

  const topcell = topRow[colIndex];
  topcell.classList.add(yellowIsNext ? "yellow" : "red");
};

const handleCellMouseOut = (e) => {
  if (!islive) return;
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);

  const topcell = topRow[colIndex];
  clearCell(topcell);
};

const handleCellClick = (e) => {
  if (!islive) return;
  const cell = e.target;
  const [rowIndex, colIndex] = getCellLocation(cell);
  openCell = getFirstOpenCellFromColumn(colIndex);
  if (openCell) {
    openCell.classList.add(yellowIsNext ? "yellow" : "red");
    checkGameStatus(openCell);
    togglePlayer();
    const topcell = topRow[colIndex];
    clearCell(topcell);
    handleCellMouseOver(e);
  } else {
    alert("column is full");
  }
  AImove();
};

//adding event listeners
for (const row of rows) {
  for (const cell of row) {
    cell.addEventListener("mouseover", handleCellMouseOver);
    cell.addEventListener("mouseout", handleCellMouseOut);
    cell.addEventListener("click", handleCellClick);
  }
}
resetButton.addEventListener("click", function () {
  for (const row of rows) {
    for (const cell of row) {
      clearCell(cell);
    }
  }
  islive = true;
  yellowIsNext = true;
  statusSpan.textContent = "";
});
AiButton.addEventListener("click", function () {
  AiButton.classList.toggle("on");
  ai = !ai;
  Aispan.textContent = ai ? "ai is on" : "ai is off";
  AImove();
});
