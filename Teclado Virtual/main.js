// cada arreglo representa una fila del teclado y contiene pares de caracteres que se muestran en los botones del teclado
const keys = [
  [
    // El primer elemento del par representa el carácter en minúscula y el segundo elemento representa el carácter en mayúscula.
    ["1", "!"],
    ["2", "@"],
    ["3", "#"],
    ["4", "$"],
    ["5", "%"],
    ["6", "&"],
    ["7", "/"],
    ["8", "("],
    ["9", ")"],
    ["0", "="],
    ["'", "?"],
    ["¿", "¡"],
  ], //primera fila

  [
    ["q", "Q"],
    ["w", "W"],
    ["e", "E"],
    ["r", "R"],
    ["t", "T"],
    ["y", "Y"],
    ["u", "U"],
    ["i", "I"],
    ["o", "O"],
    ["p", "P"],
    ["´", "¨"],
    ["+", "*"],
  ], // segunda fila

  [
    ["MAYUS", "MAYUS"],
    ["a", "A"],
    ["s", "S"],
    ["d", "D"],
    ["f", "F"],
    ["g", "G"],
    ["h", "H"],
    ["j", "J"],
    ["k", "K"],
    ["l", "L"],
    ["ñ", "Ñ"],
    ["{", "}"],
    ["[", "]"],
  ], //tercera fila

  [
    ["SHIFT", "SHIFT"],
    ["<", ">"],
    ["z", "Z"],
    ["x", "X"],
    ["c", "C"],
    ["v", "V"],
    ["b", "B"],
    ["n", "N"],
    ["m", "M"],
    [",", ";"],
    [".", ":"],
    ["-", "_"],
  ], //cuarta fila

  [["SPACE", "SPACE"]], //ultima fila
];

// Variables booleanas mayus y shift que indican si las teclas de mayúsculas o shift están activadas
// Estas variables controlan la apariencia de los botones del teclado y cómo se muestran los caracteres en los botones.
let mayus = false;
let shift = false;
let current = null;

renderKeyboard();

//Renderiza el teclado en el formulario HTML.
// Crea una representación HTML del teclado a partir de los datos en el arreglo keys y lo inserta en el elemento con el id "keyboard-container". 
function renderKeyboard() {
  const keyboardContainer = document.querySelector("#keyboard-container");
  let empty = `<div class="key-empty"></div>`;

  const layers = keys.map((layer) => {
    return layer.map((key) => {
      if (key[0] === "SHIFT") {
        return `<button class="key key-shift">${key[0]}</button>`;
      }
      if (key[0] === "MAYUS") {
        return `<button class="key key-mayus">${key[0]}</button>`;
      }
      if (key[0] === "SPACE") {
        return `<button class="key key-space"></button>`;
      }


      return `<button class="key key-normal">
            ${
              shift
                ? key[1]
                : mayus &&
                  key[0].toLowerCase().charCodeAt(0) >= 97 &&
                  key[0].toLowerCase().charCodeAt(0) <= 122
                ? key[1]
                : key[0]
            }
            </button>
            `;
    });
  });

  layers[0].push(empty);
  layers[1].unshift(empty);

  const htmlLayers = layers.map((layer) => {
    return layer.join("");
  });

  keyboardContainer.innerHTML = "";

  htmlLayers.forEach((layer) => {
    keyboardContainer.innerHTML += `<div class="layer">${layer}</div>`;
  });

  document.querySelectorAll(".key").forEach((key) => {
    // Se añaden listeners a los botones del teclado para detectar clics en los botones. Dependiendo del botón clicado, se realiza una acción específica.
    key.addEventListener("click", (e) => {
      if (current) {
        if (key.textContent === "SHIFT") {
          shift = !shift;
        } else if (key.textContent === "MAYUS") {
          mayus = !mayus;
        } else if (key.textContent === "") {
          current.value += " ";
        } else {
          current.value += key.textContent.trim();
          if (shift) {
            shift = false;
          }
        }

        renderKeyboard();
        current.focus();
      }
    });
  });
}

document.querySelectorAll("input").forEach((input) => {
  // event listener que detecta cuando un elemento de entrada de texto obtiene el foco, y asigna dicho elemento a la variable current. Esto permite que los caracteres del teclado virtual se agreguen al elemento de entrada de texto correcto cuando se hace clic en los botones del teclado.
  input.addEventListener("focusin", (e) => {
    current = e.target;
  });
});
