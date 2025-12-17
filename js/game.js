const gameEl = document.getElementById("game");
const birdEl = document.getElementById("bird");
const scoreEl = document.getElementById("score");
let score = 0;
let gameover = false;
const bird = new Bird(birdEl);
const pipes = new PipeSystem(gameEl);
const input = new Input();
setInterval(() => !gameover && pipes.spawn(), 2000);
function updateScoreDisplay() {
    scoreEl.textContent = score;
}
function endGame() {
    gameover = true;
    const go = document.getElementById("gameover");
    go.style.display = "flex";
    pipes.pipes = [];
    bird.speed = 0;
    document.getElementById("restartBtn").addEventListener(
        "click",
        () => location.reload(),
    );
}
function checkCollision(bird, pipes) {
    const birdRect = bird.el.getBoundingClientRect();
    const birdX = birdRect.left;
    pipes.pipes.forEach((p) => {
        const topRect = p.top.getBoundingClientRect();
        const bottomRect = p.bottom.getBoundingClientRect();
        const hitTop = birdRect.left < topRect.right &&
            birdRect.right > topRect.left &&
            birdRect.top < topRect.bottom;
        const hitBottom = birdRect.left < bottomRect.right &&
            birdRect.right > bottomRect.left &&
            birdRect.bottom > bottomRect.top;
        if (!p.collided && (hitTop || hitBottom)) {
            p.collided = true;
            p.top.style.background = "red";
            p.bottom.style.background = "red";
            score -= 1;
            updateScoreDisplay();
        }
        const pipeRightX = topRect.right;
        if (!p.passed && !p.collided && pipeRightX < birdX) {
            p.passed = true;
            score += 1;
            updateScoreDisplay();
        }
    });
    if (score >= 20 && !gameover) {
        endGame();
    }
}
function loop() {
    if (gameover) return;
    if (input.consumeJump()) bird.jump();
    bird.update();
    pipes.update();
    checkCollision(bird, pipes);
    requestAnimationFrame(loop);
}
updateScoreDisplay();
loop();
