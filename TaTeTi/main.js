// arreglo bidimensional que contiene strings vacios representa el tablero del juego.
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

//variable indica que jugador debe jugar.
let turn = 0; // 0 = user, 1 = pc;

//elementos del dom representan el contenedor del tablero y el div  muestra quien es el jugador actual
const boardContainer = document.querySelector("#board");
const playerDiv = document.querySelector("#player");

function renderBoard() {
  const html = board.map((row) => {
    const cells = row.map((cell) => {
      return `<button class="cell">${cell}</button>`;
    });
    return `<div class="row">${cells.join("")}</div>`;
  });

  boardContainer.innerHTML = html.join("");
}

startGame();

function startGame() {
  //llama a la funcion renderBoard q renderiza el tablero de juego en la interfaz de ususario.
  renderBoard();

  //asigna aleatoriamente un valor a turn con math.random. Si el resultado es menor o igual q 0.5 turn se establece en 0. de lo contrario se establece en 1.
  turn = Math.random() <= 0.5 ? 0 : 1;

  //llama a la funcion renderCurrentPlayer q muestra q jugador tiene el turno actual.
  renderCurrentPlayer();
  //si turn es igual a 0 llama a la funcion playerPlays para que juegue el jugador. sino llama a pcPlays para que juegue la pc.
  if (turn === 0) {
    playerPlays();
  } else {
    PCPlays();
  }
}

function renderCurrentPlayer() {
  //actualiza el texto dentro del elemento html identificado como 'playerDv' dependiendo del valor de la variable turn.Si turn es igual a 0, el texto será "Player Turn", lo que indica que es el turno del jugador. Si turn es igual a 1, el texto será "Pc Turn", lo que indica que es el turno de la computadora. Esta función actualiza la interfaz de usuario para mostrar quién es el jugador actual en el juego.

  playerDiv.textContent = `${turn === 0 ? "Player Turn" : "Pc Turn"}`;
}
//MANEJA EL CLIC DEL USUSARIO EN UNA CELDA DEL TABLERO.
//Primero selecciona todas las celdas del tablero y calcula su posicion en la matriz 'board'.Si la celda esta vacia agrega un eventListener para el evento click que actualiza la matriz 'board', muestra la jugada del usuario en el tablero, cambia el turno a la computadora y verifica si hay un ganador o un empate.

function PCPlays() {
  //se encarga de la logica de juego de la pc.
  renderCurrentPlayer();

  setTimeout(() => {
    let played = false;
    const options = checkIfCanWin();
    if (options.length > 0) {
      const bestOptions = options[0];
      for (let i = 0; i < bestOptions.length; i++) {
        if (bestOptions[i].value === 0) {
          const posi = bestOptions[i].i;
          const posj = bestOptions[i].j;
          board[posi][posj] = "X";
          played = true;
          break;
        }
      }
    } else {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === "" && !played) {
            board[i][j] = "X";
            played = true;
          }
        }
      }
    }

    turn = 0;
    renderBoard();
    renderCurrentPlayer();
    const won = checkIfWinner();

    if (won === "none") {
      playerPlays();
      return;
    }
    if (won === "draw") {
      renderDraw();
      return;
    }
  }, 1500);
}


function playerPlays() {
  // console.log("entre a la funcion")
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, i) => {
    const column = i % 3;
    const row = parseInt(i / 3);

    if (board[column][row] === "") {
      // console.log('entre a board', cell);
      cell.addEventListener("click", (e) => {
        // console.log('hice clic')
        board[column][row] = "O";

        cell.textContent = board[column][row];
        turn = 1;
        const won = checkIfWinner();

        if (won === "none") {
          PCPlays();
          return;
        }
        if (won === "draw") {
          renderDraw();
          cell.removeEventListener("click", this);
          return;
        }
      });
    }
  });
}

function renderDraw() {
  //Muestra un mensaje en el playerDiv cuando hay un empate.
  playerDiv.textContent = "Draw";
}

