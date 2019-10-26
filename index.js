let character, gameEnded, grid;
const selectors = {
  squares: document.querySelectorAll('.square'),
  winner: document.querySelector('.winner')
};

selectors.squares.forEach(square => square.addEventListener('click', play));

document.querySelector('.reset-button').addEventListener('click', resetGame);

function resetGame() {
  gameEnded = false;
  character = 'X';
  grid = [[Array(3)], [Array(3)], [Array(3)]];
  selectors.winner.innerText = '';
  selectors.squares.forEach(square => (square.innerText = ''));
}

function play({ target }) {
  if (gameEnded || target.innerText) {
    return;
  }
  document.getElementsByTagName('body')[0].setAttribute('data-player', character);
  character = character === 'X' ? 'O' : 'X';
  target.innerText = character;
  const [rowIndex, cellIndex] = target.getAttribute('data-grid-position').split('-');
  grid[rowIndex][cellIndex] = character;
  const winner = checkWinner('X') ? 'X' : checkWinner('O') ? 'O' : null;
  if (winner) {
    gameEnded = true;
    selectors.winner.innerText = `"${winner}" has won the game`;
  }
}

function checkHorisontal(char) {
  return (
    (grid[0][0] === char && grid[0][1] === char && grid[0][2] === char) ||
    (grid[1][0] === char && grid[1][1] === char && grid[1][2] === char) ||
    (grid[2][0] === char && grid[2][1] === char && grid[2][2] === char)
  );
}

function checkVertical(char) {
  return (
    (grid[0][0] === char && grid[1][0] === char && grid[2][0] === char) ||
    (grid[0][1] === char && grid[1][1] === char && grid[2][1] === char) ||
    (grid[0][2] === char && grid[1][2] === char && grid[2][2] === char)
  );
}

function checkDiagonal(char) {
  return (
    (grid[0][0] === char && grid[1][1] === char && grid[2][2] === char) ||
    (grid[0][2] === char && grid[1][1] === char && grid[2][0] === char)
  );
}

function checkWinner(char) {
  return checkHorisontal(char) || checkVertical(char) || checkDiagonal(char);
}

resetGame();
