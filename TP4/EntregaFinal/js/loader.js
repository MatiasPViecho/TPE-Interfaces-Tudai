const time = 5;
addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector("body");
    const mainDiv = document.querySelector("#main-body");
    const footer = document.querySelector("footer");
    body.classList.add('body-loading');
    mainDiv.classList.add('hide-loading');
    footer.classList.add('hide-loading');
    setTimeout(() => {
        const loader = document.querySelector('#loader');
        if(loader){
            body.classList.remove('body-loading');
            mainDiv.classList.remove('hide-loading');
            footer.classList.remove('hide-loading');
            loader.parentNode.removeChild(loader);

        }
        setInitialAnimations();
    }, time * 1000);
});



function setInitialAnimations() {
    const elements = [ 
        document.querySelector(".scene-one-spider-left"),
        document.querySelector(".scene-one-spider-middle"),
        document.querySelector(".scene-one-spider-right"),
        document.querySelector(".scene-one-buildings-left"),
        document.querySelector(".scene-one-buildings-middle"),
        document.querySelector(".scene-one-buildings-right"),
    ];
    elements.forEach(element => element.classList.add("animate"));
}