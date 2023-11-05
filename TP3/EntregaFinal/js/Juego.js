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

  jugadores = [
    {
      id: "linux",
      urlFicha: selectRandom([
          "./resources/linux1.png",
          "./resources/linux2.png",
          "./resources/linux3.png",
      ]),
    },
    {
      id: "windows",
      urlFicha: selectRandom([
        "./resources/windows1.png",
        "./resources/windows2.png",
        "./resources/windows3.png",
      ]),
    },
  ];

  constructor(canvas, options = {}) {
    const { tipoJuego = 4 } = options;
    this.tipoJuego = tipoJuego;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.load();
  }

  get cantidadFichasY() {
    return this.tipoJuego + 2;
  }

  get cantidadFichasX() {
    return this.tipoJuego + 3;
  }

  get cantidadFichasPorJugador() {
    return (this.cantidadFichasX * this.cantidadFichasY) / 2;
  }

  load() {
    const { ctx, canvas } = this;
    const boardBorderSize = 15;

    const cellSize = Math.min(
      ((canvas.width * 6) / 10 - 2 * boardBorderSize) / this.cantidadFichasX,
      ((canvas.height * 8) / 10 - 2 * boardBorderSize) / this.cantidadFichasY
    );

    const boardX =
      (canvas.width - (2 * boardBorderSize + this.cantidadFichasX * cellSize)) /
      2;

    const boardY =
      canvas.height - (2 * boardBorderSize + this.cantidadFichasY * cellSize);

    const tablero = new Tablero({
      ctx,
      x: boardX,
      y: boardY,
      borderSize: boardBorderSize,
      cellSize,
      width: this.cantidadFichasX,
      height: this.cantidadFichasY,
    });
    this.tablero = tablero;
    this.diametro = cellSize * 0.85;

    const padding = 30;
    this.jugadores[0].regionFichas = {
      x: padding,
      y: canvas.height / 2,
      width: boardX - 2 * padding,
      height: canvas.height / 2 - padding,
    };

    this.jugadores[1].regionFichas = {
      x: canvas.width - boardX + padding,
      y: canvas.height / 2,
      width: boardX - 2 * padding,
      height: canvas.height / 2 - padding,
    };

    this.jugadores.forEach((jugador) => {
      for (let n = 0; n < this.cantidadFichasPorJugador; n++) {
        const d = this.diametro;
        const region = jugador.regionFichas;
        const w = region.width;
        const h = region.height;
        const centroX = Math.random() * (w - d) + d / 2;
        const centroY = Math.random() * (h - d) + d / 2;
        const ficha = new Ficha({
          x: region.x + centroX,
          y: region.y + centroY,
          diametro: d,
          ctx,
          jugador: jugador.id,
          imageUrl: jugador.urlFicha,
        });

        this.fichas.push(ficha);
      }
    });

    this.startGame();
  }

  reDrawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tablero.draw();
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].draw();
    }
  }

  startGame() {
    const game = this;
    game.dragDropInterval = setInterval(() => game.reDrawGame(), 1000 / 60);
    this.reDrawGame();

    this.canvas.addEventListener("mousedown", (event) => {
      if (!game.dragDropFicha && event.buttons == 1) {
        for (let i = game.fichas.length - 1; i >= 0; i--) {
          const ficha = this.fichas[i];
          const p = getRelativePos(event);
          if (ficha.isInsidePosition(p.x, p.y)) {
            // console.log(ficha);
            game.dragDropFicha = ficha;
            game.tablero.dragDropFicha = ficha;
            // game.dragDropInterval = setInterval(() => game.reDrawGame(), 1000 / 60);
            game.fichas.splice(i, 1);
            game.fichas.push(ficha);
            ficha.draw();
            // const p = getRelativePos(event);
            game.dragDropFicha.startDragDrop(event);
            game.canvas.addEventListener("mousemove", mouseMoveEvent);

            break;
          }
        }
      }
      // console.log(getRelativePos(event));
    });

    this.canvas.addEventListener("mouseup", (event) => {
      if (game.dragDropFicha && event.buttons == 0) {
        const ficha = game.dragDropFicha;
        game.dragDropFicha = null;
        const i = this.fichas.indexOf(ficha);
        game.fichas.splice(i, 1);
        game.tablero
          .dragDropOver()
          .then(
            (result) => {
              // aquí terminó la animación de colocar la pieza
            },
            (error) => {
              console.log(error);
              ficha.cancelDragDrop();
              game.fichas.push(ficha);
            }
          )

        // clearInterval(game.dragDropInterval);
        game.canvas.removeEventListener("mousemove", mouseMoveEvent);
        game.tablero.drawDropZone = false;
        game.reDrawGame();
      }
    });

    function mouseMoveEvent(event) {
      // console.log('mouseMoveEvent');
      game.tablero.drawDropZone = true;
      game.dragDropFicha.mouseMoveDragDrop(event);
    }
    // Evita que aparezca menú al hace click derecho
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }
}
