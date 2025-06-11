// Função para carregar e exibir eventos criados
function carregarEventos() {
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const carrosselCards = document.getElementById('carrosselCards');
    
    if (!carrosselCards) return;
    
    // Limpar cards existentes (manter apenas os cards estáticos se necessário)
    // Vamos adicionar os novos cards no final
    
    eventos.forEach(evento => {
        const cardHTML = criarCardEvento(evento);
        carrosselCards.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// Função para criar o HTML de um card de evento
function criarCardEvento(evento) {
    // Formatar a data para exibição
    const dataInicio = new Date(evento.inicio);
    const dataFim = new Date(evento.fim);
    
    const formatarData = (data) => {
        return data.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: 'short' 
        }).replace('.', '');
    };
    
    const dataFormatada = `${formatarData(dataInicio)} • ${formatarData(dataFim)}`;
    
    // Usar imagem padrão se não houver imagem
    const imagemSrc = evento.imagem || 'src/img/malvadas.jpg';
    
    return `
        <div class="card card-personalizado" onclick="abrirDetalhesEvento(${evento.id})">
            <img src="${imagemSrc}" class="card-img-top card-img-topo" alt="Imagem do evento ${evento.titulo}" loading="lazy">
            <div class="card-body card-corpo">
                <h5 class="card-title card-titulo">${evento.titulo}</h5>
                <p class="card-text card-texto texto-secundario">${dataFormatada}</p>
                <button class="btn btn-sm btn-outline-secondary" onclick="event.stopPropagation(); abrirDetalhesEvento(${evento.id})">Saiba mais</button>
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
document.addEventListener('DOMContentLoaded', carregarEventos);

