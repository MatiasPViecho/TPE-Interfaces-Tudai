import { Figura } from "./Figura.js";
import { getRelativePos } from "./functions.js";

export class Ficha extends Figura {
    isImageLoaded = false;
    imageUrl;
    dragDropInfo = {};

    constructor(args = {}) {
        const {x, y, diametro, ctx, imageUrl} = args;
        console.log({x, y, diametro, ctx, imageUrl});
        
        super(x, y, ctx, null);
        this.imageUrl = imageUrl;
        this.diametro = diametro;
        this.loadImage();
    }

    loadImage() {
        const imgFichaOriginal = new Image();
        imgFichaOriginal.src = this.imageUrl; 
        imgFichaOriginal.onload = () => {
            const imgFichaEscalada = new Image();
            imgFichaEscalada.src = this.escalarImagenFicha(imgFichaOriginal, this.diametro);
            imgFichaEscalada.onload = () => {
                this.image = imgFichaEscalada;
                if (this.drawOnLoad) {
                    this.draw();
                }
            };
        }
    }

    escalarImagenFicha(image, diametro) {
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = diametro;
        tmpCanvas.height = diametro;
        const tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.arc(diametro/2, diametro/2, diametro/2, 0, Math.PI * 2);
        tmpCtx.clip();
        tmpCtx.drawImage(image, 0, 0, diametro, diametro);
        return tmpCanvas.toDataURL();
    }

    draw() {
        super.draw();
        if (!this.image) {
            this.drawOnLoad = true;
            return;
        }
        const circuloLeftX = this.x - this.diametro / 2;
        const circuloTopY = this.y - this.diametro / 2;
        this.ctx.drawImage(this.image, circuloLeftX, circuloTopY, this.diametro, this.diametro);
        this.isImageLoaded = true;
    }

    isInsidePosition(x, y) {
        const rel = {
            x: x - this.x,
            y: y - this.y
        }
        const distancia = Math.sqrt(rel.x*rel.x + rel.y * rel.y);
        return distancia < this.diametro / 2;
    }

    startDragDrop(canvasX, canvasY, event) {
        this.dragDropInfo = {
            startX: this.x,
            startY: this.y,
            startCanvasX: canvasX,
            startCanvasY: canvasY,
        }
    }

    mouseMoveDragDrop(event) {
        const canvasPos = getRelativePos(event, event.target);
        const { startX, startY, startCanvasX, startCanvasY } = this.dragDropInfo;
        console.log({ startX, startY, startCanvasX, startCanvasY });
        console.log(this.dragDropInfo);
        this.x = startX + canvasPos.x - startCanvasX;
        this.y = startY + canvasPos.y - startCanvasY;
    }

    cancelDragDrop(canvasX, canvasY, event) {

    }

    finishDragDrop(canvasX, canvasY, event) {

    }
    
}