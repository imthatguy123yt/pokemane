const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    x: 256,
    y: 256,
    size: 32
};

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp") player.y -= 10;
    if (e.key === "ArrowDown") player.y += 10;
    if (e.key === "ArrowLeft") player.x -= 10;
    if (e.key === "ArrowRight") player.x += 10;

    checkEncounter();
});

function checkEncounter() {
    if (Math.random() < 0.1) {
        startBattle();
    }
}

function startBattle() {
    document.getElementById("battleBox").classList.remove("hidden");
    fetch("http://127.0.0.1:5000/enemy")
        .then(res => res.json())
        .then(data => {
            document.getElementById("enemyName").innerText = data.name;
            document.getElementById("battleText").innerText = 
                "A wild " + data.name + " appeared!";
        });
}

function attack() {
    fetch("http://127.0.0.1:5000/attack")
        .then(res => res.json())
        .then(data => {
            document.getElementById("battleText").innerText = data.result;
        });
}

gameLoop();
