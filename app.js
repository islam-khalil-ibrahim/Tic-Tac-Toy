const initialBoard = ["", "", "", "", "", "", "", "", ""];
let board = [...initialBoard];
const boardElement = document.querySelector(".board");
const turnElement = document.getElementById("turn");
let turn = "X";
let xScore = 0,
  oScore = 0;

const render = () => {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    boardElement.insertAdjacentHTML(
      "beforeend",
      `
      <button 
      onclick="play(${index})" 
      class="cell ${cell}">
      ${cell}
      </button>`
    );
  });

  turnElement.innerHTML = `${turn} TURN`;
};

render();

//////////////////////
const play = (index) => {
  if (board[index] !== "") {
    return;
  }
  board[index] = turn;
  turn = turn === "X" ? "O" : "X";
  render();
  const winner = calcResult();
  if (winner) {
    renderWinner(winner);
  }
};

////////////////////////

const renderWinner = (winner) => {
  if ((winner === "X")) {
    xScore++;
    document.getElementById("xScore").innerText = "X " + xScore;
  } else if(winner ==='O') {
    oScore++;
    document.getElementById("oScore").innerText = "O " + oScore;
  }
  boardElement.insertAdjacentHTML(
    "beforeend",
    `
    <div class="result">
        <span>${winner ==='D'? 'Draw :-(' : `The winner is ${winner}`}</span>
        <button onclick='playAgin()' >Play Again</button>
      </div>`
  );
};

///////////////////////////////

const calcResult = () => {
  const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], //rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], //columns
    [0, 4, 8],
    [2, 4, 6], //diagonals
  ];

  for (const combination of winningCombination) {
    const [a, b, c] = combination;
    if (board[a] && board[b] === board[a] && board[b] === board[c]) {
      return board[a];
    }
  }

  if (!board.includes('')) {
    return 'D';
  }
  return null;
};

/////////////////
const playAgin = () => {
  board = [...initialBoard];
  turn = "X";
  render();
};
