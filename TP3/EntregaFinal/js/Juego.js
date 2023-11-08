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
  redrawInterval = null;
  dragDropFicha = null;
  turnoJugador = null;
  turnTimer = null;
  secondsPerTurn;
  title;
  mensaje;
  fichasGanadoras = [];
  loaded = false;

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
    const { tipoJuego = 4, secondsPerTurn = 10, urlLinux = "", urlWindows = "" } = options;
    this.tipoJuego = tipoJuego;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.turnTimer = new TurnTimer(0, 0, this.ctx);
    this.secondsPerTurn = secondsPerTurn;
    this.title = {
      x: canvas.width / 2,
      width: canvas.width - 30,
      text: "Windows vs Linux: " + tipoJuego + " en línea"
    };
    this.mensaje = {
      x: canvas.width / 2,
      width: canvas.width - 30,
      text: ""
    };
    this.jugadores[0].urlFicha = urlLinux;
    this.jugadores[1].urlFicha = urlWindows;
    this.loaded = false;
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
    this.diametro = cellSize * 0.85;
    const boardY = 130 + this.diametro;
      // canvas.height - (2 * boardBorderSize + this.cantidadFichasY * cellSize);

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

    const padding = 30;
    this.jugadores[0].regionFichas = {
      x: padding,
      y: boardY + 130,
      width: boardX - 2 * padding,
      // height: canvas.height - (boardY + 140),
      height: tablero.finalY - boardY - 130,
    };   

    this.jugadores[1].regionFichas = {
      x: canvas.width - boardX + padding,
      y: boardY + 130,
      width: boardX - 2 * padding,
      height: tablero.finalY - boardY - 130,
      urlFicha: this.urlWindows,
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
        const url = jugador.urlFicha ? jugador.urlFicha: selectRandom(jugador.urlsFicha);
        const ficha = new Ficha({
          x: region.x + centroX,
          y: region.y + centroY,
          diametro: d,
          ctx,
          idJugador: jugador.id,
          imageUrl: url,
        });
        this.fichas.push(ficha);

        const buttonSize = cellSize * .6;
        this.restartButton = new Ficha({
          x: canvas.width / 2 - buttonSize/2,
          y: canvas.height - buttonSize / 2,
          diametro: buttonSize,
          ctx,
          imageUrl: "./resources/accion-reiniciar.png",
        });

        this.pauseButton = new Ficha({
          x: canvas.width / 2 + buttonSize/2,
          y: canvas.height - buttonSize / 2,
          diametro: buttonSize,
          ctx,
          imageUrl: "./resources/accion-pausar.png",
        });

      }
    });
    this.fichasGanadoras = [];
    this.mensaje.text = "";
    if (!this.loaded)
      this.startGame();
    this.loaded = true;
  }

  restartGame() {
    clearInterval(game.redrawInterval);
    this.load();
  }

  reDrawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawTitle();
    this.drawMensaje();
    this.restartButton.draw();
    this.pauseButton.draw();
    this.tablero.draw();
    this.turnTimer.draw();
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].draw();
    }
    for (let i = 0; i < this.fichasGanadoras.length; i++) {
      this.fichasGanadoras[i].draw();
    }
  }

  startGame() {
    const game = this;
    game.redrawInterval = setInterval(() => game.reDrawGame(), 1000 / 60);
    game.siguienteTurno();

    this.canvas.addEventListener("mousedown", (event) => {
      if (event.buttons !== 1 )
        return;

      const p = getRelativePos(event);
      if (this.pauseButton.isInsidePosition(p.x, p.y)) {
        this.turnTimer.pause();
        if (this.turnTimer.isPaused) {
          this.mensaje.text = "Juego pausado";
        } else {
          this.mensaje.text = "";
        }

      }
      if (this.restartButton.isInsidePosition(p.x, p.y)) { 
        this.restartGame();   
      }
      if (game.turnoJugador && !game.dragDropFicha && event.buttons == 1) {
        for (let i = game.fichas.length - 1; i >= 0; i--) {
          const ficha = this.fichas[i];
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
                  game.mensaje.text = "Ganador " + win.fichas[0].idJugador + "!"
                  game.turnTimer.cancel();
                  // Acciones de ganador
                  console.log('JUEGO TERMINADO', win)
                  game.fichasGanadoras = win.fichas;

                  for (let i = 0; i < game.fichasGanadoras.length; i++) {
                    game.fichasGanadoras[i].diametro = game.fichasGanadoras[i].diametro * 1.15;
                  }
                } else {
                  // chequea por empate
                  if (game.fichas.length === 0) {
                    console.log('JUEGO EMPATADO')
                    game.mensaje.text = "Ha sido un empate!"
                    game.turnTimer.cancel();
                  } else {
                    game.siguienteTurno(ultimoTurno);
                  }
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
    },
    (error) => {
      // Promesa cancelada.
      // Nothing to do. Timer cancelado (cambio de turno o fin de juego)
      // Se agrega esto para que no salga error en consola.
    }
    );
  }

  drawTitle() {
    const ctx = this.ctx;
    ctx.textAlign="center";       
    ctx.fillStyle = "blue";
    ctx.font="italic small-caps bold 50pt Verdana";
    ctx.fillText(this.title.text, this.title.x, 60, this.title.width);
  }

  drawMensaje() {
    const ctx = this.ctx;
    ctx.textAlign="center";       
    ctx.fillStyle = "#DCD6F5";
    ctx.font="bold 40pt Verdana";
    ctx.fillText(this.mensaje.text, this.mensaje.x, 160, this.mensaje.width);
  }
}
