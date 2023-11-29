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
    const spiderLeft = document.querySelector(".scene-one-spider-left");
    const spiderMiddle = document.querySelector(".scene-one-spider-middle");
    const spiderRight = document.querySelector(".scene-one-spider-right");

    spiderLeft.classList.add("animate");
    spiderMiddle.classList.add("animate");
    spiderRight.classList.add("animate");
}