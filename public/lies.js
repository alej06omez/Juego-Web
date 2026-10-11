
const frases = [
  { texto: "태양은 보라색이다", verdadero: false },
  { texto: "2 + 2 = 4", verdadero: true },
  { texto: "개는 자연적으로 날 수 있다", verdadero: false },
  { texto: "지구는 태양 주위를 돈다", verdadero: true },
  { texto: "물은 100도에서 끓는다", verdadero: true },
  { texto: "한국의 수도는 도쿄이다", verdadero: false },
  { texto: "사과는 과일이다", verdadero: true },
  { texto: "고양이는 바다에서 산다", verdadero: false },
  { texto: "겨울은 여름보다 춥다", verdadero: true },
  { texto: "사람은 산소 없이 살 수 있다", verdadero: false }
];

const TIEMPO = 1500;      // ms para responder
const PAUSA = 1000;       // ms mostrando el resultado antes de la siguiente frase
const META = 5;

const juego = document.getElementById("juego");
const fraseEl = document.getElementById("frase");
const resultadoEl = document.getElementById("resultado");
const puntajeEl = document.getElementById("puntaje");

let puntaje = 0;
let actual = null;
let timer = null;

function mostrarFrase() {
  actual = frases[Math.floor(Math.random() * frases.length)];
  fraseEl.textContent = "👉 " + actual.texto;
  resultadoEl.textContent = "";
  timer = setTimeout(() => terminar("Time's over!"), TIEMPO);
}

function responder(valor) {
  if (!actual) return; // ya respondió o no hay frase activa
  clearTimeout(timer);
  if (valor === actual.verdadero) {
    puntaje++;
    terminar("Correct!");
  } else {
    terminar("Wrong!");
  }
}

function terminar(mensaje) {
  actual = null;
  resultadoEl.textContent = mensaje;
  puntajeEl.textContent = "Score: " + puntaje;
  if (puntaje >= META) {
    fraseEl.textContent = " ¡You win with a perfect score!";
    document.querySelector("#start-btn").hidden = false;
  } else {
    setTimeout(mostrarFrase, PAUSA);
  }
}

document.querySelector("#start-btn").addEventListener("click", (e) => {
  e.target.hidden = true;
  juego.hidden = false;
  puntaje = 0;
  puntajeEl.textContent = "Score: 0";
  mostrarFrase();
});

document.getElementById("btn-v").addEventListener("click", () => responder(true));
document.getElementById("btn-f").addEventListener("click", () => responder(false));
document.addEventListener("keydown", (e) => {
  const k = e.key.toUpperCase();
  if (k === "TRUE") responder(true);
  if (k === "FALSE") responder(false);
});
