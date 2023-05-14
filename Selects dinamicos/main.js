const data= {
    paises: ['Argentina', 'Italia', 'Mexico'],

    estados:{
        Argentina:['Catamarca', 'BA'],
        Italia:['Florencia', 'Roma'],
        Mexico:['DF', 'Oaxaca']
    },

    distritos:{
        Catamarca:['Chumbicha', 'Capital', 'Belén'],
        BA:['CABA', 'Bahia Blanca', 'La Plata'],
        Florencia: ['Fiesole', 'Pelago', 'Vinci'],
        Roma: ['Poli', 'Riano', 'Nemi'],
        DF:['Alvaro Obregon', 'Polanco', 'Cuajimalpa'],
        Oaxaca:['Tuxtepec', 'Mixtle', 'Ocotan']
    }
};

const paises = document.querySelector('#paises');
const estados = document.querySelector('#estados');
const distritos = document.querySelector('#distritos');

paises.innerHTML = '';

llenarSelect(paises, data.paises);

paises.addEventListener('change', e=>{
    const pais = e.target.value;
    if(pais == '') return false;

    const estados = data.estados[pais];

    llenarSelect(this.estados, estados);

});


estados.addEventListener('change', e =>{
    const estado = e.target.value;
    if(estado == '') return false;

    const distritos = data.distritos[estado];
    llenarSelect(this.distritos, distritos);
});


distritos.addEventListener('change', e =>{
    console.log(e.target.value);
});



function llenarSelect(elemento, data){
    elemento.innerHTML = '';
    const empty= document.createElement('option');
    elemento.add(empty);

    data.forEach(item =>{
        const opcion = document.createElement('option');
        opcion.text = item;
        opcion.value = item;

        elemento.add(opcion);
    });
}