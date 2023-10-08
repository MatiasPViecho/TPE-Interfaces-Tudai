const btnRightElements = document.querySelectorAll('.btn-right');
const btnLeftElements = document.querySelectorAll('.btn-left');

btnRightElements.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('clicked right btn');
    let parent = btn.closest('.relative');
    let container = parent.querySelector('.cards');
    let items = container.childElementCount;
    let itemWidth = container.firstElementChild.getBoundingClientRect().width;
    let gap = Number(getComputedStyle(container).gap.replace('px', ''));
    let nextScrollPos = itemWidth + gap;
    const itemsInView = Math.floor(container.offsetWidth / itemWidth);
    console.log(container.scrollLeft);
    console.log(itemsInView);
    console.log((items - 1) * itemWidth - items * gap);
    let scrollAmount =
      itemsInView > 1
        ? (container.scrollLeft * itemsInView) / itemsInView
        : container.scrollLeft;
    console.log('scrollAmount: ', scrollAmount);
    if (scrollAmount >= (items - 1) * itemWidth - items * gap) {
      container.scrollBy(-container.scrollLeft, 0);
    } else {
      container.scrollBy(nextScrollPos, 0);
    }
  });
});

btnLeftElements.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log('clicked left btn');
    let parent = btn.closest('.relative');
    let container = parent.querySelector('.cards');
    let items = container.childElementCount;
    let itemWidth = container.firstElementChild.getBoundingClientRect().width;
    let gap = Number(getComputedStyle(container).gap.replace('px', ''));
    let nextScrollPos = itemWidth + gap;
    if (container.scrollLeft < itemWidth) {
      console.log('if');
      container.scrollBy(nextScrollPos * items, 0);
    } else {
      container.scrollBy(-(nextScrollPos + gap), 0);
    }
  });
});
