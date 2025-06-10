// ===============================
// SCRIPT PRINCIPAL DO PLANNEA
// ===============================
// Este arquivo controla a navegação, carrosséis, menu lateral/mobile, pesquisa e lazy loading da página inicial.

// Seleção dos principais elementos do DOM para manipulação dos carrosséis e menu lateral
const carrossel = document.getElementById("carrosselCards");
const botaoProximo = document.querySelector(".botao-proximo");
const botaoAnterior = document.querySelector(".botao-anterior");
const barraLateral = document.querySelector(".barra-lateral");

// ===============================
// CONFIGURAÇÃO DO MENU MOBILE
// ===============================

// Cria dinamicamente o botão de menu hamburguer para mobile
const botaoMenu = document.createElement("button");
botaoMenu.className = "botao-menu";
botaoMenu.innerHTML = "☰";
botaoMenu.setAttribute("aria-label", "Abrir menu");
document.body.appendChild(botaoMenu);

// Cria o overlay para escurecer o fundo ao abrir o menu mobile
const barraLateralOverlay = document.createElement("div");
barraLateralOverlay.className = "barra-lateral-overlay";
document.body.appendChild(barraLateralOverlay);

// Função para alternar a visibilidade do menu lateral no mobile
function alternarMenu() {
  barraLateral.classList.toggle("ativo");
  barraLateralOverlay.classList.toggle("ativo");
  
  const menuAtivo = barraLateral.classList.contains("ativo");
  botaoMenu.innerHTML = menuAtivo ? "✕" : "☰";
  botaoMenu.setAttribute("aria-label", menuAtivo ? "Fechar menu" : "Abrir menu");
  document.body.style.overflow = menuAtivo ? "hidden" : ""; // Impede rolagem do fundo quando o menu está aberto
}

// Eventos para abrir/fechar o menu mobile
botaoMenu.addEventListener("click", alternarMenu);
barraLateralOverlay.addEventListener("click", alternarMenu);

// Fecha o menu automaticamente ao redimensionar para desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && barraLateral.classList.contains("ativo")) {
    alternarMenu();
  }
});

// =====================================
// CARROSSEL DE CARDS (EVENTOS PASSADOS)
// =====================================

// Inicializa a navegação do carrossel principal de cards com botões e teclado
function inicializarCarrossel() {
  if (!botaoProximo || !botaoAnterior || !carrossel) return;
  
  const quantidadeRolagem = 300;
  
  // Botão para rolar para a direita
  botaoProximo.addEventListener("click", () => {
    carrossel.scrollBy({ left: quantidadeRolagem, behavior: "smooth" });
  });

  // Botão para rolar para a esquerda
  botaoAnterior.addEventListener("click", () => {
    carrossel.scrollBy({ left: -quantidadeRolagem, behavior: "smooth" });
  });
  
  // Permite navegação do carrossel por teclado (setas)
  carrossel.setAttribute('tabindex', '0');
  carrossel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      carrossel.scrollBy({ left: quantidadeRolagem, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      carrossel.scrollBy({ left: -quantidadeRolagem, behavior: 'smooth' });
    }
  });
}

// ==================================
// SUPORTE A TOQUE/SWIPE NO CARROSSEL
// ==================================

// Permite navegação por swipe no carrossel de cards (mobile/tablet)
function inicializarNavegacaoToque() {
  if (!carrossel) return;
  
  let toqueInicioX = 0;
  let toqueFimX = 0;
  const limiarSwipe = 50;
  const quantidadeRolagem = 300;
  
  function manipularGesto() {
    if (toqueFimX < toqueInicioX - limiarSwipe) {
      // Swipe para esquerda
      carrossel.scrollBy({ left: quantidadeRolagem, behavior: "smooth" });
    } else if (toqueFimX > toqueInicioX + limiarSwipe) {
      // Swipe para direita
      carrossel.scrollBy({ left: -quantidadeRolagem, behavior: "smooth" });
    }
  }

  carrossel.addEventListener("touchstart", (e) => {
    toqueInicioX = e.changedTouches[0].screenX;
  });

  carrossel.addEventListener("touchend", (e) => {
    toqueFimX = e.changedTouches[0].screenX;
    manipularGesto();
  });
}

// ========================================
// SUPORTE A MÚLTIPLOS CARROSSEIS NA PÁGINA
// ========================================

