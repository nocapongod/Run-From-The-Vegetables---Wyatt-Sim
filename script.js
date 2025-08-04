// Player movement (mouse)
gameContainer.addEventListener('mousemove', (e) => {
    if (isGameOver) return;
    playerX = e.clientX - gameContainer.getBoundingClientRect().left;
    playerY = e.clientY - gameContainer.getBoundingClientRect().top;

    // Keep player within bounds (center can touch edge)
    playerX = Math.max(playerSize/2, Math.min(GAME_WIDTH - playerSize/2, playerX));
    playerY = Math.max(playerSize/2, Math.min(GAME_HEIGHT - playerSize/2, playerY));

    player.style.left = `${playerX - playerSize/2}px`;
    player.style.top = `${playerY - playerSize/2}px`;
});

// Player movement (keyboard - optional, for accessibility)
document.addEventListener('keydown', (e) => {
    if (isGameOver) return;
    const moveSpeed = 10;
    switch (e.key) {
        case 'ArrowUp':
            playerY = Math.max(playerSize/2, playerY - moveSpeed);
            break;
        case 'ArrowDown':
            playerY = Math.min(GAME_HEIGHT - playerSize/2, playerY + moveSpeed);
            break;
        case 'ArrowLeft':
            playerX = Math.max(playerSize/2, playerX - moveSpeed);
            break;
        case 'ArrowRight':
            playerX = Math.min(GAME_WIDTH - playerSize/2, playerX + moveSpeed);
            break;
    }
    player.style.left = `${playerX - playerSize/2}px`;
    player.style.top = `${playerY - playerSize/2}px`;
});