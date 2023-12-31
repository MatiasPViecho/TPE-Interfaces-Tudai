export class TurnTimer  {

    constructor(x, y, ctx) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.pausedTime = 0;
        this.jugador = "";
        this.maxWidth = 200;
    }

    start(timeLimit) {
        this.cancel();

        this.pausedTime = 0;
        this.initialTime = now();
        this.limit = this.initialTime + timeLimit * 1000;
        return new Promise((resolve, error) => {
            this.cancelPromise = error;
            this.handleTimer = setInterval(() => {
                if (this.current < 0) {
                    clearInterval(this.handleTimer);
                    this.handleTimer = null;
                    resolve('Tiempo terminado')
                }
            } , 200);
        })
    }

    pause() {
        if (!this.pausedTime) {
            //pausa
            this.pausedTime = now();
        } else  {
            //reanuda
            this.limit += this.elapsedPauseTime;
            this.pausedTime = 0; 
        }
    }
    get isPaused() {
        return this.pausedTime ? true : false;
    }

    get elapsedPauseTime() {
        return this.pausedTime ? now() - this.pausedTime : 0;
    }
    
    cancel() {
        this.cancelPromise && this.cancelPromise()
        this.handleTimer && clearInterval(this.handleTimer);
    }

    get current() {
        return Math.ceil((this.limit - now() - this.elapsedPauseTime) / 1000);
    }

    draw() {
        if (this.handleTimer && !this.pausedTime) {

            this.ctx.fillStyle = "#1111FF15";
            this.ctx.beginPath();
            this.ctx.roundRect(
              this.x - this.maxWidth / 2 - 10,
              this.y,
              this.maxWidth + 20,
              120,
              15
            );
            this.ctx.fill();

            const ctx = this.ctx;
            ctx.textAlign="center";
                            
            ctx.fillStyle = "blue";
            ctx.font="italic small-caps bold 20pt Verdana";
            ctx.fillText("Turno", this.x, this.y + 30, this.maxWidth);
            ctx.fillText(this.jugador, this.x, this.y + 60, this.maxWidth);
            ctx.font="italic small-caps bold 30pt Verdana";
            ctx.fillText(Math.max(0, this.current) + " seg", this.x, this.y + 105, this.maxWidth);
        }
    }

}

function now() {
    return (new Date).getTime();
}