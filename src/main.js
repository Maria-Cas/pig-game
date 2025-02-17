import "./style.css";

document.querySelector("#app").innerHTML = `
 <main>
      <section class="player player--0 player--active">
        <h2 class="name" id="name--0">Player 1</h2>
        <p class="score" id="score--0">43</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--0">3</p>
        </div>
      </section>
      <section class="player player--1">
        <h2 class="name" id="name--1">Player 2</h2>
        <p class="score" id="score--1">24</p>
        <div class="current">
          <p class="current-label">Current</p>
          <p class="current-score" id="current--1">5</p>
        </div>
      </section>

      <img src="dice-5.png" alt="Playing dice" class="dice" />
      <button class="btn btn--new">🔄 New game</button>
      <button class="btn btn--roll">🎲 Roll dice</button>
      <button class="btn btn--hold">📥 Hold</button>
    </main>
`;

//seleccionar DOM elements

//activePlayer -> variable de estado en JS -> JUGADORES
const sectionPlayer0 = document.querySelector(".player--0");
const sectionPlayer1 = document.querySelector(".player--1");

//score =[0,0] -> variable de estado en JS -> CONTADOR SUP
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");

//current -> variable de estado en JS -> CONTADOR INF
const currentScore0 = document.querySelector("#current--0");
const currentScore1 = document.querySelector("#current--1");

//botton
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");
const btnRoll = document.querySelector(".btn--roll");

const imgDice = document.querySelector(".dice"); //seleccionamos el imagen dado

let score, currentScore, activePlayer;

//inicializo variables de estado
const initData = () => {
  score = [0, 0]; //puntuacion definitiva (la acumulada)
  currentScore = 0; //puntuacion actual(cada tirada de dado)
  activePlayer = 0; //cual es el jugador activo

  //inicializo variables del DOM

  imgDice.classList.add("hidden"); //escondemos el dado
  score0.textContent = 0; //variables creadas mas arriba en el dom
  score1.textContent = 0;
  currentScore0.textContent = 0; // pongo las puntuaciones a cero
  currentScore1.textContent = 0;
};

initData();

btnRoll.addEventListener("click", throwDice); //hacer click en el boton (llamada)

function throwDice() {
  // generar un número aleatorio entre 1 y 6
  const diceNumber = Math.trunc(Math.random() * 6) + 1; // mostrar el dado entre uno y 6
  imgDice.classList.remove("hidden"); //quitamos el escondido de la imagen del dado ( a muestro)
  imgDice.src = `dice-${diceNumber}.png`; //me muestra la imagen con el numero k ha salido
  // si no es 1
  if (diceNumber !== 1) {
    updateCurrentScore(diceNumber); //actualizo la puntuacion
  }
  // si es 1
  else {
    // cambiar de jugador
    switchPlayer(); //llamamaos a la funcion de abajo
  }
}
function updateCurrentScore(diceNumber) {
  currentScore += diceNumber; //puntuacion anterior + suma de dado
  if (activePlayer === 0) {
    currentScore0.textContent = currentScore;
  } else {
    currentScore1.textContent = currentScore;
  }
}
function switchPlayer() {
  // si sacas uno cambia de jugador
  resetCurrentScore();
  sectionPlayer0.classList.toggle("player--active"); // toggle añade o quita la clase
  sectionPlayer1.classList.toggle("player--active");
  
  activePlayer = activePlayer === 0 ? 1 : 0;
}
function resetCurrentScore() {
  //poner todas las posiciones temporales a cero
  currentScore = 0;// reinicia la variable a 0
  currentScore0.textContent = 0; //establece la puntuacion en el DOM del jugador 1
  currentScore1.textContent = 0; //establece la puntuacion en el DOM del jugador 2
}

function userHoldsScore() {
  
  score[activePlayer] += currentScore; //suma el puntuaje actual al puntuaje total

  // actualiza la puntuacion en el DOM
  if (activePlayer === 0) {
    score0.textContent = score[activePlayer]; //si el jugador activo es el 1, mostrar su puntuacion
  } else {
    score1.textContent = score[activePlayer]; //si el jugador activo es el 2, mostrar su puntuacion
  }

  // Comprobar la jugada
  if (score[activePlayer] >= 100) { //comprueba si el jugador ha alcanazado el 100
    // Añadir clase ganadora
    if (activePlayer === 0) {
      sectionPlayer0.classList.add("player--winner"); //si el jugador 0 es el ganador agrega la clase
      sectionPlayer0.classList.remove("player--active");// cambia la clase para indicar que no esta activo
    } else {
      sectionPlayer1.classList.add("player--winner");//lo mismo de arriba, pero con el otro jugador
      sectionPlayer1.classList.remove("player--active");
    }

    // Hide dice
    imgDice.classList.add("hidden");

    // Desactivar botones
    btnRoll.disabled = true; //descativa el boton de lanzar dado
    btnHold.disabled = true; //desactiva el boton de mantener puntuacion
  } else {
    // si no hay un ganador, cambia al siguiente
    switchPlayer();
  }
  }

  function userResetsGame() {
    // cambia la clase de los jugadores
    sectionPlayer0.classList.remove('player--winner'); //cambia la clase para quitar el estilo ganador
    sectionPlayer1.classList.remove('player--winner');
      
    // Resetea el jugador activo
    sectionPlayer0.classList.add('player--active'); //añade la clase para mostrar jugador activo
    sectionPlayer1.classList.remove('player--active');

    // Reseteo los contadores a 0
    score0.textContent = 0;
    score1.textContent = 0;
    currentScore0.textContent = 0;
    currentScore1.textContent = 0;
    score = [0, 0]; // reiniciar los puntuajes de ambos juagdores
    currentScore = 0; //empieza de nuevo cone la puntuacion temporal
    activePlayer = 0;

    // Hide dice
    imgDice.classList.add('hidden');

    // Reseteo los botones
    btnRoll.disabled = false; //activa el boton de lanzar dado
    btnHold.disabled = false; //activa el boton de mantener puntuacion

     // Inicializa el juego
    initData();
  }  

    // añadir escucha de eventos
    btnRoll.addEventListener("click", throwDice);
    btnHold.addEventListener('click', userHoldsScore);
    btnNew.addEventListener('click', userResetsGame)
