
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
            const n = this.currentDropDownColumn;
            if (n >= 0) {
                this.ctx.fillStyle= "#1111FF40";
                this.ctx.beginPath();
                // this.this.ctx.fillRect(x, y, width, height)
                // TODO: en vez de resaltar la columna completa debería resaltar sólo las celdas libres de la columna
                this.ctx.roundRect(boardX + this.borderSize + this.cellSize * n, boardY + this.borderSize, 
                    this.cellSize, this.cellSize * this.height, this.borderSize);
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
        const {x, y, width, height} = this.dropDownZone;
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
}