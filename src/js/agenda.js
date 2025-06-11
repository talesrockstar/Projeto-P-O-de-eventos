let carrossel1 = document.querySelector('.carrossel1');

const inputstatus = document.getElementById('StatusSelect');
const inputlocal = document.querySelector('#StatusLocal');
const inputtipo = document.getElementById('Tipo');
const cards = document.querySelectorAll('.card');
const futuro = document.querySelector('.futuros');
const andamento = document.querySelector('.andamento');
const  realizado = document.querySelector('.realizados');                        


inputlocal.addEventListener('change', function () {
    let valorlocal = inputlocal.value;
    resetFilter();
    filtrarlocal(valorlocal);
});

inputstatus.addEventListener('change', function () {
    let valorstatus = inputstatus.value;
    console.log(valorstatus);
    if (valorstatus == 1) {
        resetFiltrarStatus();
        andamento.style.display = 'none';
        realizado.style.display = 'none';
    }
    if (valorstatus == 2) {
        resetFiltrarStatus();
        futuro.style.display = 'none';
        realizado.style.display = 'none';
    }
    if (valorstatus == 3) {
        resetFiltrarStatus();
        futuro.style.display = 'none';
        andamento.style.display = 'none';
    }
    if (valorstatus == 0) {
        resetFiltrarStatus()
    }
});

inputtipo.addEventListener('change', function () {
    let valortipo = inputtipo.value;
    resetFilter();
    console.log(valortipo);
    filtrartipo(valortipo);
});

function filtrarlocal(x) {
    
    if (x == 1) {
        cards.forEach((card) => {
            if (!card.innerText.includes('São Paulo, SP')) {
                card.style.display = 'none';
            }
        })
    }
    if (x == 2) {
        cards.forEach((card) => {
            if (!card.innerText.includes('Natal, RN')) {
                card.style.display = 'none';
            }
        })
    }
    if (x == 3) {
        cards.forEach((card) => {
            if (!card.innerText.includes('Salvador, BA')) {
                card.style.display = 'none';
            }
        })
    }

    if (x == 0) {
        resetFiltrer();
    }
    
};

function filtrartipo(x) {
    if (x == 1) {
        cards.forEach((card) => {
            if (!card.innerText.includes('Show')) {
                card.style.display = 'none';
            }
        })
    }
    if (x == 2) {
        cards.forEach((card) => {
            if (!card.innerText.includes('Peça')) {
                card.style.display = 'none';
            }
        })
    }
    if (x == 3) {
        cards.forEach((card) => {
            if (!card.innerText.includes('Musical')) {
                card.style.display = 'none';
            }
        })
    }
    if (x == 4) {
        cards.forEach((card) => {
            if (!card.innerText.includes('Stand-UP')) {
                card.style.display = 'none';
            }
        })
    }
    if (x == 5) {
        cards.forEach((card) => {
            if (!card.innerText.includes('Infantil')) {
                card.style.display = 'none';
            }
        })
    }
    if (x == 0) {
        resetFilter();
    }
}

function resetFilter() {
    cards.forEach((card) => {
        card.style.display = 'block';
    });
}

function resetFiltrarStatus() {
    futuro.style.display = 'block';
    andamento.style.display = 'block';
    realizado.style.display = 'block';
}

// futuro.innerHTML += `<div class="card">
//                             <img src="src/img/patati.svg" alt="imagem patati patata evento">
//                             <div class="card-body">
//                                 <p id="Local">Natal, RN</p>
//                                 <p id="Nome_evento">Patati circo show</p>
//                                 <p id="Tipo_evento">Infantil</p>
//                                 <p id="Data_evento">21 de maio - 25 de maio</p>
//                             </div>
//                         </div>`



