
export class Tablero {
    "use strict";
    cell;
    imgs;

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
    }

    draw() {
        const { cellSize, borderSize, ctx } = this;
        const boardX = this.x;
        const boardY = this.y;
        // draw top-left corner
        ctx.drawImage(this.imgCornerTopLeft, 
            boardX, boardY, 
            borderSize, borderSize);
        // draw top border
        ctx.drawImage(this.imgBorderTop, 
            boardX + borderSize, boardY, 
            cellSize * this.width, borderSize);
        // draw top right corner
        ctx.drawImage(this.imgCornerTopRight, 
            boardX + borderSize + cellSize * this.width, boardY, 
            borderSize, borderSize);
        
        let currentY = boardY + borderSize;
        for (let y = 0; y < this.height; y++) {
            // Draw border Left
            ctx.drawImage(this.imgBorderLeft, 
                boardX, currentY, 
                borderSize, cellSize);      
            let currentX = boardX + borderSize;
            for (let x = 0; x < this.width; x++) {
                
                ctx.drawImage(this.imgCell, 
                    currentX, currentY, 
                    cellSize, cellSize);   
                currentX += cellSize;
            }
            // Draw border right
            ctx.drawImage(this.imgBorderRight, 
                boardX + borderSize + cellSize * this.width, currentY, 
                borderSize, cellSize);   
            currentY += cellSize;         
        }
        // draw botom left corner 
        ctx.drawImage(this.imgCornerBotomLeft, 
            boardX, currentY, 
            borderSize, borderSize);
        // draw botom border
        ctx.drawImage(this.imgBorderBotom, 
            boardX + borderSize, currentY, 
            cellSize * this.width, borderSize);
        // draw botom right corner
        ctx.drawImage(this.imgCornerBotomRight, 
            boardX + borderSize + cellSize * this.width, currentY, 
            borderSize, borderSize);
        
    }
}