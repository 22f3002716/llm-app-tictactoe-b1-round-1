const gameStatus = document.getElementById('game-status');
const gameBoardElement = document.getElementById('game-board');
const resetButton = document.getElementById('game-reset');
const cells = document.querySelectorAll('[data-cell-index]');

let gameBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6]
];

const messages = {
    playerTurn: (player) => `Player ${player}'s Turn`,
    win: (player) => `Player ${player} has won!`,
    draw: 'Game ended in a draw!'
};

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer); // Add class for styling
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.textContent = messages.playerTurn(currentPlayer);
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const winCondition = winningCombinations[i];
        let a = gameBoard[winCondition[0]];
        let b = gameBoard[winCondition[1]];
        let c = gameBoard[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameStatus.textContent = messages.win(currentPlayer);
        gameActive = false;
        return;
    }

    // Check for draw
    let roundDraw = !gameBoard.includes('');
    if (roundDraw) {
        gameStatus.textContent = messages.draw;
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.cellIndex);

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameStatus.textContent = messages.playerTurn(currentPlayer);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Remove player classes
    });
}

// Event Listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleRestartGame);

// Initial status display
gameStatus.textContent = messages.playerTurn(currentPlayer);
