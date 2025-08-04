// Player movement (mouse)
gameContainer.addEventListener('mousemove', (e) => {
    if (isGameOver) return;
    playerX = e.clientX - gameContainer.getBoundingClientRect().left;
    playerY = e.clientY - gameContainer.getBoundingClientRect().top;

    // Keep player within bounds (exact edge)
    playerX = Math.max(0, Math.min(GAME_WIDTH - playerSize, playerX));
    playerY = Math.max(0, Math.min(GAME_HEIGHT - playerSize, playerY));

    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
});

// Player movement (keyboard - optional, for accessibility)
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    const moveSpeed = 10;
    switch (e.key) {
        case 'ArrowUp':
            playerY = Math.max(0, playerY - moveSpeed);
            break;
        case 'ArrowDown':
            playerY = Math.min(GAME_HEIGHT - playerSize, playerY + moveSpeed);
            break;
        case 'ArrowLeft':
            playerX = Math.max(0, playerX - moveSpeed);
            break;
        case 'ArrowRight':
            playerX = Math.min(GAME_WIDTH - playerSize, playerX + moveSpeed);
            break;
    }
    player.style.left = `${playerX}px`;
    player.style.top = `${playerY}px`;
});