function checkIfCanWin() {
  //Verifica si hay una jugada ganadora disponible para la computadora.
  //Primero crea una copia de la amtriz 'board'. Luego asigna valroes numericos a cada casilla: 1 para las casillas ocupadas por la pc. 0 para las casillas vacias y -2 para las ocupadas por el usuario.
  //Luego crea todas las posibles lineas que podrian dar una victoria y filtra las lineas q tienen un valor total de 2(2 casillas ocupadas por la pc) o -4(dos casillas ocupadas por el usuario y una vacia). Si hay lineas que cumplan con esta condicion devuelve la primera linea. De lo contrario devuelve un arreglo vacío.
  const arr = JSON.parse(JSON.stringify(board));

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === "X") {
        arr[i][j] = { value: 1, i: i, j: j };
      }
      if (arr[i][j] === "") {
        arr[i][j] = { value: 0, i: i, j: j };
      }
      if (arr[i][j] === "O") {
        arr[i][j] = { value: -2, i: i, j: j };
      }
    }
  }
  const p1 = arr[0][0];
  const p2 = arr[0][1];
  const p3 = arr[0][2];
  const p4 = arr[1][0];
  const p5 = arr[1][1];
  const p6 = arr[1][2];
  const p7 = arr[2][0];
  const p8 = arr[2][1];
  const p9 = arr[2][2];

  const s1 = [p1, p2, p3];
  const s2 = [p4, p5, p6];
  const s3 = [p7, p8, p9];
  const s4 = [p1, p4, p7];
  const s5 = [p2, p5, p8];
  const s6 = [p3, p6, p9];
  const s7 = [p1, p5, p9];
  const s8 = [p3, p5, p7];

  const res = [s1, s2, s3, s4, s5, s6, s7, s8].filter((line) => {
    return (
      line[0].value + line[1].value + line[2].value === 2 ||
      line[0].value + line[1].value + line[2].value === -4
    );
  });

  return res;
}

function checkIfWinner() {
  //Verifica si hay un ganador. Crea todas las posibles lineas que podrian dar una victoria y verifica si alguna de ellas tiene todas sus casillas ocupadas por el mismo jugador. Si es asi, devuelve el jugador ganador(O para el usuario, y X para la pc). Si no hay ganador devuelve draw(empate). De lo contrariod devuelve none.
  const p1 = board[0][0];
  const p2 = board[0][1];
  const p3 = board[0][2];
  const p4 = board[1][0];
  const p5 = board[1][1];
  const p6 = board[1][2];
  const p7 = board[2][0];
  const p8 = board[2][1];
  const p9 = board[2][2];

  const PCWon = [
    p1 === "X" && p5 === "X" && p9 === "X",
    p7 === "X" && p5 === "X" && p3 === "X",
    p1 === "X" && p4 === "X" && p7 === "X",
    p2 === "X" && p5 === "X" && p8 === "X",
    p3 === "X" && p6 === "X" && p9 === "X",
    p1 === "X" && p2 === "X" && p3 === "X",
    p4 === "X" && p5 === "X" && p6 === "X",
    p7 === "X" && p8 === "X" && p9 === "X",
  ];
  const playerWon = [
    p1 === "O" && p5 === "O" && p9 === "O",
    p7 === "O" && p5 === "O" && p3 === "O",
    p1 === "O" && p4 === "O" && p7 === "O",
    p2 === "O" && p5 === "O" && p8 === "O",
    p3 === "O" && p6 === "O" && p9 === "O",
    p1 === "O" && p2 === "O" && p3 === "O",
    p4 === "O" && p5 === "O" && p6 === "O",
    p7 === "O" && p8 === "O" && p9 === "O",
  ];

  if (PCWon.includes(true)) {
    console.log("PC WON");
    playerDiv.textContent = "PC WINS";
    return "pcwon";
  }
  if (playerWon.includes(true)) {
    console.log("Player WON");
    playerDiv.textContent = "PLAYER WINS";
    return "playerwon";
  }

  let draw = true;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      if (board[i][j] === "") {
        draw = false;
      }
    }
  }

  return draw ? "draw" : "none";
}

