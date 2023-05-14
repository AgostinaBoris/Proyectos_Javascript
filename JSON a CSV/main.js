const jsonForm = document.querySelector("#jsonform");  
//CAMPO DE TEXTO SE INGRESA EL OBJETO JSON Q SE VA A CONVERTIR
const csvForm = document.querySelector("#csvform");  
//CAMPO DE TEXTO SE LLENARA CON LA CADENA CSV GENERADA
const bConvert = document.querySelector("#bConvert"); 
//BOTON PARA CONVERTIR JSON A CSV


//AGREGO EVENTO CLICK AL BOTON Y SE LLAMA A LA FUNCION CONVERTJSONTOCSV
bConvert.addEventListener("click", (e) => {
  convertJSONtoCSV();
});


//FUNCION ANALIZA EL OBJETO JSON INGRESADO EN EL JSONFORM UTILIZANDO JSON.PARSE.
//SI LA CADENA JSON ES INCORRECTA, SE MUESTRA UNA ALERTA Y SE DETIENE LA FUNCION.
function convertJSONtoCSV() {
  let json;
  let keys = [];
  let values = [];
  try {
    json = JSON.parse(jsonForm.value);
  } catch (error) {
    console.log("Formato incorrecto JSON", error);
    alert("Formato incorrecto JSON");
    return;
  }
//SI EL OBJETO JSON ES UN ARREGLO DE OBJETOS, LA FUNCION CONTINUA CONVIRTIENDOLO A UNA CADENA CSV.

  if (Array.isArray(json)) {
    //algoritmo
    //SE INICIA BUCLE FOREACH Q ITERA CADA OBJETO DEL ARREGLO. EN CADA ITERACION SE OBTIENEN LAS CLAVES DEL OBJETO Y SE VERIFICAN QUE TODAS LAS CLAVES EN LOS OBJETOS DEL ARREGLO SEAN IGUALES.SI LAS CLAVES NO SON IGUALES SE LANZA UN ERROR.
    //SE CREA UNA FILA PARA CADA OBJETO DONDE CADA CELDA DE LA FILA CONTIENE EL VALOR DE LA PROPIEDAD CORRESPONDIENTE EN EL BOJETO. SE AGREGA CADA FILA AL ARREGLO VALUES.
    json.forEach((item) => {
      const nkeys = Object.keys(item);

      if (keys.length === 0) {
        keys = [...nkeys];
      } else {
        if (nkeys.length !== keys.length) {
          throw new Error("Number of keys are different");
        } else {
          console.log("ok", nkeys);
        }
      }

      const row = keys.map((k) => {
        return item[k];
      });
      values.push([...row]);
    });
    console.log(keys, values);
    values.unshift(keys);
    const text = values.map(v => v.join(',')).join('\n');
    csvForm.value = text;
  } else {
    alert("No es un arreglo de objetos");
  }
  //DESPUES DE COMPLETAR EL FOREACH, SE AGREGA LA FILA DE ENCABEZADO AL PRINCIPIO DEL ARREGLO VALUES. LUEGO SE GENERA LA CADENA CSV A PARTIR DE LOS VALORES EN EL ARREGLO VALUES USANDO EL METODO JOIN PARA SEPARAR LOS VALORES CON COMAS Y SALTOS DE LINEA.
  //FINALMENTE SE ASIGNA LA CADENA CSV GENERADA AL CAMPO DE TEXTO CSVFORM EN LA PAGINA WEV. SI EL OBJETO JSON NO ES UN ARREGLO DE OBJETOS SE MUESTRA UNA ALERTA.
}
