//codigo crea una lista de etiquetas dinamica en la que el ususario puede agregar o eliminar etiquetas.

//inicializa un arreglo vacio y se crea un contenedor para el campo de entrada de etiquetas inputTagContainer.
let tags = [];
const inputTagContainer = document.querySelector("#input-tag");
const tagsContainer = document.createElement("div");
//elemento span editable
const inputTag = document.createElement("span");

inputTag.ariaRoleDescription = "textbox";
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

inputTagContainer.classList.add("input-tag-container");
tagsContainer.classList.add("tag-container");

inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

//se agrega evento click al contenedor de entrada de etiquetas para que si el usuario hace clic fuera del campo de entrada, este vuelva a enfocarse.
inputTagContainer.addEventListener("click", (e) => {
  if (
    e.target.id === "input-tag" ||
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus();
  }
});

//se agrega evento de teclado keydown a inputTag para detectar cuando se presiona la tecla Enter o Backspace. Si se presiona la tecla "Enter" y el contenido del campo de entrada de etiquetas no está vacío, se llama a la función existTag para verificar si ya existe una etiqueta con el mismo valor que el contenido del campo de entrada. Si no existe, se agrega el valor del campo de entrada al arreglo tags y se llama a la función renderTags para actualizar la lista de etiquetas.
// Si se presiona la tecla "Backspace" y el campo de entrada de etiquetas está vacío y hay etiquetas en el arreglo tags, se llama a la función removeTag para eliminar la última etiqueta en el arreglo tags.
inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTag.textContent !== "") {
    e.preventDefault();
    //valido si existe o no una etiqueta
    if (!existTag(inputTag.textContent)) {
      //si no existe agrego la etiqueta
      tags.push(inputTag.textContent);
      inputTag.textContent = "";
      renderTags();

    } 
  }else if (
      e.key === "Backspace" &&
      inputTag.textContent === "" &&
      tags.length > 0
    ) {
      tags.pop();
      renderTags();
    }
});

function renderTags() {
  //se encarga de actualizar el contenido del contenedor de etiquetas (tagsContainer) cada vez que se agrega o se elimina una etiqueta. 
  tagsContainer.innerHTML = "";
  const html = tags.map((tag) => {
    const tagElement = document.createElement("div");
    const tagButton = document.createElement("button");

    tagElement.classList.add("tag-item");
    tagButton.textContent = "X";
    tagButton.addEventListener("click", (e) => {
      //eliminar etiqueta
      removeTag(tag);
    });
    tagElement.appendChild(document.createTextNode(tag));
    tagElement.appendChild(tagButton);
    return tagElement;
  });

  html.forEach((element) => {
    tagsContainer.appendChild(element);
  });
  tagsContainer.appendChild(inputTag);
  inputTag.focus;
}

function existTag(value) {
  //verifica si una etiqueta con un valor determinado ya existe en el arreglo tags. Si la encuentra, devuelve true; de lo contrario, devuelve false
  return tags.includes(value);
}

function removeTag(value) {
  //elimina una etiqueta del arreglo tags y llama a la función renderTags para actualizar la lista de etiquetas.
  tags = tags.filter((tag) => tag !== value);
  renderTags();
}
