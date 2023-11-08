import { Juego } from "./js/Juego.js";

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

const btnStart = document.getElementById('start-game');
const formGame = document.getElementById('game-setup')

// TODO: CARGAR JUEGO AL LLENAR FORMULARIO PERSONALIZADO
const canvas = document.querySelector("canvas#game");
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;
// Para un n en raya pasar por parametro  tipoJuego: n
btnStart.addEventListener('click', (e) => {
  e.preventDefault()
  formGame.classList.add('hidden')

  const selectedBoardSize = document.querySelector('input[name="board-size"]:checked').value;
  new Juego(canvas, {
    tipoJuego: parseInt(selectedBoardSize),
    secondsPerTurn: 30, // Segundos del turno
    urlWindows: "", // Url Ficha Windows. Vacío pone fichas aleatorias
    urlLinux: "" // Url Ficha Linux. Vacío pone fichas aleatorias
  });

})