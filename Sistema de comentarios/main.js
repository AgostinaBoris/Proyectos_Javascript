//se crea una seccion de comentarios que permite a los usuarios escribir comentarios y respuestas a los comentarios existentes.

//arreglo vacio
const comments = [];
//se seleccionan elementos del dom y se agrega un campo de entrada de texto y un contenedor de comentarios.
const inputContainer = document.createElement("div");
const input = document.createElement("input");
input.classList.add("input");
const commentsContainer = document.querySelector("#comments-container");

commentsContainer.appendChild(inputContainer);
inputContainer.appendChild(input);
//evento de teclado para detectar cuando el usuario presiona tecla Enter.
input.addEventListener("keydown", (e) => {
//se llama a handleEnter
  handleEnter(e, null);
});

function handleEnter(e, current) {
  //si se ingreso un comentario se crea un nuevo objeto de comentario
  if (e.key === "Enter" && e.target.value != "") {
    const newComment = {
      text: e.target.value,
      likes: 0,
      responses: [],
    };
    if (current === null) {
      //se agrega el nuevo objeto al arreglo comments
      comments.unshift(newComment);
    } else {
      current.responses.unshift(newComment);
    }
    e.target.value = "";
    commentsContainer.innerHTML = "";
    commentsContainer.appendChild(inputContainer);
    renderComments(comments, commentsContainer);
  }
}

function renderComments(arr, parent) {
  //funcion que crea y muestra html para cada comentario
  //Recorre el arreglo de comentarios y crea un contenedor de comentarios para cada elemento del arreglo
  arr.forEach((element) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");

    const responsesContainer = document.createElement("div");
    responsesContainer.classList.add("responses-container");

    const replyButton = document.createElement("button");
    const likeButton = document.createElement("button");

    //agrega un boton reply y like a cada contenedor de comentarios
    replyButton.textContent = "Reply";
    likeButton.textContent = "Like";
    replyButton.addEventListener("click", (e) => {
      //cuando se hace click en el boton reply se clona el campo de entrada de texto
      //y se lo agrega al contenedor de comentarios con los botones reply y like.
      const newInput = inputContainer.cloneNode(true);
      newInput.value = "";
      newInput.focus();
      newInput.addEventListener("keydown", (e) => {
        handleEnter(e, element);
      });
      //agrega un contenedor para las respuestas a ese comentario.
      commentContainer.insertBefore(newInput, responsesContainer);
    });


    likeButton.addEventListener("click", (e) => {
      //cuando se hace click a like, se actualiza el numero de likes 
      //y el texto del boton like.
      element.likes++;
      likeButton.textContent = `${
        element.likes > 0 ? element.likes : ""
      } Likes`;
    });
    const divContent = document.createElement("div");
    divContent.textContent = element.text;
    const divActions = document.createElement("div");
    //commentContainer.appendChild(document.createTextNode(element.text));
    commentContainer.appendChild(divContent);
    commentContainer.appendChild(divActions);
    divActions.appendChild(replyButton);
    divActions.appendChild(likeButton);
    commentContainer.appendChild(responsesContainer);
    if (element.responses.length > 0) {
      //si el comentario tiene respuestas la funcion se llama a si misma (RECURSION) 
      //para agregar las respuestas al cotnenedor correspondiente
      renderComments(element.responses, responsesContainer);
    }
    parent.appendChild(commentContainer);
  });
}
