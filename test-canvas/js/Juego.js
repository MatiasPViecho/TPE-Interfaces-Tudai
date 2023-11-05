"use strict";

import { Ficha } from "./Ficha.js";
import { Tablero } from "./Tablero.js";
import { getRelativePos, selectRandom } from "./functions.js";

export class Juego {
    tablero;
    canvas;
    ctx;
    cantidadCeldasX;
    cantidadCeldasY;
    fichas = new Array();
    diametro = 65;
    dragDropInterval = null;
    dragDropFicha = null;
    
    urlsFichas = [
        './resources/linux.png',
        './resources/linux2.png',
        './resources/linux3.jpeg',
        './resources/windows1.jpeg',
        './resources/windows2.jpeg',
    ];

    constructor(canvas, options = {}) {
        const { 
            tipoJuego = 5
        } = options;
        this.tipoJuego = tipoJuego;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.load();
    }

    get cantidadFichasY() {
        return this.tipoJuego + 2;
    }

    get cantidadFichasX() {
        return this.tipoJuego + 3;
    }

    load() {
        const { ctx, canvas } = this;
        const tablero = new Tablero({
            ctx, 
            width: this.cantidadFichasX,
            height: this.cantidadFichasY,
        });
        this.tablero = tablero;

        for (let n = 0; n < 10; n++) {
            // const d = this.diametro + Math.floor(Math.random() * 120);
            const d = this.diametro;
            const w = canvas.width;
            const h = canvas.height;
            const centroX = Math.random()*(w-d)+ d/2;
            const centroY = Math.random()*(h-d)+ d/2;
            const ficha = new Ficha({ 
                x: centroX, 
                y: centroY, 
                diametro: d, 
                ctx, 
                imageUrl: selectRandom(this.urlsFichas)
            });
    
            this.fichas.push(ficha);
        }
    
        this.startGame();
        setTimeout(() => {
            tablero.draw();    
        }, 1000);
    }

    reDrawGame() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.fichas.length; i++) {
            this.fichas[i].draw();
        }
        try {
            this.tablero.draw();
        } catch {

        }
    }

    startGame() {
        const game = this;
        game.dragDropInterval = setInterval(() => game.reDrawGame(), 1000 / 60);
        this.reDrawGame();

        this.canvas.addEventListener('mousedown', (event) => {
            if (!game.dragDropFicha && event.buttons == 1) {
                for (let i = game.fichas.length - 1; i >= 0; i--) {
                    const ficha = this.fichas[i];
                    const p = getRelativePos(event);
                    if (ficha.isInsidePosition(p.x, p.y)) {
                        // console.log(ficha);
                        game.dragDropFicha = ficha;
                        // game.dragDropInterval = setInterval(() => game.reDrawGame(), 1000 / 60);
                        game.fichas.splice(i, 1);
                        game.fichas.push(ficha);
                        ficha.draw();
                        // const p = getRelativePos(event);
                        game.dragDropFicha.startDragDrop(event);
                        game.canvas.addEventListener('mousemove', mouseMoveEvent); 
                        break;
                    }
                }
            }
            // console.log(getRelativePos(event));
        });

        this.canvas.addEventListener('mouseup', (event) => {

            if (game.dragDropFicha && event.buttons==0) {
                game.dragDropFicha.cancelDragDrop();
                game.dragDropFicha = null;
                // clearInterval(game.dragDropInterval);
                game.canvas.removeEventListener('mousemove', mouseMoveEvent);
                game.reDrawGame();

            }
        });

        function mouseMoveEvent(event) {
            // console.log('mouseMoveEvent');
            game.dragDropFicha.mouseMoveDragDrop(event);
        }

        this.canvas.addEventListener("contextmenu",  e => e.preventDefault());
    }

}