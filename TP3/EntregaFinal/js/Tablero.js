
export class Tablero {
    "use strict";
    cell;
    imgs;
    drawDropZone = false;
    dropDownZone;
    dragDropFicha;

    constructor(args = {}) {
        const {
            x = 0,
            y = 0,
            width = 7, 
            height = 6, 
            ctx,
            borderSize = 30,
            cellSize = 80
        } = args
        this.ctx = ctx;
        this.width = width;
        this.height = height;
        this.cell= [];
        for (let h = 0; h < height; h++) {
            this.cell[h] = [];
            for (let w = 0; w < width; w++) {
                this.cell[h][w] = {
                    position: h + "," + w,
                    equipo: "",
                    ficha: null,
                }
            }
        }
        this.borderSize = borderSize;
        this.cellSize = cellSize;
        this.x = x;
        this.y = y;
        this.loadImages();
    }

    loadImages() {
        const imgCornerTopLeft = new Image();
        imgCornerTopLeft.src = "./resources/tablero/corner-top-left.png";
        imgCornerTopLeft.onload = () => this.imgCornerTopLeft = imgCornerTopLeft;
        const imgCornerTopRight = new Image();
        imgCornerTopRight.src = "./resources/tablero/corner-top-right.png";
        imgCornerTopRight.onload = () => this.imgCornerTopRight = imgCornerTopRight;
        const imgCornerBotomLeft = new Image();
        imgCornerBotomLeft.src = "./resources/tablero/corner-botom-left.png";
        imgCornerBotomLeft.onload = () => this.imgCornerBotomLeft = imgCornerBotomLeft;
        const imgCornerBotomRight = new Image();
        imgCornerBotomRight.src = "./resources/tablero/corner-botom-right.png";
        imgCornerBotomRight.onload = () => this.imgCornerBotomRight = imgCornerBotomRight;

        const borderTop = new Image();
        borderTop.src = "./resources/tablero/border-top.png";
        borderTop.onload = () => this.imgBorderTop = borderTop;        
        const borderLeft = new Image();
        borderLeft.src = "./resources/tablero/border-left.png";
        borderLeft.onload = () => this.imgBorderLeft = borderLeft;        
        const borderRight = new Image();
        borderRight.src = "./resources/tablero/border-right.png";
        borderRight.onload = () => this.imgBorderRight = borderRight;        
        const borderBotom = new Image();
        borderBotom.src = "./resources/tablero/border-botom.png";
        borderBotom.onload = () => this.imgBorderBotom = borderBotom;    

        const cell = new Image();
        cell.src = "./resources/tablero/cell.png";
        cell.onload = () => this.imgCell = cell;
        
        this.dropDownZone = {
            x: this.x + + this.borderSize,
            y: this.y - this.borderSize - this.cellSize,
            width: this.cellSize * this.width,
            height: this.cellSize + this.borderSize /2
        }
    }

    draw() {
        const { cellSize, borderSize, ctx } = this;
        const boardX = this.x;
        const boardY = this.y;

        // draw setted fichas
        for (let h = 0; h < this.height; h++) {
            for (let w = 0; w < this.width; w++) {
                const ficha = this.cell[h][w].ficha;
                ficha && ficha.draw();
            }
        }

        // draw top-left corner
        this.imgCornerTopLeft && ctx.drawImage(this.imgCornerTopLeft, 
                boardX, boardY, 
                borderSize, borderSize);

        // draw top border
        this.imgBorderTop && ctx.drawImage(this.imgBorderTop, 
                boardX + borderSize, boardY, 
                cellSize * this.width, borderSize);

        // draw top right corner
        this.imgCornerTopRight && ctx.drawImage(this.imgCornerTopRight, 
            boardX + borderSize + cellSize * this.width, boardY, 
            borderSize, borderSize);
        
        let currentY = boardY + borderSize;
        for (let y = 0; y < this.height; y++) {
            // Draw border Left
            this.imgBorderLeft && ctx.drawImage(this.imgBorderLeft, 
                boardX, currentY, 
                borderSize, cellSize);  

            let currentX = boardX + borderSize;
            for (let x = 0; x < this.width; x++) {
                // Draw cell (x, y)
                this.imgCell && ctx.drawImage(this.imgCell, 
                    currentX, currentY, 
                    cellSize, cellSize);

                currentX += cellSize;
            }

            // Draw border right
            this.imgBorderRight && ctx.drawImage(this.imgBorderRight, 
                boardX + borderSize + cellSize * this.width, currentY, 
                borderSize, cellSize);   
            currentY += cellSize;         
        }

        // draw botom left corner 
        this.imgCornerBotomLeft && ctx.drawImage(this.imgCornerBotomLeft, 
            boardX, currentY, 
            borderSize, borderSize);

        // draw botom border
        this.imgBorderBotom && ctx.drawImage(this.imgBorderBotom, 
            boardX + borderSize, currentY, 
            cellSize * this.width, borderSize);

        // draw botom right corner
        this.imgCornerBotomRight && ctx.drawImage(this.imgCornerBotomRight, 
            boardX + borderSize + cellSize * this.width, currentY, 
            borderSize, borderSize);
        
        if (this.drawDropZone) {
            const {x, y, width, height} = this.dropDownZone;
            this.ctx.fillStyle= "#1111FF40";
            this.ctx.beginPath();
            // this.this.ctx.fillRect(x, y, width, height)
            this.ctx.roundRect(x - this.borderSize, y, width + 2 * this.borderSize, height, this.borderSize);
            // this.ctx.stroke();
            this.ctx.fill();

            // highlight column
            const col = this.currentDropDownColumn;
            const row = col >= 0 ? this.getLastFreeRow(col): -1;
            if (col >= 0 && row >= 0) {
                this.ctx.fillStyle= "#1111FF40";
                this.ctx.beginPath();
                // this.this.ctx.fillRect(x, y, width, height)
                this.ctx.roundRect(boardX + this.borderSize + this.cellSize * col, boardY + this.borderSize, 
                    this.cellSize, this.cellSize * (row + 1), this.borderSize);
                // this.ctx.stroke();
                this.ctx.fill();
            }
        }


    }

