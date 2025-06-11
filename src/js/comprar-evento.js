// Função para carregar os detalhes do evento selecionado na página de compra
function carregarDetalhesEvento() {
    const eventoId = localStorage.getItem('eventoSelecionado');
    
    if (!eventoId) {
        console.log('Nenhum evento selecionado');
        return;
    }
    
    const eventos = JSON.parse(localStorage.getItem('eventos')) || [];
    const evento = eventos.find(e => e.id == eventoId);
    
    if (!evento) {
        console.log('Evento não encontrado');
        return;
    }
    
    // Atualizar o título da página
    const titulo = document.querySelector('.container-main h1');
    if (titulo) {
        titulo.textContent = evento.titulo;
    }
    
    // Atualizar a imagem do evento
    const imagem = document.querySelector('.container-main .figure img');
    if (imagem && evento.imagem) {
        imagem.src = evento.imagem;
        imagem.alt = `Imagem do evento ${evento.titulo}`;
    }
    
    // Atualizar informações do evento
    atualizarInformacoesEvento(evento);
    
    // Atualizar descrição do evento
    const descricao = document.getElementById('descricao');
    if (descricao) {
        descricao.textContent = evento.descricao;
    }
}

// Função para atualizar as informações do evento (data, horário, local)
function atualizarInformacoesEvento(evento) {
    const dataInicio = new Date(evento.inicio);
    const dataFim = new Date(evento.fim);
    
    // Atualizar data
    const dataElement = document.querySelector('.container-section1 div:first-child h4');
    if (dataElement) {
        const dataFormatada = dataInicio.toLocaleDateString('pt-BR', {
            day: 'numeric',
            month: 'long'
        });
        dataElement.textContent = dataFormatada;
    }
    
    // Atualizar horário
    const horarioElement = document.querySelector('.container-section1 div:nth-child(2) h4');
    if (horarioElement) {
        const diaSemana = dataInicio.toLocaleDateString('pt-BR', { weekday: 'long' });
        const horario = dataInicio.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        horarioElement.innerHTML = `${diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)} às ${horario}`;
    }
    
    // Atualizar local
    const localElement = document.querySelector('.container-section1 div:nth-child(3) h4');
    if (localElement) {
        const enderecoCompleto = `${evento.nomeLocal} - <span class="laranja">${evento.endereco}, ${evento.cidade} - ${evento.estado}</span>`;
        localElement.innerHTML = enderecoCompleto;
    }
}

// Carregar detalhes quando a página for carregada
document.addEventListener('DOMContentLoaded', carregarDetalhesEvento);

