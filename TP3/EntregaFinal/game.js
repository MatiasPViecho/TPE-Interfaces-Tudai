import { Juego } from "../../test-canvas/js/Juego.js";

document.querySelectorAll(".btn-favourite").forEach((btn) => {
  btn.addEventListener("click", () => btn.classList.toggle("not-like"));
});

const btnCompartir = document.querySelector(".btn-compartir");
const shareCard = document.querySelector(".share-card");

shareCard
  .querySelector(".close")
  .addEventListener("click", () => shareCard.classList.remove("show"));

  shareCard
  .querySelectorAll(".share-with svg").forEach(element => element.addEventListener("click", () => shareCard.classList.remove("show")));

shareCard.addEventListener("click", (event) => {
  if (event.target == shareCard.querySelector(".share-card-background")) {
    shareCard.classList.remove("show");
  }
});

btnCompartir.addEventListener("click", () => shareCard.classList.add("show"));

const canvas = document.querySelector("canvas#game");
// canvas.width = 500;
// canvas.height = 300;
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
new Juego(canvas);
