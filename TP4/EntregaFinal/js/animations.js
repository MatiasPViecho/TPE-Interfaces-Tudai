'use strict';
window.onload = () => {
  const imgLogo = document.querySelector('.logo');
  const sceneOneSpiderLeft = document.querySelector('.scene-one-spider-left');
  const sceneOneSpiderMiddle = document.querySelector(
    '.scene-one-spider-middle'
  );
  const sceneOneSpiderRight = document.querySelector('.scene-one-spider-right');
  const cardSpiderGirlFirst = document.querySelector('#target-card-1-zone-3');
  const cardSpiderGirlTwo = document.querySelector('#target-card-2-zone-3');
  const cardSpiderGirlThird = document.querySelector('#target-card-3-zone-3');
  const zone3 = document.querySelector('.zone-3-img-bg-1');
  const cardCoordinates = zone3.getBoundingClientRect();
  console.log(cardCoordinates);

  window.addEventListener('scroll', (event) => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      imgLogo.classList.add('logo-menu');
    } else {
      imgLogo.classList.remove('logo-menu');
    }
    Zone3SpiderCardsAppear();
    const scene1MaxY = 200;
    const scene1scrollY = Math.min(scrollY, scene1MaxY);
    const scene1Variation = scene1scrollY / scene1MaxY;
    // Parallax effect for scene 1 spidermen
    sceneOneSpiderLeft.style.transform = `scale(${1 + 0.5 * scene1Variation})
                                              translateX(${
                                                scene1Variation * -200
                                              }px)
                                              translateY(${
                                                scene1Variation * -100
                                              }px)
                                              `;
    sceneOneSpiderMiddle.style.transform = `scale(${1 + 0.6 * scene1Variation}) 
                                                translateX(${
                                                  scene1Variation * -50
                                                }px)
                                                translateY(${
                                                  scene1Variation * 0
                                                }px)
                                                rotate(${
                                                  10 * scene1Variation
                                                }deg)`;
    sceneOneSpiderRight.style.transform = ` scale(${1 + 0.3 * scene1Variation})
                                                translateX(${
                                                  scene1Variation * 100
                                                }px)
                                                translateY(${
                                                  scene1Variation * 100
                                                }px)
                                                rotate(${
                                                  -10 * scene1Variation
                                                }deg)`;

    function Zone3SpiderCardsAppear() {
      if (scrollY > cardCoordinates.bottom - cardCoordinates.top) {
        console.log('if');
        cardSpiderGirlFirst.classList.remove('zone-3-card-invisible');
        cardSpiderGirlTwo.classList.remove('zone-3-card-invisible');
        cardSpiderGirlThird.classList.remove('zone-3-card-invisible');
        if (!cardSpiderGirlFirst.classList.contains('zone-3-card-1-end')) {
          cardSpiderGirlFirst.classList.add('zone-3-card-1');
          cardSpiderGirlTwo.classList.add('zone-3-card-2');
          cardSpiderGirlThird.classList.add('zone-3-card-3');
          //   setTimeout(() => {
          //     cardSpiderGirlFirst.classList.remove('zone-3-card-1');
          //     cardSpiderGirlTwo.classList.remove('zone-3-card-2');
          //     cardSpiderGirlThird.classList.remove('zone-3-card-3');
          //     cardSpiderGirlFirst.classList.add('zone-3-card-1-end');
          //     cardSpiderGirlTwo.classList.add('zone-3-card-2-end');
          //     cardSpiderGirlThird.classList.add('zone-3-card-3-end');
          //   }, 1000);
        }
        // cardSpiderGirlFirst.style.transform = `translateY(${
        //   -scrollY * 0.08
        // }px)`;
      } else {
        if (cardSpiderGirlFirst.classList.contains('zone-3-card-1-end')) {
          cardSpiderGirlFirst.classList.remove('zone-3-card-1-end');
        }
        console.log('else');
        cardSpiderGirlFirst.classList.add('zone-3-card-invisible');
        cardSpiderGirlTwo.classList.add('zone-3-card-invisible');
        cardSpiderGirlThird.classList.add('zone-3-card-invisible');
        cardSpiderGirlFirst.classList.remove('zone-3-card-1');
        cardSpiderGirlTwo.classList.remove('zone-3-card-2');
        cardSpiderGirlThird.classList.remove('zone-3-card-3');
      }
    }
  });
};
