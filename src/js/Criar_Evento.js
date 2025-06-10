const form = document.getElementById("every-form");
const display = document.getElementById("evento-display");
let eventoAtual = null;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const inicio = document.getElementById("inicio").value.trim();
    const fim = document.getElementById("fim").value.trim();

    if(!titulo || !descricao || !inicio || !fim){
        exibirMensagemErro("Preencha os campos obrigatórios: título, descrição, inicio e fim.");
        return;
    }

    if(new Date(inicio) > new Date(fim)){
        exibirMensagemErro("A data de término deve ser posterior a data de início.");
        return;
    }

    const capacidade = document.getElementById("capacidade").value.trim();
    if(capacidade && (isNaN(capacidade)|| capacidade <= 0)){
        exibirMensagemErro("Capacidade deve ser um numero positivo.");
        return;
    }

    const evento = {
        titulo: titulo,
        descricao: descricao,
        inicio: inicio,
        fim: fim,
        local: document.getElementById("local").value,
        imagem: document.getElementById("preview").src,
        tipo: document.getElementById("tipo").value,
        capacidade: capacidade,
    };

    eventoAtual = evento;
    renderEvento();
    form.reset();

    document.getElementById('preview').src = '';
    document.getElementById('preview').style.display = 'none';

    exibirMensagemSucesso("Evento criado com sucesso!");
});

function renderEvento() {
    if (!eventoAtual) return;

    display.innerHTML = `
        <div class="evento-detalhes">
            <h2>${eventoAtual.titulo}</h2>
            <p><strong>Descrição:</strong> ${eventoAtual.descricao}</p>
            <p><strong>Início:</strong> ${eventoAtual.inicio}</p>
            <p><strong>Término:</strong> ${eventoAtual.fim}</p>
            <p><strong>Local:</strong> ${eventoAtual.local}</p>
            <p><strong>Tipo:</strong> ${eventoAtual.tipo}</p>
            <p><strong>Capacidade:</strong> ${eventoAtual.capacidade} participantes</p>
            ${eventoAtual.imagem ? `<img src="${eventoAtual.imagem}" alt="Imagem do evento" />` : ""}
            <div class="action-buttons">
                <button onclick="editarEvento()">Editar</button>
                <button class="delete" onclick="excluirEvento()">Excluir</button>
            </div>
        </div>
    `;
}

function editarEvento() {
    if (!eventoAtual) return;

    document.getElementById("titulo").value = eventoAtual.titulo;
    document.getElementById("descricao").value = eventoAtual.descricao;
    document.getElementById("inicio").value = eventoAtual.inicio;
    document.getElementById("fim").value = eventoAtual.fim;
    document.getElementById("local").value = eventoAtual.local;
    document.getElementById("preview").src = eventoAtual.imagem;
    document.getElementById("preview").style.display = 'block';
    document.getElementById("tipo").value = eventoAtual.tipo;
    document.getElementById("capacidade").value = eventoAtual.capacidade;

    display.innerHTML = "";
}

function excluirEvento() {
    eventoAtual = null;
    display.innerHTML = "";
    exibirMensagemErro("Evento excluído.");
}

document.getElementById("toggle-mensagens").addEventListener("click", function () {
    const mensagens = document.querySelectorAll(".mensagem.erro, .mensagem.sucesso");

    if (mensagens.length === 0) {
        alert("Nenhuma mensagem para exibir.");
        return;
    }

    mensagens.forEach(el => {
        if (el.style.display === "none") {
            el.style.display = "block";
            this.textContent = "Ocultar Mensagens de Sucesso/Erro";
        } else {
            el.style.display = "none";
            this.textContent = "Mostrar Mensagens de Sucesso/Erro";
        }
    })
});

function exibirMensagemErro(mensagem) {
    const mensagemErro = document.createElement("div");
    mensagemErro.className = "mensagem erro";
    mensagemErro.innerText = mensagem;
    document.body.appendChild(mensagemErro);
    setTimeout(() => {
        mensagemErro.remove();
    }, 4000);
}

function exibirMensagemSucesso(mensagem) {
    const mensagemSucesso = document.createElement("div");
    mensagemSucesso.className = "mensagem sucesso";
    mensagemSucesso.innerText = mensagem;
    document.body.appendChild(mensagemSucesso);
    setTimeout(() => {
        mensagemSucesso.remove();
    }, 4000);
}

document.getElementById('every-image').addEventListener('change', function () {
    const file = this.files[0];
    const preview = document.getElementById('preview');
    const quadrado = document.querySelector('.quadrado');

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            preview.src = e.target.result;
            preview.style.display = 'block';

            quadrado.innerHTML = '';
            const img = document.createAttribute('img');
            img.src = e.target.result;
            img.alt = 'Imagem do Evento';
            img.className = 'imagem-evento';
            quadrado.appendChild(img);
            }
        reader.readAsDataURL(file);
    } else {
        preview.src = '';
        preview.style.display = 'none';
    }
});
const input = document.getElementById('inputImagem');
const imagem = document.getElementById('imagem');

  input.addEventListener('change', function(event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
      const leitor = new FileReader();

      leitor.onload = function(e) {
        imagem.src = e.target.result; 
      }

      leitor.readAsDataURL(arquivo); 
    }
  })
document.getElementById('every-image').addEventListener('Click', function(){
    const preview = document.getElementById('preview');
    preview.src = '';
    preview.style.display = 'none';
    const quadrado = document.querySelector('.quadrado');
    quadrado.innerHTML = '';
    quadrado.style.display = 'none';
    document.getElementById('every-image').value = '';
});