const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreDisplay = document.getElementById('score');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// const gyattSound = new Audio('Gyatt.mp3'); // No longer needed as we create new instances
const endSound = new Audio('End.mp3');

let score = 0;
let playerX = gameContainer.offsetWidth / 2;
let playerY = gameContainer.offsetHeight / 2;
let gameInterval;
let spawnInterval;
let isGameOver = false;

const PLAYER_SIZE = 50;
const ITEM_SIZE = 60;
const GAME_WIDTH = gameContainer.offsetWidth;
const GAME_HEIGHT = gameContainer.offsetHeight;

function initGame() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    playerX = GAME_WIDTH / 2;
    playerY = GAME_HEIGHT / 2;
    player.style.left = `${playerX - PLAYER_SIZE / 2}px`;
    player.style.top = `${playerY - PLAYER_SIZE / 2}px`;
    gameOverScreen.classList.add('hidden');
    isGameOver = false;
    gameContainer.style.cursor = 'none'; // Hide cursor during game

    // Clear existing items
    document.querySelectorAll('.rizz, .gyatt').forEach(item => item.remove());

    startGameLoop();
}

function startGameLoop() {
    gameInterval = setInterval(gameLoop, 20);
    spawnInterval = setInterval(spawnItem, 1000);
}

function gameLoop() {
    if (isGameOver) return;

    // Update item positions and check for collisions
    document.querySelectorAll('.rizz, .gyatt').forEach(item => {
        let itemY = parseFloat(item.style.top);
        itemY += 5; // Item fall speed
        item.style.top = `${itemY}px`;

        // Remove item if it goes off screen
        if (itemY > GAME_HEIGHT) {
            item.remove();
        }

        // Check for collision with player
        if (checkCollision(player, item)) {
            if (item.classList.contains('rizz')) {
                score += 10;
                scoreDisplay.textContent = `Score: ${score}`;
                new Audio('Gyatt.mp3').play(); // Play Gyatt.mp3 when collecting rizz
                item.remove();
            } else if (item.classList.contains('gyatt')) {
                endGame();
            }
        }
    });
}

function spawnItem() {
    if (isGameOver) return;

    const type = Math.random() < 0.7 ? 'rizz' : 'gyatt'; // More rizz than gyatt
    const item = document.createElement('div');
    item.classList.add(type);
    item.style.width = `${ITEM_SIZE}px`;
    item.style.height = `${ITEM_SIZE}px`;
    item.style.left = `${Math.random() * (GAME_WIDTH - ITEM_SIZE)}px`;
    item.style.top = `-${ITEM_SIZE}px`; // Start above the screen
    gameContainer.appendChild(item);
}

function checkCollision(playerEl, itemEl) {
    const playerRect = playerEl.getBoundingClientRect();
    const itemRect = itemEl.getBoundingClientRect();

    return !(
        playerRect.top + playerRect.height < itemRect.top ||
        playerRect.top > itemRect.top + itemRect.height ||
        playerRect.left + playerRect.width < itemRect.left ||
        playerRect.left > itemRect.left + itemRect.width
    );
}

function endGame() {
    isGameOver = true;
    clearInterval(gameInterval);
    clearInterval(spawnInterval);

    // Start sacking animation for all existing rizz and gyatt items
    document.querySelectorAll('.rizz, .gyatt').forEach(item => {
        let currentSize = ITEM_SIZE;
        const maxSize = 300; // Max size to grow to
        const growSpeed = 5; // How many pixels to grow per interval
        const animationInterval = setInterval(() => {
            if (currentSize < maxSize) {
                currentSize += growSpeed;
                item.style.width = `${currentSize}px`;
                item.style.height = `${currentSize}px`;
                // Adjust position to keep center fixed as it grows
                let currentLeft = parseFloat(item.style.left);
                let currentTop = parseFloat(item.style.top);
                item.style.left = `${currentLeft - growSpeed / 2}px`;
                item.style.top = `${currentTop - growSpeed / 2}px`;
            } else {
                clearInterval(animationInterval);
                item.remove();
            }
        }, 50); // Update every 50ms
    });

    finalScoreDisplay.textContent = score;
    gameOverScreen.classList.remove('hidden');
    gameContainer.style.cursor = 'default'; // Show cursor after game over
    endSound.play();
}

// Player movement (mouse)
gameContainer.addEventListener('mousemove', (e) => {
    if (isGameOver) return;
    playerX = e.clientX - gameContainer.getBoundingClientRect().left;
    playerY = e.clientY - gameContainer.getBoundingClientRect().top;

    // Keep player within bounds
    playerX = Math.max(PLAYER_SIZE / 2, Math.min(GAME_WIDTH - PLAYER_SIZE / 2, playerX));
    playerY = Math.max(PLAYER_SIZE / 2, Math.min(GAME_HEIGHT - PLAYER_SIZE / 2, playerY));

    player.style.left = `${playerX - PLAYER_SIZE / 2}px`;
    player.style.top = `${playerY - PLAYER_SIZE / 2}px`;
});

// Player movement (keyboard - optional, for accessibility)
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    const moveSpeed = 10;
    switch (e.key) {
        case 'ArrowUp':
            playerY = Math.max(PLAYER_SIZE / 2, playerY - moveSpeed);
            break;
        case 'ArrowDown':
            playerY = Math.min(GAME_HEIGHT - PLAYER_SIZE / 2, playerY + moveSpeed);
            break;
        case 'ArrowLeft':
            playerX = Math.max(PLAYER_SIZE / 2, playerX - moveSpeed);
            break;
        case 'ArrowRight':
            playerX = Math.min(GAME_WIDTH - PLAYER_SIZE / 2, playerX + moveSpeed);
            break;
    }
    player.style.left = `${playerX - PLAYER_SIZE / 2}px`;
    player.style.top = `${playerY - PLAYER_SIZE / 2}px`;
});

restartButton.addEventListener('click', initGame);

initGame();
