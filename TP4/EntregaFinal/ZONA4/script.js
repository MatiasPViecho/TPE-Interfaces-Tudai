document.addEventListener('DOMContentLoaded', function () {
   
    let imgSticky1 =  document.querySelector("#img1");
    let imgSticky2 =  document.querySelector("#img2");
    let imgSticky3 =  document.querySelector("#img3");
    let imgSticky4 =  document.querySelector("#img4");
    let textSticky1 =  document.querySelector("#text1");
    let textSticky2 =  document.querySelector("#text2");
    let textSticky3 =  document.querySelector("#text3");
    let textSticky4 =  document.querySelector("#text4");
    document.addEventListener('scroll', () => {
        if (window.scrollY < 500) {
            imgSticky1.style.opacity = 0;
            textSticky1.style.opacity = 0;
        }
        else if (window.scrollY > 500 && window.scrollY < 1000) {
            imgSticky1.style.opacity = 1;
            textSticky1.style.opacity = 1;
            imgSticky2.style.opacity = 0;
            textSticky2.style.opacity = 0;
        }
        else if (window.scrollY > 1000 && window.scrollY < 1600) {
            imgSticky1.style.opacity = 0;
            textSticky1.style.opacity = 0;
            imgSticky2.style.opacity = 1;
            textSticky2.style.opacity = 1;
            imgSticky3.style.opacity = 0;
            textSticky3.style.opacity = 0;
        }
        else if (window.scrollY > 1600 && window.scrollY < 2200) {
            imgSticky2.style.opacity = 0;
            textSticky2.style.opacity = 0;
            imgSticky3.style.opacity = 1;
            textSticky3.style.opacity = 1;
            imgSticky4.style.opacity = 0;
            textSticky4.style.opacity = 0;
        }
        else if (window.scrollY > 2200 && window.scrollY < 2700) {
            imgSticky3.style.opacity = 0;
            textSticky3.style.opacity = 0;
            imgSticky4.style.opacity = 1;
            textSticky4.style.opacity = 1;
        } 
        else {
            imgSticky4.style.opacity = 0;
            textSticky4.style.opacity = 0;
        }
    })
});