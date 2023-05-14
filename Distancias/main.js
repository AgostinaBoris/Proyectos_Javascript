const itDistancia = el("#distancia");
const itTransporte = el("#transporte");
const itCalcular = el("#calcular");
const resultados = el("#resultados");

function calcular() {
  const distance = itDistancia.value;

  if (distance <= 1000) {
    itTransporte.innerText = "Vas Caminando";
  } else if (distance > 1000 && distance <= 10000) {
    itTransporte.innerText = "Vas en bici";
  } else if (distance > 10000 && distance <= 30000) {
    itTransporte.innerText = "Vas en bondi";
  } else if (distance > 30000 && distance <= 100000) {
    itTransporte.innerText = "Vas en auto";
  } else if (distance > 100000) {
    itTransporte.innerText = "Vas en avión";
  } else {
    console.error("Sin transporte");
  }
}

itCalcular.addEventListener("click", (e) => {
  console.log(e);
  calcular();
});

function el(selector) {
  return document.querySelector(selector);
}
