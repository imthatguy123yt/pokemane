const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Load images
const sprites = {
    idle: new Image(),
    forwardWalk: new Image(),
    backWalk: new Image(),
    walkRight: new Image(),
    walkLeft: new Image()
};

sprites.idle.src = "assets/forward.png";
sprites.forwardWalk.src = "assets/forwardwalk.gif";
sprites.backWalk.src = "assets/backwalk.gif";
sprites.walkRight.src = "assets/sidewalkr.gif";
sprites.walkLeft.src = "assets/sidewalkl.gif";

let currentSprite = sprites.idle;

let player = {
    x: 240,
    y: 240,
    size: 64,
    speed: 4,
    moving: false
};

function drawPlayer() {
    ctx.drawImage(currentSprite, player.x, player.y, player.size, player.size);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    player.moving = true;

    if (e.key === "ArrowUp") {
        player.y -= player.speed;
        currentSprite = sprites.backWalk;
    }
    if (e.key === "ArrowDown") {
        player.y += player.speed;
        currentSprite = sprites.forwardWalk;
    }
    if (e.key === "ArrowRight") {
        player.x += player.speed;
        currentSprite = sprites.walkRight;
    }
    if (e.key === "ArrowLeft") {
        player.x -= player.speed;
        currentSprite = sprites.walkLeft;
    }
});

document.addEventListener("keyup", () => {
    player.moving = false;
    currentSprite = sprites.idle;
});

// Start game once all images load
Promise.all(
    Object.values(sprites).map(img => 
        new Promise(resolve => img.onload = resolve)
    )
).then(() => {
    gameLoop();
});