    /**
     * currentDropDownColumn()
     * @returns valid column number if is valid the position of dropDownFicha or return -1
     */
    get currentDropDownColumn() {
        const { x, y, width, height } = this.dropDownZone;
        const ficha = this.dragDropFicha;
        if (!ficha) 
            return -1;
        if (ficha.x < x || x + width < ficha.x) {
            return -1;
        }
        if (ficha.y < y || y + height < ficha.y) {
            return -1;
        }

        return Math.floor((ficha.x - x) / this.cellSize);
    }

    /**
     * dragDropOver()
     * Coloca la pieza soltada en el tablero, generando una animación.
     * 
     * @returns Promise que al cumplirse significa que terminó la animación que coloca la pieza
     */
    dragDropOver() {
        return new Promise((resolve, reject) => {
            if (!this.dragDropFicha) {
                reject("Tablero no coce ficha para colocar")
                return;
            }
            const col = this.currentDropDownColumn;
            if (col < 0) {
                reject("La ficha no se encuentra en una posición válida para ser soltada");
                return;
            }
            const row = this.getLastFreeRow(col);
            if (row < 0) {
                reject("La columna ya está llena");
                return;
            }
            const ficha = this.dragDropFicha;
            this.setFichaInCell(ficha, row, col);

            // Centra la pieza en la columna y verticalmente en la zona de DrawDrop para poder 
            // comenzar una animación sólo hacia abajo.
            ficha.x = this.x + this.borderSize + col * this.cellSize + this.cellSize / 2;
            ficha.y = this.dropDownZone.y + this.dropDownZone.height / 2;
            // Calcula destino y final de la ficha:
            const destinationY = this.y + this.borderSize + row * this.cellSize + this.cellSize / 2;
            let initialY = ficha.y;
            // Datos iniciales para calcular caída libre
            let vi = 0; //velocidad inicial
            let t = 0; //tiempo
            let g = 10.1; //aceleración
            let d = 0; //distancia recorrida
            let rebotar = true;
            const handleAnimation = setInterval(() => {
                t += .3;
                // Calcula distancia recorrida en base a fórumla de caída libre
                d = vi * t + g * t * t;
                ficha.y = Math.min(destinationY, initialY + d);

                if (ficha.y == destinationY) {
                    if (rebotar) {
                        rebotar = false;
                        vi = -40;
                        t = 0;
                        initialY = ficha.y;
                    } else {
                        this.dragDropFicha = null;
                        clearInterval(handleAnimation);
                        resolve("OK!");
                    }
                }
            } , 1000 / 60);
        });
    }
    
    setFichaInCell(ficha, row, col) {
        this.cell[row][col].ficha = ficha;
    }

    /**
     * getLastFreeRow(col)
     * @param {*} col 
     * @returns índice de fila de la última celda vacía en la columna.
     */
    getLastFreeRow(col) {
        if (col < 0) 
            return -1;
        for (let row = this.height - 1; row >= 0; row--) {
            if (this.cell[row][col].ficha == null) {
                return row;
            }
        }
        return -1;
    }
}