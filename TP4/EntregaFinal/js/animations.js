
"use strict"
window.onload = () => {
    const imgLogo = document.querySelector('.logo');
    const sceneOneSpiderLeft = document.querySelector('.scene-one-spider-left');
    const sceneOneSpiderMiddle = document.querySelector('.scene-one-spider-middle');
    const sceneOneSpiderRight = document.querySelector('.scene-one-spider-right');

    window.addEventListener("scroll", (event) => {
        const scrollY = window.scrollY;
        if (scrollY > 0) {
            imgLogo.classList.add('logo-menu');
        } else {
            imgLogo.classList.remove('logo-menu');
        }
        
        const scene1MaxY = 200;
        const scene1scrollY = Math.min(scrollY, scene1MaxY);
        const scene1Variation = scene1scrollY / scene1MaxY;
        // Parallax effect for scene 1 spidermen
        sceneOneSpiderLeft.style.transform = `scale(${1 + .5 * scene1Variation})
                                              translateX(${scene1Variation * -200}px)
                                              translateY(${scene1Variation * -100}px)
                                              `;
        sceneOneSpiderMiddle.style.transform = `scale(${1 + .6 * scene1Variation}) 
                                                translateX(${scene1Variation * -50}px)
                                                translateY(${scene1Variation * 0}px)
                                                rotate(${10 * scene1Variation}deg)`;
        sceneOneSpiderRight.style.transform = ` scale(${1 + .3 * scene1Variation})
                                                translateX(${scene1Variation * 100}px)
                                                translateY(${scene1Variation * 100}px)
                                                rotate(${-10 * scene1Variation}deg)`;
    })



}
