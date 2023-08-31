const board = document.getElementById('puzzle-board');
const size = 6;
const boardSize = size * size;
let tiles = [];
let emptyTile = boardSize - 1;

function createTile(value, row, col) {
    console.log("createTile",value, row, col)
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.textContent = value + 1;
    tile.style.gridColumn = col + 1;
    tile.style.gridRow = row + 1;
    tile.addEventListener('click', () => moveTile(row, col));
    return tile;
}

function shuffleTiles() {
     console.log("shuffleTiles")
    tiles = Array.from({ length: boardSize }, (_, i) => i);
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
    emptyTile = tiles.indexOf(boardSize - 1);
}

function renderBoard() {
    board.innerHTML = '';
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            const index = row * size + col;
            const value = tiles[index];
            const tile = createTile(value, row, col);
            board.appendChild(tile);
        }
    }
}

function moveTile(row, col) {
    const index = row * size + col;
    const diff = Math.abs(emptyTile - index);
    if (diff === 1 || diff === size) {
        tiles[emptyTile] = tiles[index];
        tiles[index] = boardSize - 1;
        emptyTile = index;
        renderBoard();
        if (checkWin()) {
            setTimeout(() => alert('Вы победили!'), 500);
        }
    }
}

function checkWin() {
    for (let i = 0; i < boardSize - 1; i++) {
        if (tiles[i] !== i) {
            return false;
        }
    }
    return true;
}

function init() {
    shuffleTiles();
    renderBoard();
}

init();
