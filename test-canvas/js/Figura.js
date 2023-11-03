
export class Figura {
    ctx;
    x;
    y;
    fillStyle;

    constructor(x, y, ctx,  fillStyle = "#FF0000") {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.fillStyle = fillStyle;
    }

    draw() {
        this.ctx.fillStyle = this.fillStyle;
    }
}