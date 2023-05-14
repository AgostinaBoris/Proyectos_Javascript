const tiempo = {
    segundos:{
        valor: 0,
        limite: 59
    },
    minutos:{
        valor: 0,
        limite: 59
    },
    horas:{
        valor: 0,
        limite: 23
    }
};

const botonesAumentar = document.querySelectorAll('.bAumentar');
const botonesDisminuir = document.querySelectorAll('.bDisminuir');

const bIniciar = document.querySelector('#bIniciar');
const bDetener= document.querySelector('#bDetener');
const bReiniciar = document.querySelector('#bReiniciar');

let contador;

//eventos para botones
botonesAumentar.forEach(bAumentar =>{
    bAumentar.addEventListener('click', e=>{
        const unidad = e.target.getAttribute('data-unidad');
        incrementar(unidad);
    });
});

botonesDisminuir.forEach(bDisminuir =>{
    bDisminuir.addEventListener('click', e=>{
        const unidad = e.target.getAttribute('data-unidad');
         disminuir(unidad);
    });
});

bIniciar.addEventListener('click', iniciarCuenta);
bDetener.addEventListener('click', detenerCuenta);
bReiniciar.addEventListener('click', e=>{
    detenerCuenta();
    tiempo.segundos.valor = 0;
    tiempo.minutos.valor = 0;
    tiempo.horas.valor = 0;
    pintarInterfaz();
});


function incrementar(unidad){
    if(tiempo[unidad].valor +1 <= tiempo[unidad].limite){
        tiempo[unidad].valor++;
    }
    pintarInterfaz();
}

function disminuir(unidad){
    if(tiempo[unidad].valor -1 >= 0){
    tiempo[unidad].valor--;
    }
    pintarInterfaz();
}

function pintarInterfaz(){
    const horas = document.querySelector('#horas .numero');
    const minutos = document.querySelector('#minutos .numero');
    const segundos = document.querySelector('#segundos .numero');

    horas.textContent = `0${tiempo.horas.valor}`.slice(-2);
    minutos.textContent = `0${tiempo.minutos.valor}`.slice(-2);
    segundos.textContent = `0${tiempo.segundos.valor}`.slice(-2);
}


function iniciarCuenta(){
    contador = setInterval(() => {
        const{horas, minutos, segundos} = tiempo;

        if(horas.valor === 0 && minutos.valor === 0 && segundos.valor === 0){
            detenerCuenta();
        }else if(segundos.valor === 0){
            if(minutos.valor === 0){
                if(horas.valor === 0){

                }else{
                    tiempo.minutos.valor = tiempo.minutos.limite;
                    tiempo.segundos.valor = tiempo.segundos.limite;
                    disminuir('horas');
                }
            }else{
                tiempo.segundos.valor = tiempo.segundos.limite;
                disminuir('minutos');
            }

        }else{
            disminuir('segundos');
        }
    }, 500);
};


function detenerCuenta(){
    clearInterval(contador);
}