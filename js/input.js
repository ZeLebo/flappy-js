class Input {
    constructor() {
        this.jumpPressed = false;
        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") {
                this.jumpPressed = true;
            }
        });
    }
    consumeJump() {
        if (this.jumpPressed) {
            this.jumpPressed = false;
            return true;
        }
        return false;
    }
}
