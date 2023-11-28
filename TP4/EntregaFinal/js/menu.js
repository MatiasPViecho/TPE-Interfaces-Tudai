"use strict"
console.log("loaded");
let flag = false;

const headerBtn = document.querySelector('#header-menu-button');
headerBtn.addEventListener('click', () => {
    if(!flag){
        headerBtn.classList.add('animate');
    } else {
        headerBtn.classList.remove('animate');
    }
    flag = !flag;
})
