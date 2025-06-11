function carregarEventosAgenda() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    
    if (eventos.length === 0) return;
    
    const agora = new Date();
    const eventosFuturos = [];
    const eventosAndamento = [];
    const eventosRealizados = [];
    
    eventos.forEach(evento => {
        const dataInicio = new Date(evento.inicio);
        const dataFim = new Date(evento.fim);
        
        if (dataInicio > agora) {
            eventosFuturos.push(evento);
        } else if (dataInicio <= agora && dataFim >= agora) {
            eventosAndamento.push(evento);
        } else {
            eventosRealizados.push(evento);
        }
    });
    
    adicionarEventosNaSecao('.carrossel1', eventosFuturos);
    adicionarEventosNaSecao('.carrossel2', eventosAndamento);
    adicionarEventosNaSecao('.carrossel3', eventosRealizados);
}

function adicionarEventosNaSecao(seletor, eventos) {
    const container = document.querySelector(seletor);
    if (!container) return;
    
    eventos.forEach(evento => {
        const cardHTML = criarCardEventoAgenda(evento);
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

function criarCardEventoAgenda(evento) {
    const dataInicio = new Date(evento.inicio);
    const dataFim = new Date(evento.fim);
    
    const formatarDataAgenda = (dataInicio, dataFim) => {
        const opcoes = { day: 'numeric', month: 'long' };
        const inicio = dataInicio.toLocaleDateString('pt-BR', opcoes);
        const fim = dataFim.toLocaleDateString('pt-BR', opcoes);
        return `${inicio} - ${fim}`;
    };
    
    const dataFormatada = formatarDataAgenda(dataInicio, dataFim);
    
    const imagemSrc = evento.imagem || 'src/img/patati.svg';
    
    const local = `${evento.cidade}, ${evento.estado}`;
    
    return `
        <div class="card" onclick="abrirDetalhesEvento(${evento.id})">
            <img src="${imagemSrc}" class="card-img-top" alt="imagem ${evento.titulo}">
            <div class="card-body">
                <p id="Local">${local}</p>
                <p id="Nome_evento">${evento.titulo}</p>
                <p id="Tipo_evento">${evento.tipo}</p>
                <p id="Data_evento">${dataFormatada}</p>
            </div>
        </div>
    `;
}

function abrirDetalhesEvento(eventoId) {
    localStorage.setItem('eventoSelecionado', eventoId);
    window.location.href = 'comprar.html';
}

document.addEventListener('DOMContentLoaded', carregarEventosAgenda);

