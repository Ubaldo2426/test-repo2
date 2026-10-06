const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// All 8 possible winning combinations on a 3x3 grid
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function checkWin() {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        // Delay alert slightly so the last X or O renders on screen first
        setTimeout(() => {
            alert(`Player ${currentPlayer === 'X' ? 'O' : 'X'} wins!`);
            resetGame();
        }, 100);
        gameActive = false;
        return;
    }

    // Check for a draw
    if (!gameState.includes("")) {
        setTimeout(() => {
            alert("It's a tie!");
            resetGame();
        }, 100);
        gameActive = false;
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = "";
    });
}

if (board) {
    board.addEventListener('click', (e) => {
        const target = e.target;
        const index = target.getAttribute('data-index');

        if (target.classList.contains('cell') && gameState[index] === "" && gameActive) {
            gameState[index] = currentPlayer;
            target.innerText = currentPlayer;
            target.style.color = currentPlayer === 'X' ? '#ff4757' : '#2ed573';
            
            // Toggle player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            
            // Run the check
            checkWin();
        }
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
}