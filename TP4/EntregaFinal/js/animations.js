
"use strict"
window.onload = () => {
    const imgLogo = document.querySelector('.logo');
    const sceneOneSpiderLeft = document.querySelector('.scene-one-spider-left');
    const sceneOneSpiderMiddle = document.querySelector('.scene-one-spider-middle');
    const scenneOneSpiderRight = document.querySelector('.scene-one-spider-right');

    window.addEventListener("scroll", (event) => {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
            imgLogo.classList.add('logo-menu');
        } else {
            imgLogo.classList.remove('logo-menu');
        }

        // Parallax effect for scene 1 spidermen
        // sceneOneSpiderLeft.style.transform = `translateY(${scrollY * 0.3}px)`;
    })
}
