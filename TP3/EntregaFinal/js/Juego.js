"use strict";

import { Ficha } from "./Ficha.js";
import { Tablero } from "./Tablero.js";
import { TurnTimer } from "./TurnTimer.js";
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
  turnoJugador = null;
  turnTimer = null;
  secondsPerTurn = 30;

  jugadores = [
    {
      id: "Linux",
      urlFicha: null,
      urlsFicha: [
          "./resources/linux1.png",
          "./resources/linux2.png",
          "./resources/linux3.png",
      ],
      regionFichas: null
    },
    {
      id: "Windows",
      urlFicha: null,
      urlsFicha: [
        "./resources/windows1.png",
        "./resources/windows2.png",
        "./resources/windows3.png",
      ],
      regionFichas: null
    },
  ];

  constructor(canvas, options = {}) {
    const { tipoJuego = 4, secondsPerTurn = 30 } = options;
    this.tipoJuego = tipoJuego;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.turnTimer = new TurnTimer(0, 0, this.ctx);
    this.load();
    this.secondsPerTurn = secondsPerTurn;
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
      y: boardY + 130,
      width: boardX - 2 * padding,
      height: canvas.height - (boardY + 140),
    };

    this.jugadores[1].regionFichas = {
      x: canvas.width - boardX + padding,
      y: boardY + 130,
      width: boardX - 2 * padding,
      height: canvas.height - (boardY + 140),
    };

    this.fichas = new Array();
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
          idJugador: jugador.id,
          imageUrl: jugador.urlFicha ?? selectRandom(jugador.urlsFicha),
        });

        this.fichas.push(ficha);
      }
    });

    this.startGame();
  }

  reDrawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.tablero.draw();
    this.turnTimer.draw();
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].draw();
    }
  }

  startGame() {
    const game = this;
    game.dragDropInterval = setInterval(() => game.reDrawGame(), 1000 / 60);
    game.siguienteTurno();

    this.canvas.addEventListener("mousedown", (event) => {
      if (game.turnoJugador && !game.dragDropFicha && event.buttons == 1) {
        for (let i = game.fichas.length - 1; i >= 0; i--) {
          const ficha = this.fichas[i];
          const p = getRelativePos(event);
          if (ficha.idJugador === game.turnoJugador.id && ficha.isInsidePosition(p.x, p.y)) {
            game.dragDropFicha = ficha;
            game.tablero.dragDropFicha = ficha;
            game.fichas.splice(i, 1);
            game.fichas.push(ficha);
            ficha.draw();
            ficha.startDragDrop(event);
            game.handleMouseMoveEvent = mouseMoveEvent;
            game.canvas.addEventListener("mousemove", mouseMoveEvent);

            break;
          }
        }
      }
    });

    this.canvas.addEventListener("mouseup", (event) => {
      if (game.dragDropFicha && event.buttons == 0) {
        const ficha = game.dragDropFicha;
        game.dragDropFicha = null;
        const i = this.fichas.indexOf(ficha);
        game.fichas.splice(i, 1);
        const ultimoTurno = this.turnoJugador;
        this.turnoJugador = null;
        this.turnTimer.pause(); // pausa
        game.tablero
          .dragDropOver()
          .then(
            (result) => {
                // terminó la animación de colocación de la pieza
                const win = game.tablero.checkForWinner(result.row, result.col, this.tipoJuego);
                if (win) {
                  // Acciones de ganador
                  console.log('JUEGO TERMINADO', win)
                } else {
                  this.siguienteTurno(ultimoTurno);
                }
            },
            (error) => {
              this.turnTimer.pause(); //reanuda
              console.log(error);
              this.turnoJugador = ultimoTurno;
              ficha.cancelDragDrop();
              game.fichas.push(ficha);
            }
          )

        game.canvas.removeEventListener("mousemove", mouseMoveEvent);
        game.tablero.drawDropZone = false;
        game.reDrawGame();
      }
    });

    function mouseMoveEvent(event) {
        game.tablero.drawDropZone = true;
        game.dragDropFicha.mouseMoveDragDrop(event);
    }
    // Evita que aparezca menú al hace click derecho
    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  siguienteTurno(ultimoJugador = null) {
    if (ultimoJugador)
      this.turnoJugador = this.jugadores.find(jugador => ultimoJugador.id !== jugador.id);
    else
      this.turnoJugador = selectRandom(this.jugadores);

    this.turnTimer.jugador = this.turnoJugador.id;
    this.turnTimer.x = this.turnoJugador.regionFichas.x + this.turnoJugador.regionFichas.width / 2;
    this.turnTimer.y = this.tablero.y

    this.turnTimer.maxWidth = this.turnoJugador.regionFichas.width
    this.turnTimer.start(this.secondsPerTurn).then( () => {
      // Tiempo terminado
      if (this.dragDropFicha) {
        this.dragDropFicha.cancelDragDrop()
        this.tablero.drawDropZone = false;
        this.canvas.removeEventListener("mousemove", this.handleMouseMoveEvent);
      }
      this.siguienteTurno(this.turnoJugador);
    }
    );
    // console.log('SIGUIENTE TURNO '+ this.turnoJugador.id, ultimoJugador);
  }
}
