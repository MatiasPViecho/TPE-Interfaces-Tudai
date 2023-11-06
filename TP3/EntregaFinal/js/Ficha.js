import { Figura } from "./Figura.js";
import { getRelativePos } from "./functions.js";

export class Ficha extends Figura {
    isImageLoaded = false;
    imageUrl;
    dragDropInfo = {};

    /**
     * Constructor de Ficha
     * @param { x, y, diametro, ctx, imageUrl } args:  JSON con
     * x: posición x del centro respecto al cavas
     * y: posición y del centro respecto al cavas
     * diametro: diametro de la ficha
     * ctx: contexto 2d del canvas en que se debe dibujar la ficha
     * imageUrl: url de la imagen que se debe tomar para dibujar la ficha
     */
    constructor(args = {}) {
        const {x, y, diametro, jugador, ctx, imageUrl} = args;
        // console.log({x, y, diametro, ctx, imageUrl});
        
        super(x, y, ctx, null);
        this.diametro = diametro;
        this.jugador = jugador;
        this.loadImage(imageUrl);
    }

    /**
     * Carga imagen de la ficha a partir de url de imagen de la ficha
     */
    loadImage(imageUrl) {
        const imgFichaOriginal = new Image();
        imgFichaOriginal.src = imageUrl; 
        imgFichaOriginal.onload = () => {
            const imgFichaEscalada = new Image();
            imgFichaEscalada.src = this.escalarImagenFicha(imgFichaOriginal, this.diametro);
            imgFichaEscalada.onload = () => {
                this.image = imgFichaEscalada;
                this.isImageLoaded = true;
            };
        }
    }

    /**
     * escalarImagenFicha(originalImage, diametro)
     * Genera dataUrl de la imagen escalada al diametro y con transparecia
     * @param {*} image: objeto Image con 
     * @param {*} diametro: diametro que debe tener la nueva ficha
     * @returns dataUrl
     */
    escalarImagenFicha(originalImage, diametro) {
        const tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = diametro;
        tmpCanvas.height = diametro;
        const tmpCtx = tmpCanvas.getContext('2d');
        tmpCtx.arc(diametro/2, diametro/2, diametro/2, 0, Math.PI * 2);
        tmpCtx.clip();
        tmpCtx.drawImage(originalImage, 0, 0, diametro, diametro);
        return tmpCanvas.toDataURL();
    }

    /**
     * draw()
     * Dibuja en el lienzo la ficha
     * @returns void
     */
    draw() {
        super.draw();
        if (!this.image) {
            this.drawOnLoad = true;
            return;
        }
        const circuloLeftX = this.x - this.diametro / 2;
        const circuloTopY = this.y - this.diametro / 2;
        this.ctx.drawImage(this.image, circuloLeftX, circuloTopY, this.diametro, this.diametro);
    }

    /**
     * isInsidePosition(x, y)
     * Indica si el punto (x, y) pertenece a la ficha
     * @param {}} x 
     * @param {*} y 
     * @returns boolean: indica si (x, y) pertenece a la ficha
     */
    isInsidePosition(x, y) {
        const rel = {
            x: x - this.x,
            y: y - this.y
        }
        const distancia = Math.sqrt(rel.x*rel.x + rel.y * rel.y);
        return distancia < this.diametro / 2;
    }

    /**
     * startDragDrop(event)
     * Función que guarda en la ficha la información necesaria para comenzar el drag&drop
     * - starX y startY permite conocer la posición inicial para volver la ficha en caso de que no sea 
     * válida la posición al soltar el mouse.
     * - startCanvasX y startCanvasY indica la posición del mouse inicial, necesaria para que no se produzca un
     * salto de la ficha indeseado al arrastrarla
     * 
     * @param {*} event: Evento de la acción sobre el Canvas
     */
    startDragDrop(event) {
        const pos = getRelativePos(event, event.target);
        this.dragDropInfo = {
            startX: this.x,
            startY: this.y,
            startCanvasX: pos.x,
            startCanvasY: pos.y,
        }
    }

    /**
     * mouseMoveDragDrop(event)
     * Función que cambia la posición (x, y) de la ficha
     * 
     * @param {*} event: Evento de la acción sobre el Canvas
     */
    mouseMoveDragDrop(event) {
        const canvasPos = getRelativePos(event, event.target);
        const { startX, startY, startCanvasX, startCanvasY } = this.dragDropInfo;
        // console.log({ startX, startY, startCanvasX, startCanvasY });
        // console.log(this.dragDropInfo);
        this.x = startX + canvasPos.x - startCanvasX;
        this.y = startY + canvasPos.y - startCanvasY;
    }

    /**
     * cancelDragDrop()
     * Función que retorna la ficha a la posición inicial del drag&drop con una animación
     */
    cancelDragDrop() {
        const { startX, startY } = this.dragDropInfo;
        const ficha = this;
        // La ficha debe voler a (startX, startY)
        const deltaX = (startX - ficha.x) / 30;
        const deltaY = (startY - ficha.y) / 30;
        const regresarPiezaInterval = setInterval(() => {
            ficha.x += deltaX;
            ficha.y += deltaY;  
            if ( Math.abs(startX - ficha.x) < 10 && Math.abs(startY - ficha.y) < 10) {
                clearInterval(regresarPiezaInterval);
                this.x = startX;
                this.y = startY;
            }
        }, 1000 / 200)
    }

    // finishDragDrop(canvasX, canvasY, event) {

    // }
    
}