// Permite que vários carrosséis funcionem de forma independente
function inicializarMultiplosCarrosseis() {
  const carrosseis = document.querySelectorAll('.carrossel-wrapper');
  if (!carrosseis.length) return;

  carrosseis.forEach(wrapper => {
    const container = wrapper.querySelector('.carrossel-cards');
    const botaoAnt = wrapper.querySelector('.botao-anterior');
    const botaoProx = wrapper.querySelector('.botao-proximo');
    const quantidadeRolagem = window.innerWidth < 768 ? 200 : 300;
    const limiarSwipe = 50;

    // Botão anterior
    if (botaoAnt && container) {
      botaoAnt.addEventListener('click', () => {
        container.scrollBy({ left: -quantidadeRolagem, behavior: 'smooth' });
      });
    }

    // Botão próximo
    if (botaoProx && container) {
      botaoProx.addEventListener('click', () => {
        container.scrollBy({ left: quantidadeRolagem, behavior: 'smooth' });
      });
    }
    
    // Suporte a swipe/touch para cada carrossel
    if (container) {
      let inicioX = 0;
      let fimX = 0;
      
      container.addEventListener("touchstart", (e) => {
        inicioX = e.changedTouches[0].screenX;
      });
      
      container.addEventListener("touchend", (e) => {
        fimX = e.changedTouches[0].screenX;
        
        if (fimX < inicioX - limiarSwipe) {
          container.scrollBy({ left: quantidadeRolagem, behavior: "smooth" });
        } else if (fimX > inicioX + limiarSwipe) {
          container.scrollBy({ left: -quantidadeRolagem, behavior: "smooth" });
        }
      });
    }
  });
}

// ===========================================================
// MENU LATERAL: DESTAQUE DO LINK ATIVO E FECHAMENTO NO MOBILE
// ===========================================================

// Destaca o link ativo e fecha o menu no mobile ao clicar em um link
function inicializarBarraLateral() {
  const linksBarraLateral = document.querySelectorAll('.barra-lateral__link');
  if (!linksBarraLateral.length) return;

  linksBarraLateral.forEach(link => {
    link.addEventListener('click', function(e) {
      // Fecha o menu mobile ao clicar em um link (em telas pequenas)
      if (window.innerWidth <= 768 && barraLateral.classList.contains("ativo")) {
        alternarMenu();
      }
      
      // Atualiza o destaque do link ativo
      linksBarraLateral.forEach(l => l.classList.remove('barra-lateral__link--ativo'));
      this.classList.add('barra-lateral__link--ativo');
      
      // Previne navegação para links internos vazios
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });
}

// ======================================
// PESQUISA DINÂMICA NOS CARDS DE EVENTOS
// ======================================

// Filtra os cards de eventos conforme o usuário digita no campo de pesquisa
function inicializarPesquisa() {
  const campoPesquisa = document.querySelector('.container-pesquisa .controle-formulario');
  const cards = document.querySelectorAll('.carrossel-cards .card-personalizado');
  
  if (!campoPesquisa || !cards.length) return;
  
  campoPesquisa.addEventListener('input', () => {
    const termoPesquisa = campoPesquisa.value.toLowerCase().trim();
    
    cards.forEach(card => {
      const texto = card.innerText.toLowerCase();
      card.style.display = termoPesquisa === '' || texto.includes(termoPesquisa) ? '' : 'none';
    });
  });
}

// ===============================
// LAZY LOADING DE IMAGENS
// ===============================

// Carrega imagens apenas quando estão próximas de aparecer na tela (melhora performance)
function inicializarLazyLoading() {
  const imagensLazy = document.querySelectorAll('img[data-src]');
  if (!imagensLazy.length) return;
  
  if ('IntersectionObserver' in window) {
    const observadorImagem = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observadorImagem.unobserve(img); // Para de observar após carregar
        }
      });
    });
    
    imagensLazy.forEach(img => observadorImagem.observe(img));
  } else {
    // Fallback para navegadores antigos
    imagensLazy.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// =====================================
// INICIALIZAÇÃO GERAL AO CARREGAR O DOM
// =====================================

// Chama todas as funções de inicialização quando a página termina de carregar
document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrossel();
  inicializarNavegacaoToque();
  inicializarMultiplosCarrosseis();
  inicializarBarraLateral();
  inicializarPesquisa();
  inicializarLazyLoading();
});