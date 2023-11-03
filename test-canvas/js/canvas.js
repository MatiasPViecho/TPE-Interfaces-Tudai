
"use strict";

import { Ficha } from "./Ficha.js";

const canvas = document.querySelector("#test-canvas");
// const w = 800;
// const h = 500;
// const w = document.documentElement["clientWidth"];
const w = document.documentElement["clientHeight"]-10;
const h = document.documentElement["clientHeight"]-10;

const diametro = 50;

canvas.width = w;
canvas.height = h;
const ctx = canvas.getContext('2d');

const fichas = new Array();
const urlsFichas = [
    './resources/linux.png',
    './resources/linux2.png',
    './resources/linux3.jpeg',
    './resources/windows1.jpeg',
    './resources/windows2.jpeg',
]

for (let n = 0; n < 100; n++) {
    const d = diametro+ Math.floor(Math.random() * 120);
    const centroX = Math.random()*(w-d)+ d/2;
    const centroY = Math.random()*(h-d)+ d/2;
    const ficha = new Ficha({ 
        x: centroX, 
        y: centroY, 
        diametro: d, 
        ctx, 
        imageUrl: selectRandom(urlsFichas)
    });

    // ficha.draw();
    fichas.push(ficha);
}
setTimeout(() => {
    for (let i = 0; i < 100; i++) {
        fichas[i].draw();
    }
}, 500);


function selectRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}
// return;

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

function setPixel(img, x, y, r, g, b, a) {
    // const h = img.height;
    const w = img.width;
    const pos = x * 4 + y * w * 4;
    img.data[pos] = r;
    img.data[pos + 1] = g;
    img.data[pos + 2] = b;
    img.data[pos + 3] = a;
}

canvas.addEventListener('mousedown', (event) => {
    for (let i = fichas.length - 1; i >= 0; i--) {
        const ficha = fichas[i];
        const p = getPos(event, canvas);
        if (ficha.isInsidePosition(p.x, p.y)) {
            fichas.splice(i, 1);
            fichas.push(ficha);
            ficha.draw();
            break;
        }
    }
    console.log(getPos(event, canvas));
})

function getPos(event, ctx) {
    const ctxPos = ctx.getBoundingClientRect();
    return {
        x: event.clientX - ctxPos.x,
        y: event.clientY - ctxPos.y
    }
}