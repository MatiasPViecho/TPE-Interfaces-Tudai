"use strict";
window.onload = () => {
  const imgLogo = document.querySelector(".logo");
  const sceneOneSpiderLeft = document.querySelector(".scene-one-spider-left");
  const sceneOneSpiderMiddle = document.querySelector(
    ".scene-one-spider-middle"
  );
  const sceneOneSpiderRight = document.querySelector(".scene-one-spider-right");
  const spideyAndFriends = document.querySelector(".spidey-and-friends");
  const goblin = document.querySelector(".spidey-and-friends-goblin");
  const zone3Cards = document.querySelector('.zone-3-container');
  const avengersOnBg = document.querySelector(".zone-3-black");
  const imgSticky1 = document.querySelector("#img1");
  const imgSticky2 = document.querySelector("#img2");
  const imgSticky3 = document.querySelector("#img3");
  const imgSticky4 = document.querySelector("#img4");
  const textSticky1 = document.querySelector("#text1");
  const textSticky2 = document.querySelector("#text2");
  const textSticky3 = document.querySelector("#text3");
  const textSticky4 = document.querySelector("#text4");
  const zone4 = document.querySelector(".zone-4-background");
  const imagesZone5 = document.querySelectorAll('.images-container > div');
  const zone2First = document.querySelector('#zone-2-card-1');
  const zone2Second = document.querySelector('#zone-2-card-2');
  const zone2Third = document.querySelector('#zone-2-card-3');
  const zone2Cards = document.querySelector('.zone-2-cards');
  const liElements = zone2Cards.querySelectorAll('li');
  const header = document.querySelector('#header-container');
  const zone5Container = document.querySelector('#zone-5-container');
  const zone5ImageContainer = document.querySelector('#zone-5-bg-container');

  window.addEventListener("scroll", (event) => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      imgLogo.classList.add("logo-menu");
      header.classList.add('small')
    } else {
      imgLogo.classList.remove("logo-menu");
      header.classList.remove('small')
    }
    zone1Parallax();
    zone1Goblin();
    zone2ScrollMove();
    zone3SpiderCardsAppear();
    zone3AvengersMove();
    zone4MoreFriendsMoreFun();
    function zone1Parallax() {
      const scene1MaxY = 300;
      const scene1scrollY = Math.min(scrollY, scene1MaxY);
      let scene1Variation = scene1scrollY / scene1MaxY;
      // Parallax effect for scene 1 spidermen
      sceneOneSpiderLeft.style.transform = `scale(${1 + 0.5 * scene1Variation})
                                              translateX(${
                                                scene1Variation * -300
                                              }px)
                                              translateY(${
                                                scene1Variation * -100
                                              }px)
                                              skewX(${10 * scene1Variation}deg)
                                              rotate(${15 * scene1Variation}deg)
                                              `;

      sceneOneSpiderMiddle.style.transform = `scale(${
        1 + 0.6 * scene1Variation
      }) 
                                                translateX(${
                                                  scene1Variation * 100
                                                }px)
                                                translateY(${
                                                  scene1Variation * -30
                                                }px)
                                                skewX(${
                                                  10 * scene1Variation
                                                }deg)
                                                rotate(${
                                                  10 * scene1Variation
                                                }deg)
                                                `;

      sceneOneSpiderRight.style.transform = ` scale(${
        1 + 0.5 * scene1Variation
      })
                                                translateX(${
                                                  scene1Variation * 300
                                                }px)
                                                translateY(${
                                                  scene1Variation * 200
                                                }px)
                                                skewY(${
                                                  -10 * scene1Variation
                                                }deg)
                                                rotate(${
                                                  -5 * scene1Variation
                                                }deg)
                                                `;

      sceneOneSpiderLeft.style.opacity = scrollY >= 350 ? 0 : 1;
      sceneOneSpiderRight.style.opacity = scrollY >= 350 ? 0 : 1;
    }

    function zone1Goblin() {
      const y = spideyAndFriends.getBoundingClientRect().y * -1 + 600;
      if (y > 0 && y < 1000) {
        // Parallax efect for goblin
        const variation = y / 1000;
        goblin.style.transform = `translateY(${variation * 150 - 100}px)`;
      }
    }

    function zone3SpiderCardsAppear() {
      const y = zone3Cards.getBoundingClientRect().y * -1 + 600;
      if (y > 0 && y < 1000) {
        // Parallax efect for goblin
        const variation = y / 1000;
        zone3Cards.style.transform = `translateY(${variation * 150 - 100}px)`;
      }
    }
    function zone3AvengersMove() {
      let y = scrollY - avengersOnBg.getBoundingClientRect().y - 400;
      if (y > 0 && y < 2400) {
      }
    }
    function zone4MoreFriendsMoreFun() {
      let y = -zone4.getBoundingClientRect().y - 100;
      if (y < 0) {
        imgSticky1.style.opacity = 0;
        textSticky1.style.opacity = 0;
      } else if (y > 0 && y < 600) {
        imgSticky1.style.opacity = 1;
        textSticky1.style.opacity = 1;
        imgSticky2.style.opacity = 0;
        textSticky2.style.opacity = 0;
      } else if (y > 600 && y < 1200) {
        imgSticky1.style.opacity = 0;
        textSticky1.style.opacity = 0;
        imgSticky2.style.opacity = 1;
        textSticky2.style.opacity = 1;
        imgSticky3.style.opacity = 0;
        textSticky3.style.opacity = 0;
      } else if (y > 1200  && y < 1800) {
        imgSticky2.style.opacity = 0;
        textSticky2.style.opacity = 0;
        imgSticky3.style.opacity = 1;
        textSticky3.style.opacity = 1;
        imgSticky4.style.opacity = 0;
        textSticky4.style.opacity = 0;
      } else if (y > 1800 && y < 2600) {
        imgSticky3.style.opacity = 0;
        textSticky3.style.opacity = 0;
        imgSticky4.style.opacity = 1;
        textSticky4.style.opacity = 1;
      } else {
        imgSticky4.style.opacity = 0;
        textSticky4.style.opacity = 0;
      }
    }
  });

  // Zona 5
    imagesZone5.forEach(addHoverEffect);
    function addHoverEffect(elemento) {
      elemento.addEventListener('mouseover', () => {
        applyHoverStyles(elemento);
      });
      elemento.addEventListener('mouseout', () => {
        resetStyles();
      });
    }
    function applyHoverStyles(selectedElement) {
      imagesZone5.forEach(item => {
        console.log(item);
        if (item !== selectedElement) {
          item.style.filter = 'blur(5px)';
          item.style.transform = 'scale(0.8)';
        } else {
          item.style.transform = 'scale(1.3)';
          item.style.filter = 'none';
          console.log(item.id);
          if(item?.id === 'spider-white'){
            zone5Container.classList.add('white-selected');
            zone5ImageContainer.classList.add('white-selected');
            zone5Container.classList.remove('red-selected');
            zone5ImageContainer.classList.remove('red-selected');
            zone5Container.classList.remove('black-selected');
            zone5ImageContainer.classList.remove('black-selected');
          } else if (item?.id === 'spider-red'){
            zone5Container.classList.add('red-selected');
            zone5ImageContainer.classList.add('red-selected');
            zone5Container.classList.remove('white-selected');
            zone5ImageContainer.classList.remove('white-selected');
            zone5Container.classList.remove('black-selected');
            zone5ImageContainer.classList.remove('black-selected');
          } else if (item?.id === 'spider-black'){
            zone5Container.classList.add('black-selected');
            zone5ImageContainer.classList.add('black-selected');
            zone5Container.classList.remove('red-selected');
            zone5ImageContainer.classList.remove('red-selected');
            zone5Container.classList.remove('white-selected');
            zone5ImageContainer.classList.remove('white-selected');
          }
        }
      });
    }
    function resetStyles() {
      imagesZone5.forEach(item => {
        item.style.transform = '';
        item.style.filter = '';
      });
      zone5Container.classList.remove('red-selected');
            zone5ImageContainer.classList.remove('red-selected');
            zone5Container.classList.remove('white-selected');
            zone5ImageContainer.classList.remove('white-selected');
            zone5Container.classList.remove('black-selected');
            zone5ImageContainer.classList.remove('black-selected');
    }

  const zone3Black = document.querySelector(".zone-3-black");
  const zone3_1 = document.querySelector(".zone-3-bg-2-part.index-1");
  const zone3_2 = document.querySelector(".zone-3-bg-2-part.index-2");
  const zone3Characters = document.querySelectorAll(".zone-3-character");
  zone3Black.addEventListener("mousemove", (e) => {
    const rect = zone3Black.getBoundingClientRect();
    const x = e.clientX; // 0 to rect.width
    const y = e.clientY;  // 0 to rect.height
    const relX = x / rect.width; // 0 to 1
    const relY = y / rect.height; // 0 to 1
    let v = 1.5; // max variation
    zone3_1.style.transform = `translate(${relX * v * -1 + v / 2}%, ${relY * v * -.5 + v / 2}%)
                scale(${1 + v / 100})          
                `;

    v = 8; // max variation
    zone3Characters[0].style.transform = `translate(${relX * v - v / 2}%, ${relY * v - v / 2}%)
                scale(${1 + v / 100})          
                `;

    v = 7; // max variation
    let r = 5; // max rotation
    zone3Characters[1].style.transform = `translate(${relX * v * -1 + v / 2}%, ${relY * v - v / 2}%)
                rotate(${relX * relY * r - r / 2}deg)
                skewY(${relY * relX  * v - v / 2}deg)
                `;

    v = 2; // max variation
    zone3Characters[2].style.transform = `translate(${relX * v - v / 2}%, ${relY * v - v / 2}%)
                `;

    v = 6; // max variation
    zone3_2.style.transform = `translate(${relX * v - v / 2}%, ${relY * v - v / 2}%)
                scale(${1 + v / 100})          
    `;
    
  }) 

  zone3Black.addEventListener("mouseleave", () => {
    zone3_1.style.transform = '';
    zone3Characters.forEach(character => character.style.transform =  '');
    zone3_2.style.transform = '';
  });

  function zone2ScrollMove() {
    const y = zone2First.getBoundingClientRect().y * -1 + 600;
    const listY = zone2Cards.getBoundingClientRect().y * -1 + 600;
      if((listY > 0 && listY < 900) && !liElements[0].classList.contains('animate-enter')){
        liElements.forEach(li => {
          li.classList.add('animate-enter');
          li.classList.remove('animate-out');
        });
      } 
      if((listY < -200 || listY >= 900 )&& !liElements[0].classList.contains('animate-out')){
        liElements.forEach(li => {
          li.classList.add('animate-out');
          li.classList.remove('animate-enter');
        });
      }
      if (y > -750 && y < 1000) {
        const variation = y / 1000;
        zone2First.style.setProperty('background-position-x', `${(variation * 0.4) * (-200)}px`);      
        zone2Third.style.setProperty('background-position-y', `${-120 + (variation * 1.4) * (-200)}px`);      
        zone2Second.style.setProperty('background-position-x', `${-100 + (variation * 0.4) * (20 + 100)}px`);      
        zone2Third.style.setProperty('background-position-x', `${(variation * 1.5) * (-10)}px`);      
        zone2Third.style.setProperty('background-position-y', `${-120 + -(variation * 0.2) * (-500)}px`);      
    }
  }
};
