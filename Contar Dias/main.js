//sistemas de lista de eventos que permite agregar eventos con un nombre y fecha, y luego muestra cuantos dias quedan para cada evento. Ademas, se pueden eliminar eventos de la lista.

//events almacenará los eventos. arr cargará y guardará los eventos en el almacenamiento local del navegador.
let events = [];
let arr = [];

//se seleccionan elementos html del dom como el formulario para agregar eventos, el botón de agregar, el contenedor donde se mostrarán los eventos, etc.
const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const buttonAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");
const form = document.querySelector("form");
//se carga la lista de eventos almacenados en el almacenamiento local y se verifica si hay algun error en la carga.
const json = load();
try {
  arr = JSON.parse(json);
} catch (error) {
  //si hay algun error, se define arr como un arreglo vacio.
  arr = [];
}
//events se inicializa como una copia del arreglo arr.
events = arr ? [...arr] : [];

renderEvents();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addEvent();
});

buttonAdd.addEventListener('click', (e) =>{
    e.preventDefault();
    addEvent();
})


function addEvent() {
  //esta funcion se usa para agregar nuevos eventos a la lista.

  //se verifica que se haya ingresado un nombre y una fecha para el evento.
  if (eventName.value === "" || eventDate.value === "") {
    return;
  }
  //se verifica que la fecha del evento sea valida en el futuro.
  if (dateDiff(eventDate.value) < 0) {
    return;
  }
//si no hay errores se crea un nuevo objeto de evento con un id aleatorio
  const newEvent = {
    id: (Math.random() * 100).toString(36).slice(3),
    name: eventName.value,
    date: eventDate.value,
  };
//y se agrega al comienzo del arreglo events. 
  events.unshift(newEvent);
//se guarda la lista de eventos en el almacenamiento local.
  save(JSON.stringify(events));

//se borran los valores del formulario y se llama a la funcion renderEvents para actualizar la lista d eventos mostrada en la pagina.
  eventName.value = "";
  renderEvents();
}


function dateDiff(d) {
//se usa para calcular la cantidad de dias que faltan para un evento a partir de su fecha. se usa la diferencia de tiempo entre la fecha del evento y la fecha actual para calcular los dias restantes.
  const targetDate = new Date(d);
  const today = new Date();


  const difference = targetDate.getTime() - today.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
}

function renderEvents() {
//se usa para mostrar los eventos en el html.
//genera una cadena html para cada evento en el arreglo events usando un map y se unen todas las cadenas html en una sola cadena usando join.
  const eventsHTML = events.map((event) => {
    return `
            <div class="event">
            <div class="days">
                <span class="days-number">${dateDiff(event.date)}</span>
                <span class="days-text">días</span>
            </div>

            <div class="event-name">${event.name}</div>
            <div class="event-date">${event.date}</div>
            <div class="actions">
                <button class="bDelete" data-id="${event.id}">Eliminar</button>
            </div>
            </div>
            `;
  });
//se agrega un listener de clic a cada boton para eliminar el evento
  eventsContainer.innerHTML = eventsHTML.join("");
  document.querySelectorAll(".bDelete").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = button.getAttribute("data-id");
      events = events.filter((event) => event.id !== id);

      save(JSON.stringify(events));

      renderEvents();
    });
  });
}

function save(data) {
  //guarda la lista de eventos en el almacenamiento local
  localStorage.setItem("item", data);
}

function load() {
  //carga la lista de eventos en el almacenamiento local
  return localStorage.getItem("item");
}
