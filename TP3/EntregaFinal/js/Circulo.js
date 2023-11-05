import { Figura } from "./Figura.js";

export class Circulo extends Figura {
    diametro;

    constructor(x, y, diametro, ctx, fillStyle = "#00FF00") {
        super(x, y, ctx, fillStyle);
        this.diametro = diametro;
    }

    draw() {
        super.draw();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.diametro/2, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    eventDrag() {

    }

    eventDrop() {

    }
    
}