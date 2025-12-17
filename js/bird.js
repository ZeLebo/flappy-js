class Bird {
  constructor(element) {
    this.el = element;
    this.y = 200;
    this.vel = 0;

    this.gravity = 0.5;
    this.jumpStrength = -9;
  }

  jump() {
    this.vel = this.jumpStrength;
  }

  update() {
    this.vel += this.gravity;
    this.y += this.vel;

    // bounds
    this.y = Math.max(0, Math.min(window.innerHeight - 30, this.y));

    this.el.style.top = this.y + "px";
  }
}
