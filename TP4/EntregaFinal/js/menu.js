"use strict"
let flag = false;

const headerBtn = document.querySelector('#header-menu-button');
const headerMenu = document.querySelector('#menu-header-options');

headerBtn.addEventListener('click', () => {
    if(!flag){
        headerBtn.classList.add('animate');
        headerMenu.classList.add('open');
    } else {
        headerBtn.classList.remove('animate');
        headerMenu.classList.remove('open');
    }
    flag = !flag;
})