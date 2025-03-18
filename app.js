// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let amigos = []; // Inicialización del array fuera de la función para persistencia

document.getElementById('amigo').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});

function agregarAmigo() {
    const input = document.getElementById('amigo');
    const nombre = input.value.trim(); 

    if (!nombre) { 
        return; 
    }

    input.value = ''; 

    if (amigos.includes(nombre)) {
        alert("Este nombre ya ha sido agregado. ¡Intenta otra vez!");
        return; 
    }

    amigos.push(nombre); 
    actualizarLista(); 
    actualizarBotonSortear(); 
}

function actualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; 

    if (amigos.length === 0) { 
        const li = document.createElement('li');
        li.textContent = "No hay amigos agregados.";
        lista.appendChild(li);
        return; 
    }

    amigos.forEach((amigo, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${amigo}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'x';
        botonEliminar.classList.add('btn-eliminar');
        botonEliminar.ariaLabel = `Eliminar amigo ${amigo}`;
        botonEliminar.addEventListener('click', () => eliminarAmigo(index)); 

        li.appendChild(botonEliminar);
        lista.appendChild(li);
    });
}

function eliminarAmigo(indice) {
    if (!isNaN(indice) && indice >= 0 && indice < amigos.length) { 
        if (confirm("¿Seguro que deseas eliminar este amigo?")) {
            amigos.splice(indice, 1);
            actualizarLista();
            actualizarBotonSortear(); 
        }
    } else {
        console.error("No hay amigo en el índice :", indice); 
    }
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Se necesitan al menos 2 amigos para iniciar sorteo");
        return; 
    }

    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio]; 
    amigos.splice(indiceAleatorio, 1); 

    const resultadoLista = document.getElementById('resultado');
    resultadoLista.innerHTML = ''; 
    const li = document.createElement('li');
    li.textContent = amigoSorteado;
    resultadoLista.appendChild(li);

    actualizarLista(); 
    actualizarBotonSortear(); 
}

function reiniciarAplicacion() {
    if (confirm("¿Seguro que deseas reiniciar la aplicación?")) {
        amigos = []; 
        actualizarLista(); 
        document.getElementById('resultado').innerHTML = ''; 
        actualizarBotonSortear(); 
    }
}

function actualizarBotonSortear() {
    const botonSortear = document.getElementById('sortear'); 
    if (botonSortear) { 
        botonSortear.disabled = amigos.length < 2; 
    }
}

actualizarBotonSortear();