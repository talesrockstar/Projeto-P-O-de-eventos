const form = document.getElementById("every-form");
let eventoAtual = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("every-title").value.trim();
    const descricao = document.getElementById("every-description").value.trim();
    const inicio = document.getElementById("inicio").value.trim();
    const fim = document.getElementById("Data e Hora de Término").value.trim();
    const endereco = document.getElementById("every-location").value.trim();
    const nomeLocal = document.getElementById("nome-location").value.trim();
    const cep = document.getElementById("CEP-location").value.trim();
    const cidade = document.getElementById("every-city").value.trim();
    const estado = document.getElementById("every-estado").value.trim();
    const tipo = document.getElementById("tipo").value;
    const participantes = document.getElementById("participantes").value.trim();
    const imagemInput = document.getElementById("every-image");
    
    if(!titulo || !descricao || !inicio || !fim || !endereco || !nomeLocal || !cidade || !estado){
        exibirMensagemErro("Preencha todos os campos obrigatórios.");
        return;
    }

    if(new Date(inicio) > new Date(fim)){
        exibirMensagemErro("A data de término deve ser posterior à data de início.");
        return;
    }

    if(participantes && (isNaN(participantes) || participantes <= 0)){
        exibirMensagemErro("Número de participantes deve ser um número positivo.");
        return;
    }

    // Capturar a imagem
    let imagemSrc = '';
    if (imagemInput.files && imagemInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagemSrc = e.target.result;
            salvarEvento(imagemSrc);
        };
        reader.readAsDataURL(imagemInput.files[0]);
    } else {
        salvarEvento(imagemSrc);
    }

    function salvarEvento(imagem) {
        const evento = {
            id: Date.now(), // ID único baseado no timestamp
            titulo: titulo,
            descricao: descricao,
            inicio: inicio,
            fim: fim,
            endereco: endereco,
            nomeLocal: nomeLocal,
            cep: cep,
            cidade: cidade,
            estado: estado,
            tipo: tipo,
            participantes: participantes,
            imagem: imagem,
            dataCriacao: new Date().toISOString()
        };

        // Salvar no localStorage
        let eventos = JSON.parse(localStorage.getItem('eventos')) || [];
        eventos.push(evento);
        localStorage.setItem('eventos', JSON.stringify(eventos));

        eventoAtual = evento;
        form.reset();
        document.getElementById('preview').src = '';
        document.getElementById('preview').style.display = 'none';

        exibirMensagemSucesso("Evento criado com sucesso!");
        
        // Redirecionar para a página inicial após 2 segundos
        setTimeout(() => {
            window.location.href = 'index-logado.html';
        }, 2000);
    }
});

function exibirMensagemErro(mensagem) {
    const mensagemErro = document.querySelector(".mensagem.erro");
    if (mensagemErro) {
        mensagemErro.querySelector("p").textContent = mensagem;
        mensagemErro.style.display = "block";
        setTimeout(() => {
            mensagemErro.style.display = "none";
        }, 4000);
    }
}

function exibirMensagemSucesso(mensagem) {
    const mensagemSucesso = document.querySelector(".mensagem.sucesso");
    if (mensagemSucesso) {
        mensagemSucesso.querySelector("p").textContent = mensagem;
        mensagemSucesso.style.display = "block";
        setTimeout(() => {
            mensagemSucesso.style.display = "none";
        }, 4000);
    }
}

// Adicionar eventos de fechar para as mensagens
document.querySelectorAll('.mensagem .close').forEach(button => {
    button.addEventListener('click', function() {
        this.parentElement.style.display = 'none';
    });
});

// Preview da imagem
document.getElementById('every-image').addEventListener('change', function () {
    const file = this.files[0];
    const preview = document.getElementById('preview');
    const quadrado = document.querySelector('.quadrado');

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';
            
            // Atualizar o quadrado com a imagem
            quadrado.innerHTML = `<img src="${e.target.result}" alt="Imagem do Evento" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
        }
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
        // Restaurar o quadrado original
        quadrado.innerHTML = `
            <svg width="70" height="70" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="white" stroke-width="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="white"/>
                <path d="M21 15L16 10L5 21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span class="plus-icon">+</span>
        `;
    }
});