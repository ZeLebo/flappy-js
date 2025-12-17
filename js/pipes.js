class PipeSystem {
    constructor(gameElement) {
        this.game = gameElement;
        this.pipes = [];
        this.gap = 180 * 2;
        this.speed = 2.5;
        this.passed = 0;
    }
    getPipeSize() {
        const scoreEl = document.getElementById("score");
        if (scoreEl.textContent == 19) {
            return 90;
        }
        return this.gap * (Math.floor(Math.random() * 3) / 2 + 1) -
            scoreEl.textContent * 10;
    }
    spawn() {
        const top = document.createElement("div");
        const bottom = document.createElement("div");
        top.classList.add("pipe");
        bottom.classList.add("pipe");
        const h = 100 + Math.random() * 200;
        top.style.height = h + "px";
        // bottom.style.height = (window.innerHeight - h - this.gap) + "px";
        bottom.style.height = (window.innerHeight - h - this.getPipeSize()) +
            "px";
        top.style.top = "0px";
        bottom.style.bottom = "0px";
        const startX = window.innerWidth;
        top.dataset.x = startX;
        bottom.dataset.x = startX;
        top.style.transform = `translateX(${startX}px)`;
        bottom.style.transform = `translateX(${startX}px)`;
        this.game.appendChild(top);
        this.game.appendChild(bottom);
        this.pipes.push({ top, bottom, passed: false });
    }
    update() {
        this.pipes.forEach((p) => {
            const x = parseFloat(p.top.dataset.x) - this.speed;
            p.top.dataset.x = x;
            p.bottom.dataset.x = x;
            p.top.style.transform = `translateX(${x}px)`;
            p.bottom.style.transform = `translateX(${x}px)`;
        });
        this.pipes = this.pipes.filter((p) => {
            const x = parseFloat(p.top.dataset.x);
            if (x < -200) {
                p.top.remove();
                p.bottom.remove();
                return false;
            }
            return true;
        });
    }
}
