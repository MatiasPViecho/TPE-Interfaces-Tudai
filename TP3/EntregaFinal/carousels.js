const btnRightElements = document.querySelectorAll('.btn-right');
const btnLeftElements = document.querySelectorAll('.btn-left');

btnRightElements.forEach((btn) => {
  setInterval(() => {
    handleScrollRight(btn);
  }, 3500);
  btn.addEventListener('click', () => {
    handleScrollRight(btn);
  });
});

btnLeftElements.forEach((btn) => {
  btn.addEventListener('click', () => {
    handleScrollLeft(btn);
  });
});

const handleScrollRight = (btn) => {
  let parent = btn.closest('.relative');
  let container = parent.querySelector('.cards');
  let items = container.childElementCount;
  let itemWidth = container.firstElementChild.getBoundingClientRect().width;
  let gap = Number(getComputedStyle(container).gap.replace('px', ''));
  let nextScrollPos = itemWidth + gap;
  const itemsInView = Math.floor(container.offsetWidth / itemWidth);
  if (
    container.scrollLeft * itemsInView >=
    (items - 1) * itemWidth - items * gap
  ) {
    container.scrollBy(-container.scrollLeft, 0);
  } else {
    container.scrollBy(nextScrollPos + gap * itemsInView, 0);
  }
};
const handleScrollLeft = (btn) => {
  let parent = btn.closest('.relative');
  let container = parent.querySelector('.cards');
  let items = container.childElementCount;
  let itemWidth = container.firstElementChild.getBoundingClientRect().width;
  let gap = Number(getComputedStyle(container).gap.replace('px', ''));
  const itemsInView = Math.floor(container.offsetWidth / itemWidth);
  let nextScrollPos = itemWidth + gap;

  if (container.scrollLeft < itemWidth) {
    container.scrollBy(nextScrollPos * items, 0);
  } else {
    container.scrollBy(-(nextScrollPos + gap * itemsInView), 0);
  }
};
