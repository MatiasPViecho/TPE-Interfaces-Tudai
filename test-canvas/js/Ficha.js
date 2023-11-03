import { Figura } from "./Figura.js";

export class Ficha extends Figura {

    constructor(x, y, diametro, ctx, imageFicha) {
        const fillStyle = ctx.createPattern(imageFicha, "no-repeat");
        super(x, y, ctx, fillStyle);
        this.diametro = diametro;
        this.imageFicha = imageFicha;
    }

    draw() {
        super.draw();
        const circuloX = this.x - this.diametro/2;
        const circuloY = this.y - this.diametro/2;
        this.ctx.drawImage(this.imageFicha, circuloX, circuloY, this.diametro, this.diametro);
    }

    eventDrag() {

    }

    eventDrop() {

    }
    
}