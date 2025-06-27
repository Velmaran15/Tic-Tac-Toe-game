const boardElement = document.querySelector('.board');
const statusElement = document.getElementById('gameStatus');
const resetBtn = document.getElementById('resetBtn');

let board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // cols
  [0,4,8], [2,4,6]            // diagonals
];

function createBoard() {
  boardElement.innerHTML = '';
  board.forEach((_, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.addEventListener('click', onCellClick);
    boardElement.appendChild(cell);
  });
}

function onCellClick(e) {
  const index = e.target.dataset.index;

  if (!isGameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusElement.textContent = `Player ${currentPlayer} wins! 🎉`;
    isGameActive = false;
    return;
  }

  if (board.every(cell => cell)) {
    statusElement.textContent = "It's a Draw!";
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[b] === board[c];
  });
}

resetBtn.addEventListener('click', () => {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  isGameActive = true;
  statusElement.textContent = "Player X's turn";
  createBoard();
});

createBoard();
