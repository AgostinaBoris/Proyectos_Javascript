//se implementa una funcionalidad de mascara para tres campo de entrada en un formulario:numero de tarjeta de credito, fecha de vencimiento y CVV.

//variables se utilizan para hacer referencia a los elementos de entrada de cada campo en el DOM.
const inputCard = document.querySelector("#inputCard");
const inputDate = document.querySelector("#inputDate");
const inputCVV = document.querySelector("#inputCVV");

//son las mascaras que se aplicaran a cada campo de entrada para formatear el texto que el usuario ingresa.
const maskNumber = "####-####-####-####";
const maskDate = "##/##";
const maskCVV = "###";

//matrices vacias se utilizaran para almacenar temporalmente los caracteres que se ingresan en cada campo de entrada antes de formatearlos con la mascara correspondiente.
let current = "";
let cardNumber = [];
let dateNumber = [];
let cvvNumber = [];

//se agrega escuchadores de eventos de teclado para capturar la entrada del usuario en cada campo de entrada y rpocesarla en consecuencia.
inputCard.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    return;
  }
  e.preventDefault();
  handleInput(maskNumber, e.key, cardNumber);
  inputCard.value = cardNumber.join("");
});

inputDate.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    return;
  }
  e.preventDefault();
  handleInput(maskDate, e.key, dateNumber);
  inputDate.value = dateNumber.join("");
});

inputCVV.addEventListener("keydown", (e) => {
  //si se presiona tecla tab se sale de la funcion y no pasa nada
  if (e.key === "Tab") {
    return;
  }
  e.preventDefault();
  handleInput(maskCVV, e.key, cvvNumber);
  inputCVV.value = cvvNumber.join("");
});


function handleInput(mask, key, arr) {
  //se llama desde cada escuchador de eventos y toma tres argumentos: la mascara que se aplicará, la tecla que se presionó y la amtriz que se utilizará para almacenar los caracteres.
  let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  //si se presiona backspace y la amtriz tiene caracteres, elimina el ultimo caracter de la matriz. si la tecla es un numero y la amtriz no esta completa, agrega el numero a la matriz. 
  if (key === "Backspace" && arr.length > 0) {
    arr.pop();
    return;
  }
  //si la mascara en la posicion actual es un guion o una barra, agrega ese caracter a la amtriz junto con el numero ingresado.
  if (numbers.includes(key) && arr.length + 1 <= mask.length) {
    //se actualiza el valor de cada campo de entrada con el resultado formateado al unir los elementos de la amtriz con una cadena vacía y establecer esa cadena como el valor del campo de entrada. En cada evento de entrada, se asegura de que el usuario no pueda ingresar mas caracteres de los que se especifican en la mascara correspondiente.
    if (mask[arr.length] === "-" || mask[arr.length] === "/") {
      arr.push(mask[arr.length], key);
    } else {
      arr.push(key);
    }
  }
}
