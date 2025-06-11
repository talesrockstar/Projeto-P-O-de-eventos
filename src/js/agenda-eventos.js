// Função para carregar e exibir eventos na agenda
function carregarEventosAgenda() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    
    if (eventos.length === 0) return;
    
    // Separar eventos por status (futuro, em andamento, realizado)
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
    
    // Adicionar eventos em cada seção
    adicionarEventosNaSecao('.carrossel1', eventosFuturos);
    adicionarEventosNaSecao('.carrossel2', eventosAndamento);
    adicionarEventosNaSecao('.carrossel3', eventosRealizados);
}

// Função para adicionar eventos em uma seção específica
function adicionarEventosNaSecao(seletor, eventos) {
    const container = document.querySelector(seletor);
    if (!container) return;
    
    eventos.forEach(evento => {
        const cardHTML = criarCardEventoAgenda(evento);
        container.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Função para criar o HTML de um card de evento para a agenda
function criarCardEventoAgenda(evento) {
    // Formatar as datas
    const dataInicio = new Date(evento.inicio);
    const dataFim = new Date(evento.fim);
    
    const formatarDataAgenda = (dataInicio, dataFim) => {
        const opcoes = { day: 'numeric', month: 'long' };
        const inicio = dataInicio.toLocaleDateString('pt-BR', opcoes);
        const fim = dataFim.toLocaleDateString('pt-BR', opcoes);
        return `${inicio} - ${fim}`;
    };
    
    const dataFormatada = formatarDataAgenda(dataInicio, dataFim);
    
    // Usar imagem padrão se não houver imagem
    const imagemSrc = evento.imagem || 'src/img/patati.svg';
    
    // Determinar o local (cidade, estado)
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

// Função para abrir detalhes do evento na página de compra
function abrirDetalhesEvento(eventoId) {
    // Salvar o ID do evento selecionado no localStorage para a página de compra
    localStorage.setItem('eventoSelecionado', eventoId);
    // Redirecionar para a página de compra
    window.location.href = 'comprar.html';
}

// Carregar eventos quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarEventosAgenda);

