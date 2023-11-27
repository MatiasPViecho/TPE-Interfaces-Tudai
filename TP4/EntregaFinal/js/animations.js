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
  const avengersOnBg = document.querySelector('.zone-3-black');
  window.addEventListener('scroll', (event) => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      imgLogo.classList.add('logo-menu');
    } else {
      imgLogo.classList.remove('logo-menu');
    }
    zone1Parallax()
    zone3SpiderCardsAppear();
    zone3AvengersMove();
    function zone1Parallax() {
        
        const scene1MaxY = 300;
        const scene1scrollY = Math.min(scrollY, scene1MaxY);
        let scene1Variation = scene1scrollY / scene1MaxY;
        // Parallax effect for scene 1 spidermen
        sceneOneSpiderLeft.style.transform = `scale(${1 + .5 * scene1Variation})
                                              translateX(${scene1Variation * -300}px)
                                              translateY(${scene1Variation * -100}px)
                                              skewX(${10 * scene1Variation}deg)
                                              rotate(${15 * scene1Variation}deg)
                                              `;

        sceneOneSpiderMiddle.style.transform = `scale(${1 + .6 * scene1Variation}) 
                                                translateX(${scene1Variation * 100}px)
                                                translateY(${scene1Variation * -30}px)
                                                skewX(${10 * scene1Variation}deg)
                                                rotate(${10 * scene1Variation}deg)
                                                `;

        sceneOneSpiderRight.style.transform = ` scale(${1 + .5 * scene1Variation})
                                                translateX(${scene1Variation * 300}px)
                                                translateY(${scene1Variation * 200}px)
                                                skewY(${-10 * scene1Variation}deg)
                                                rotate(${-5 * scene1Variation}deg)
                                                `;

        sceneOneSpiderLeft.style.opacity = scrollY >= 350 ? 0 : 1;
        sceneOneSpiderRight.style.opacity = scrollY >= 350 ? 0 : 1;
    }
    function zone3SpiderCardsAppear() {
      let y = (scrollY - zone3.getBoundingClientRect().y) - 400 ;
      if (y > 0 && y < 3000) {
        let relY = y / 1500;
        const starterPointFirst = -140;
        const starterPointSecond = 0;
        const starterPointThird = 210;
        cardSpiderGirlFirst.classList.remove('zone-3-card-invisible');
        cardSpiderGirlTwo.classList.remove('zone-3-card-invisible');
        cardSpiderGirlThird.classList.remove('zone-3-card-invisible');
        if (!cardSpiderGirlFirst.classList.contains('zone-3-card-1')) {
          cardSpiderGirlFirst.classList.add('zone-3-card-1');
          cardSpiderGirlTwo.classList.add('zone-3-card-2');
          cardSpiderGirlThird.classList.add('zone-3-card-3');
        }
        cardSpiderGirlFirst.style.transform = `translateY(${
          -relY * 50 + starterPointFirst
        }px)
        skewY(${relY * -5}deg)
        `;
        cardSpiderGirlTwo.style.transform = `translateY(${
          -relY * 50 + starterPointSecond
        }px)
        skewY(${relY * 7}deg)
        `;
        cardSpiderGirlThird.style.transform = `translateY(${
          -relY * 50 + starterPointThird
        }px)
        skewY(${relY * 8}deg)
        `;
      } else {
        if (!cardSpiderGirlFirst.classList.contains('zone-3-card-1')) {
         return;
        }
        cardSpiderGirlFirst.classList.add('zone-3-card-invisible');
        cardSpiderGirlTwo.classList.add('zone-3-card-invisible');
        cardSpiderGirlThird.classList.add('zone-3-card-invisible');
        cardSpiderGirlFirst.classList.remove('zone-3-card-1');
        cardSpiderGirlTwo.classList.remove('zone-3-card-2');
        cardSpiderGirlThird.classList.remove('zone-3-card-3');
      }
    }
    function zone3AvengersMove() {
      let y = (scrollY - avengersOnBg.getBoundingClientRect().y) - 400 ;
      if (y > 0 && y < 2400) {
      }
    }
  });
};
