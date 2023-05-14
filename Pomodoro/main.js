
const tasks = []; //array que almacenará las tareas creadas
let time = 0;  //variable para llevar el seguimiento del tiempo restante en segundos

//timer y timerBreak son variables para almacenar los intervalos de tiempo utilizados para contar el tiempo
let timer = null;  
let timerBreak = null;
let current = null;  //variable que almacenará el ID de la tarea actualmente en progreso

//bAdd, itTask, form, y taskName son referencias a elementos del DOM usando el método querySelector para acceder a los elementos HTML con los ID correspondientes.
const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");


//Se llama a las funciones renderTime() y renderTasks() para inicializar la visualización del tiempo y las tareas en el DOM.
renderTime();
renderTasks();


//Se agrega un event listener al formulario con el ID form que escucha el evento de envío (submit).
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Cuando el formulario se envía, se ejecuta una función anónima que previene el comportamiento por defecto del formulario, crea una nueva tarea usando el valor ingresado en el campo de entrada con el ID itTask, limpia el campo de entrada y vuelve a renderizar las tareas actualizadas.
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});

//Se definen varias funciones para crear tareas, renderizar tareas, manejar los botones de inicio de tarea, contar el tiempo y marcar tareas como completadas.


// crea una nueva tarea con un ID generado aleatoriamente y la agrega al principio del array tasks.
function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

// La función renderTasks() toma las tareas del array tasks y las convierte en elementos HTML que se agregan al DOM en el elemento con el ID tasks. Además, agrega event listeners a los botones de inicio de tarea que permiten iniciar una tarea cuando se hace clic en ellos.
function renderTasks() {
  const html = tasks.map((task) => {
    return `
        <div class="task">
            <div class="completed">
            ${
              task.completed
                ? `<span class="done">Done</span>`
                : `<button class="start-button" data-id="${task.id}">Start</button>`
            }</div>        
            <div class="title">${task.title}</div>
          </div>
        `;
  });

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!timer) {
        const id = button.getAttribute("data-id");
        startButtonHandler(id);
        button.textContent = "In progress...";
      }
    });
  });
}

//La función startButtonHandler(id) maneja el inicio de una tarea. Establece el tiempo restante para la tarea en 2 segundos, almacena el ID de la tarea actual en la variable current, actualiza la visualización del nombre de la tarea en el DOM, y crea un intervalo de tiempo (timer) que ejecuta la función timeHandler(id) cada segundo.
function startButtonHandler(id) {
  time = 2;
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  taskName.textContent = tasks[taskIndex].title;

  timer = setInterval(() => {
    timeHandler(id);
  }, 1000);
}

//La función timeHandler(id) maneja la cuenta regresiva del tiempo para la tarea actual. Resta 1 segundo del tiempo restante, actualiza la visualización del tiempo en el DOM usando la función renderTime(), y si el tiempo restante llega a 0, se borra el intervalo de tiempo (timer), se marca la tarea como completada usando la función markCompleted(id), se vuelve a renderizar las tareas actualizadas, y se llama a la función startBreak() para iniciar el tiempo de descanso.
function timeHandler(id) {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTasks();
    startBreak();
  }
}


// La función startBreak() inicia un nuevo tiempo de descanso de 1 minuto (60 segundos), actualiza la visualización del nombre de la tarea en el DOM como "Break", y crea un intervalo de tiempo (timerBreak) que ejecuta la función timerBreakHandler() cada segundo.
function startBreak() {
  time = 1 * 60;
  taskName.textContent = "Break";
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
}


//La función timerBreakHandler() maneja la cuenta regresiva del tiempo de descanso. Resta 1 segundo del tiempo restante, actualiza la visualización del tiempo en el DOM usando la función renderTime().
function timerBreakHandler() {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTasks();
    startBreak();
  }
}

//La función renderTime() es responsable de mostrar la hora actual en minutos y segundos en forma de una cadena de texto.
function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}


function markCompleted(id) {
  //marca una tarea como completada en el arreglo tasks.
  //findIndex() encuentra el índice del objeto de la tarea que tenga una propiedad id coincidente. Una vez que se encuentra el índice, la propiedad completed del objeto de la tarea en ese índice se establece en true, lo que indica que la tarea está completada.
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true;
}
