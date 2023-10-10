let loader = document.querySelector('.loader');

let start = Date.now();
percent = loader.querySelector('.percent');
const progress = setInterval(() => {
  current = Math.floor((Date.now() - start) / 4500 * 100);
  if (current <= 100)
    percent.innerHTML = current + '%';
  else {
    percent.innerHTML = '100%';
    clearInterval(percent);
    setTimeout(() => {
      loader.classList.add('display-none');
    }, 800);
  }
}, 320);