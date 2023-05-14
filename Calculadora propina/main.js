
const itPersonas = el('#personas');
const itTotal = el('#total');
const itPropina = el('#propina');
const bGenerar = el('#bgenerar');
const resultados = el('#resultados');
const summary = el('#summary');

let propinas = [];

let personas;  //numero de personas
let total;     //total de la cuenta
let totalPorPersona;   //cuanto paga cada persona
let porcentajePropina;  // % adicional a la cuenta
let propinaPorPersona;  //% de propina / no. personas
let totalConPropina;   // total + % de propina

bGenerar.addEventListener('click', e =>{
    calcular();
    propinas = [];

    for(let i=1; i <= personas; i++){
        const subtotal = totalPorPersona + propinaPorPersona;
        const persona = {
            id: i,
            consumo: totalPorPersona,
            propina: propinaPorPersona,
            total: subtotal,
            pagado: false
        };

        propinas.push(persona);
    }
    render();
});


function calcular(){
    personas = parseInt(itPersonas.value);
    total = parseInt(itTotal.value);
    totalPorPersona = total/personas;
    porcentajePropina = parseFloat(itPropina.value / 100);
    propinaPorPersona = totalPorPersona * porcentajePropina;
    totalConPropina = total + (total * porcentajePropina);

    console.log(personas, total, totalPorPersona, porcentajePropina, totalConPropina);
}

function render(){
    summary.innerHTML =`<h2>Total a pagar: $${totalConPropina.toFixed(2)}</h2>`;
    summary.innerHTML += `<h2>Propina total: $${(propinaPorPersona * personas).toFixed(2)}</h2>`;

    let html = '';

    propinas.forEach(persona =>{
        const { id, consumo, propina, total, pagado } = persona;

        html += `
                <div class="persona ${pagado? 'pagado' : ''}" data-id="${id}">
                <h3>Persona ${id}</h3>
                <div class="consumo">Consumo: $${consumo.toFixed(2)}</div>
                <div class="propina">Propina: $ ${propina.toFixed(2)}</div>
                <div class="total">Total: $ ${total.toFixed(2)}</div>
                <div class="check"><input type="checkbox" ${pagado? 'checked' : ''}>Pagado</div>
                </div>
            `;
     });

     resultados.innerHTML = html;

     els('input[type=checkbox]').forEach(checkbox =>{
        checkbox.addEventListener('click', e =>{
            const id= e.target.parentElement.parentElement.getAttribute('data-id');
            const index = propinas.findIndex(item => item.id == id);
            const persona = propinas[index];
            console.log(persona);
            persona.pagado = e.target.checked;
            pagar();
        });
     });
}

function pagar(){
    const noPagados = propinas.filter(x => x.pagado === false);
    const nuevoTotal = noPagados.reduce((acc, item) => acc += item.total, 0);
    totalConPropina = nuevoTotal;

    personas = noPagados.length;
    render();
}

function el(selector){
    return document.querySelector(selector);
}

function els(selector){
    return document.querySelectorAll(selector);
}