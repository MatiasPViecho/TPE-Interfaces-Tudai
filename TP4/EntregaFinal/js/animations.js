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
  const cardSpiderGirlFirst = document.querySelector("#target-card-1-zone-3");
  const cardSpiderGirlTwo = document.querySelector("#target-card-2-zone-3");
  const cardSpiderGirlThird = document.querySelector("#target-card-3-zone-3");
  const zone3 = document.querySelector(".zone-3-img-bg-1");
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
  window.addEventListener("scroll", (event) => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      imgLogo.classList.add("logo-menu");
    } else {
      imgLogo.classList.remove("logo-menu");
    }
    zone1Parallax();
    zone1Goblin();
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
      let y = scrollY - zone3.getBoundingClientRect().y - 400;
      if (y > 0 && y < 3000) {
        let relY = y / 1500;
        const starterPointFirst = -140;
        const starterPointSecond = 0;
        const starterPointThird = 210;
        cardSpiderGirlFirst.classList.remove("zone-3-card-invisible");
        cardSpiderGirlTwo.classList.remove("zone-3-card-invisible");
        cardSpiderGirlThird.classList.remove("zone-3-card-invisible");
        if (!cardSpiderGirlFirst.classList.contains("zone-3-card-1")) {
          cardSpiderGirlFirst.classList.add("zone-3-card-1");
          cardSpiderGirlTwo.classList.add("zone-3-card-2");
          cardSpiderGirlThird.classList.add("zone-3-card-3");
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
        if (!cardSpiderGirlFirst.classList.contains("zone-3-card-1")) {
          return;
        }
        cardSpiderGirlFirst.classList.add("zone-3-card-invisible");
        cardSpiderGirlTwo.classList.add("zone-3-card-invisible");
        cardSpiderGirlThird.classList.add("zone-3-card-invisible");
        cardSpiderGirlFirst.classList.remove("zone-3-card-1");
        cardSpiderGirlTwo.classList.remove("zone-3-card-2");
        cardSpiderGirlThird.classList.remove("zone-3-card-3");
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
};
