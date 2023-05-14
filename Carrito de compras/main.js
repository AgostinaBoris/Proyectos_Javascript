//objeto db con propiedades methods e items
const db = {
  // methods es un objeto que tiene dos metodos. find y remove.
  //Find recibe un id y busca en el arreglo "db.items" un objeto cuyo id coincida con el argumento recibido.
  //si encuentra un objeto con ese id, lo devuelve. de lo contrario devuelve undef.
  methods: {
    find: (id) => {
      return db.items.find((item) => item.id === id);
    },

    //remove recibe un arreglo de objetos items cada uno con un id y una qty.
    //Para cada objeto en el arreglo, busca el objeto correspondiente en el arreglo db.items con el metodo find y le resta la cantidad del objeto item a la propiedad qty.
    remove: (items) => {
      items.forEach((item) => {
        const product = db.methods.find(item.id);
        product.qty = product.qty - item.qty;
      });

      console.log(db);
    },
  },

  //items es un arreglo de objetos.
  //representa los articulos a la venta.cada objeto tiene propiedades como id, title, price y qty(cantidad).
  items: [
    {
      id: 0,
      title: "Funko Pop",
      price: 250,
      qty: 5,
    },
    {
      id: 1,
      title: "Harry Potter",
      price: 345,
      qty: 50,
    },
    {
      id: 2,
      title: "Phillips Hue",
      price: 2222,
      qty: 80,
    },
    {
      id: 3,
      title: "iPod",
      price: 6300,
      qty: 90,
    },
  ],
};

//objeto con propiedad items y un conjunto de metodos para manipular y consultar la lista de articulos en el carrito de compras.
const shoppingCart = {
  items: [],
  methods: {
    //agrega un producto al carrito de compras eespecificando el id y la cantidad deseada.
    // Si el producto ya esta en el carrito, aumenta la cantidad del producto en lugar de agregarlo de nuevo. Verifica que haya suficiente inventario para agregar la cantidad deseada del producto.
    add: (id, qty) => {
      const cartItem = shoppingCart.methods.get(id);

      if (cartItem) {
        if (shoppingCart.methods.hasInventory(id, qty + cartItem.qty)) {
          cartItem.qty += qty;
        } else {
          alert("No hay inventario suficiente");
        }
      } else {
        shoppingCart.items.push({ id, qty });
      }
    },

    remove: (id, qty) => {
      //elimina un producto del carrito de compras especificando el id y la cantidad deseada.
      //Si qty es menor o igual a la cantidad del producto en el carrito, disminuye la cantidad del procuto en lugar de eliminarlo. De lo contrario, elimina completamente el producto del carrito.
      const cartItem = shoppingCart.methods.get(id);
      //se llama al metodo get para obtener el objeto de cartItem correspondiente al id proporcionado.

      
      if (cartItem.qty - qty >= 0) {
      //se verifica si la cantidad especificada en el parametro qty es menor o igual a la cantidad actual del articulo en el carrito de compras. si es asi, se actualiza la cantidad del articulo en el carrito con la nueva cantidad.
        cartItem.qty = cartItem.qty - qty;
      } else {
        //caso contrario se elimina el articulo del carrito. se usa el metodo filter para crear una nueva matriz de elementos de carrito de compras que no incluya el articulo con el id especificado. 
        //La matriz filtrada se asigna a la propiedad items del objeto shoppingCart.
        shoppingCart.items = shoppingCart.items.filter(
          (item) => item.id !== id
        );
      }
    },

    count: () => {
      //devuelve la cantidad total de productos en el carrito de compras.
      return shoppingCart.items.reduce((acc, item) => acc + item.qty, 0);
    },

    get: (id) => {
      //devuelve el objeto de producto en el carrito correspondiente al id especificado.
      const index = shoppingCart.items.findIndex((item) => item.id === id);
      return index >= 0 ? shoppingCart.items[index] : null;
    },

    
    getTotal: () => {
      //devuelve el costo total de todos los productos en el carrito de compras.
    //Busca el precio del producto en una base de datos usando su id y multiplica el precio por la cantidad en el carrito.
      const total = shoppingCart.items.reduce((acc, item) => {
        const found = db.methods.find(item.id);
        return acc + found.price * item.qty;
      }, 0);
      return total;
    },
    hasInventory: (id, qty) => {
          //verifica que haya suficiente inventario para agregar la cantidad deseada de un producto.
      return db.items.find((item) => item.id === id).qty - qty >= 0;
    },

    purchase: () => {
          //completa la compra, eliminando los productos del carrito de compras y actualizando la base de datos de inventario.
      db.methods.remove(shoppingCart.items);
      shoppingCart.items = [];
    },
  },
};
renderStore();
//renderstore renderiza la tienda en linea en la pantalla
function renderStore() {
  //genera html dinamico para mostrar los elementos de la tienda. utiliza la base de datos db que contiene una lista de articulos

  
  const html = db.items.map((item) => {
    //metodo map para los elementos de db.items que retorna un nuevo array con cada elemnto mapeado a un html que representa un elemento de la tienda.
    return `
            <div class="item">
            <div class="title">${item.title}</div>
            <div class="price">${numberToCurrency(item.price)}</div>
            <div class="qty">${item.qty} units</div>

            <div class="actions">
            <button class="add" data-id="${
              item.id
            }">Add to Shopping Cart</button>
            </div>
            </div>
        `;
    //dentro de cada html genereado por cada elemento hay un titulo, precio y cantidad de unidades disponibles. Tambien se incluye un boton add to shopping cart con el atributo personalizado data-id para identificar el articulo seleccionado.
  });

  
  document.querySelector("#store-container").innerHTML = html.join("");
  //se inserta el html con el metodo innerhtml a la pagina.


  
  document.querySelectorAll(".item .actions .add").forEach((button) => {
    //selecciona todos los botones de "agregar al carrito" en los elementos html con la clase "item" dentro de los elementos html con la clase "actions" usando el metodo 'querySelectorAll' del objeto document. Luego se les asigna a cada boton un evento clic que ejecutara una funcion.
    button.addEventListener("click", (e) => {
      //la funcion que se ejecutara al hacer clic en un boton obtiene el atributo 'data-id' del boton, que se utiliza para buscar el articulo correspondiente en la base de datos 'db' mediante el metodo 'find()' de 'db.methods'. Si el artriculo existe y tiene un inventario disponible para agregar al carrito, se llama al metodo 'add()' del objeto 'shoppingCart' para actualizar la visualizacion del carrito. Si no hay un inventario disponible, se muestra un mensaje en la consola indicando que ya no hay inventario.
      const id = parseInt(button.getAttribute("data-id"));
      const item = db.methods.find(id);

      if (item && item.qty - 1 > 0) {
        //añadir al shoppingCart
        shoppingCart.methods.add(id, 1);
        renderShoppingCart();
      } else {
        console.log("ya no hay inventario");
      }
    });
  });
}

