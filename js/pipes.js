class PipeSystem {
    constructor(gameElement) {
        this.game = gameElement;
        this.pipes = [];
        this.gap = 180 * 2;
        this.speed = 2.5;
        this.passed = 0;
        this.customGap = null;
    }
    getDynamicGap() {
        const scoreEl = document.getElementById("score");
        const score = parseInt(scoreEl.textContent, 10) || 0;
        return Math.max(
            60,
            this.gap * (Math.floor(Math.random() * 3) / 2 + 1) - score * 10,
        );
    }
    getPipeSize() {
        if (this.customGap !== null) {
            return this.customGap;
        }
        return this.getDynamicGap();
    }
    setPipeDimensions(pipe, requestedTopHeight, gap) {
        const maxTopHeight = Math.max(0, window.innerHeight - gap);
        const safeTopHeight = Math.max(
            0,
            Math.min(requestedTopHeight, maxTopHeight),
        );
        const bottomHeight = Math.max(
            0,
            window.innerHeight - safeTopHeight - gap,
        );
        pipe.topHeight = safeTopHeight;
        pipe.gap = gap;
        pipe.top.style.height = `${safeTopHeight}px`;
        pipe.top.dataset.height = `${safeTopHeight}`;
        pipe.bottom.style.height = `${bottomHeight}px`;
    }
    redrawExistingPipes(gap = null) {
        this.pipes.forEach((pipe) => {
            const currentGap = pipe.gap || this.gap;
            const storedTopHeight = typeof pipe.topHeight === "number"
                ? pipe.topHeight
                : parseFloat(pipe.top.dataset.height) || 0;
            const center = storedTopHeight + currentGap / 2;
            const targetGap = gap !== null ? gap : this.getDynamicGap();
            const newTopHeight = Math.max(0, center - targetGap / 2);
            this.setPipeDimensions(pipe, newTopHeight, targetGap);
        });
    }
    forceGap(gap) {
        this.customGap = gap;
        this.redrawExistingPipes(gap);
    }
    releaseGap() {
        this.customGap = null;
        this.redrawExistingPipes();
    }
    spawn() {
        const top = document.createElement("div");
        const bottom = document.createElement("div");
        top.classList.add("pipe");
        bottom.classList.add("pipe");
        const topHeight = 100 + Math.random() * 200;
        const gap = this.getPipeSize();
        const pipe = { top, bottom, passed: false, topHeight, gap };
        this.setPipeDimensions(pipe, topHeight, gap);
        top.style.top = "0px";
        bottom.style.bottom = "0px";
        const startX = window.innerWidth;
        top.dataset.x = startX;
        bottom.dataset.x = startX;
        top.style.transform = `translateX(${startX}px)`;
        bottom.style.transform = `translateX(${startX}px)`;
        this.game.appendChild(top);
        this.game.appendChild(bottom);
        this.pipes.push(pipe);
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
