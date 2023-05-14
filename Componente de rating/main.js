//se selecciona un contenedor donde se mostrara el rating y se define una variable currentValue que almacenará la calificación actual del usuario, inicialmente en 0. Tambien se define un limite maximo de calificación que es de 10.
const ratingContainer = document.querySelector('.rating');
let currentValue = 0;
const limit = 10;

//se usa array.from para crear un arreglo de 10 elementos y se usa el metodo map para crear un nuevo arreglo con elementos html que representan cada una de las estrellas.
const html = Array.from(Array(limit)).map( (_, i) =>{
    //cada div con clase item es una estrella. y el atributo de datos que indica su posicion en el rating.
    return `<div class="item item-${i}" data-pos="${i}"></div>`
});
//se une el html generado en una cadena con el metodo join.
ratingContainer.innerHTML = html.join('');

//se seleccionan todos los elementos con la clase item y se agrega un listener de evento de raton para cuando se mueve sobre cada estrella.Al mover el raton sobre una estrella, se determina su posición en el rating a traves del atributo de datos
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('mouseover', e =>{
        const pos = item.getAttribute('data-pos');

        if(currentValue === parseInt(pos) + 1){
            return;
        }
        //se verifica si la calificacion actual ya esta ene sa posicion actual y si no es asi se eliminan todas las estrellas que tienen la clase item-full y se agregan la clase item-full a todas las estrellas hasta la posicion actual.

        document.querySelectorAll('.item').forEach(it =>{
            if(it.classList.contains('item-full')){
                it.classList.remove('item-full')
            }
        })

        for(let i = 0; i <= pos; i++){
            const square = document.querySelector(`.item-${i}`);
            if(!square.classList.contains('item-full')){
                square.classList.add('item-full');
            }
        }
        currentValue = parseInt(pos) + 1;
    });
    //listener de evento click en cada estrella, que actualiza la variable currentValue con la posicion de la estrella clickeada y lo muestra en la consola.
    item.addEventListener('click', e =>{
        const pos = item.getAttribute('data-pos');
        currentValue = parseInt(pos) + 1;
        console.log(currentValue)
    });
});