function renderShoppingCart() {
  //esta funcion renderiza el contenido del carrito de compras, usando los datos almacenados en la variable shoppingCart que contiene la informacion de los items añadidos al carrito.

  const html = shoppingCart.items.map((item) => {
    //se itera sobre los items del carrito buscando la informacion detallada de cada uno en la variable 'db' mediante el metodo 'find'.
    const dbItem = db.methods.find(item.id);
    //muestra los detalles de cada item. titulo, precio, cantidad, subtotal, y botones para agregar o quitar un item del carrito.
    return `
            <div class="item">
                <div class="title">${dbItem.title}</div>
                <div class="price">${numberToCurrency(dbItem.price)}</div>
                <div class="qty">${item.qty} units</div>
                <div class="subtotal">
                Subtotal:${numberToCurrency(item.qty * dbItem.price)}
                </div>
                <div class="actions">
                    <button class="addOne" data-id="${item.id}">+</button>
                    <button class="removeOne" data-id="${item.id}">-</button>
                </div>
            </div>
        `;
  });

  //boton para cerrar el carrito
  const closeButton = `
        <div class="cart-hearder">
        <button class="bClose">Close</button>
        </div>
    `;

  //boton para realizar la compra
  const purchaseButton =
    shoppingCart.items.length >= 0
      ? `
        <div class="cart-actions">
        <button class="bPurchase" id="bPurchase">Purchase</button>
        </div>
    `
      : "";

  //se calcula el total de la compra con el emtodo gettotal de la instancia de shoppingCart.
  const total = shoppingCart.methods.getTotal();

  //se crea un contenedor para mostrar el total de la compra con la etiqueta <div class='total'>
  const totalContainer = `<div class="total">Total: ${numberToCurrency(
    total
  )}</div>`;

  //se obtiene una referencia al contenedor que mostrara el carrito de compras mediante querySelector y se le quita la clase 'hide' y se le agrega la clase 'show'.
  const shoppingCartContainer = document.querySelector(
    "#shopping-cart-container"
  );
  shoppingCartContainer.classList.remove("hide");
  shoppingCartContainer.classList.add("show");

  //se establece el contenido html del contenedor, que incluye el boton de cierre, los elementos del carrito, el total de la compra y el boton de compra.
  shoppingCartContainer.innerHTML =
    closeButton + html.join("") + totalContainer + purchaseButton;

  //se agregan escuchadores de eventos a lso botones 'Add One' y 'Remove One' en cada uno de los elementos del carrito de compras. Cada vez que se hace clic a uno de estos botones, se llama al metodo correspondiente de la instancia 'shoppingCart' y se llama a la funcion 'renderShoppingCart()' para actualizar la interfaz de usuario.
  document.querySelectorAll(".addOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.add(id, 1);
      renderShoppingCart();
    });
  });
  document.querySelectorAll(".removeOne").forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = parseInt(button.getAttribute("data-id"));
      shoppingCart.methods.remove(id, 1);
      renderShoppingCart();
    });
  });
  //se agrega un escuchador de eventos al boton 'Close' para ocultar el carrito de compras y se agrega un escuchador de eventos al boton 'Purchase' para procesar la compra llamando al metodo 'Purchase' de la instancia 'shoppingCart'
  document.querySelector(".bClose").addEventListener("click", (e) => {
    shoppingCartContainer.classList.remove("show");
    shoppingCartContainer.classList.add("hide");
  });

  const bPurchase = document.querySelector("#bPurchase");
  if (bPurchase) {
    bPurchase.addEventListener("click", (e) => {
      shoppingCart.methods.purchase();
      //se llama a las funciones 'renderStore()' y renderShoppingCart()' para actualizar la interfaz de usuario.
      renderStore();
      renderShoppingCart();
    });
  }
}

//funcion convierte un numero en un valor de moneda en formato de texto.Representa la cantidad en dolares.
function numberToCurrency(n) {
  //parametro n es el numero que se quiere formatear el bojeto intl.numerformat aplica el formatoa decuado.
  return new Intl.NumberFormat("en-US", {
    //se especifica el tipo de moneda, la cantidad maxima de digitos a mostrar y ele stilo de formato deseado.
    maximumSignificantDigits: 2,
    style: "currency",
    currency: "USD",
  }).format(n);
}
