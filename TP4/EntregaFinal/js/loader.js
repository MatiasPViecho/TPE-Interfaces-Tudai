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
            console.log("if loader")
            body.classList.remove('body-loading');
            mainDiv.classList.remove('hide-loading');
            footer.classList.remove('hide-loading');
            loader.parentNode.removeChild(loader);
        } else {
            console.log("else")
        }
    }, time * 1000);
})
