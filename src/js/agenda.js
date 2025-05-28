const inputstatus = document.getElementById('StatusSelect');
const inputlocal = document.getElementById('StatusLocal');
const tipo = document.getElementById('tipo');


inputlocal.addEventListener('change', function() {
    filtrarlocal(inputlocal);
});

const cards = document.querySelectorAll('.card');

function filtrarlocal(inputlocal){
    cards.forEach((card) => {
    if (card.innerText.includes(inputlocal.value)) {
        card.style.display = 'none';
    }
    });
}





