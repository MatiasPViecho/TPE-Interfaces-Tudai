"use strict";

import { Juego } from "./Juego.js";

const canvas = document.querySelector("#test-canvas");
// const w = 800;
// const h = 500;
// const w = document.documentElement["clientWidth"];
const w = document.documentElement["clientWidth"]-10;
const h = document.documentElement["clientHeight"]-10;

canvas.width = w;
canvas.height = h;

const juego = new Juego(canvas);

// const imgFicha = new Image();
// imgFicha.src ='./resources/linux3.jpeg'; 
// imgFicha.onload = () => {
//     if (imgFicha.procesado) {
//         //Aquí imgFicha está escalada
//         // const f = new Ficha(0, 40, diametro, ctx, imgFicha);
//         // f.draw();
//     }

//     imgFicha.src = escalarImagenFicha(imgFicha, diametro, diametro);
//     imgFicha.procesado = true;
// }

// ctx.beginPath();
// ctx.fillStyle = "#FF0000";
// ctx.arc(200,200,100,0,Math.PI /3);
// // debugger;
// // ctx.fillRect(0,0,10,10);
// const imgData = ctx.createImageData(w, h);
// let max = 0;
// for (let x = 0; x < w; x++) {
//     for (let y = 0; y < h; y++) {
//         // const cx = x <= w/2 ? x * 2 : (w - x) * 2;
//         // const cy = y <= h/2 ? y * 2 : (h - y) * 2;
//         // const cy = y <= h*3/2 ? y * 2 : (h - y) * 2;
//         const cx = Math.sin(x / w * Math.PI) * w;
//         const cy = Math.sin(y / h * Math.PI) * h;
//         const factor = cx / w * cy / h;

//         const p = 255 * factor;
//         max = p > max ? p : max;
//         setPixel(imgData, x, y, 255, 200-p, 200-p, factor*255);
//     }
// }
// console.log(max);

// ctx.putImageData(imgData, 0,0);

