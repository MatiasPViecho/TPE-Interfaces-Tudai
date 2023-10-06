let buttons = document.querySelectorAll('.active-button');
let activeElems = document.querySelectorAll('.active-element');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
      activeElems.forEach((elem) => {
        elem.classList.remove('item-brighter');
      });
      document.querySelector('html').classList.remove('bg-backdrop');
    } else {
      buttons.forEach((btn) => {
        btn.classList.remove('active');
      });
      button.classList.add('active');
      activeElems.forEach((elem) => {
        elem.classList.add('item-brighter');
      });
      document.querySelector('html').classList.add('bg-backdrop');
    }
  });
});
