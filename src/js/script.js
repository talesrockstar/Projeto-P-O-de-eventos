// Elementos DOM principais
const carrossel = document.getElementById("carrosselCards");
const botaoProximo = document.querySelector(".botao-proximo");
const botaoAnterior = document.querySelector(".botao-anterior");
const barraLateral = document.querySelector(".barra-lateral");

// Configuração do menu mobile
const botaoMenu = document.createElement("button");
botaoMenu.className = "botao-menu";
botaoMenu.innerHTML = "☰";
botaoMenu.setAttribute("aria-label", "Abrir menu");
document.body.appendChild(botaoMenu);

const barraLateralOverlay = document.createElement("div");
barraLateralOverlay.className = "barra-lateral-overlay";
document.body.appendChild(barraLateralOverlay);

// lterna a visibilidade do menu mobile
function alternarMenu() {
  barraLateral.classList.toggle("ativo");
  barraLateralOverlay.classList.toggle("ativo");
  
  const menuAtivo = barraLateral.classList.contains("ativo");
  botaoMenu.innerHTML = menuAtivo ? "✕" : "☰";
  botaoMenu.setAttribute("aria-label", menuAtivo ? "Fechar menu" : "Abrir menu");
  document.body.style.overflow = menuAtivo ? "hidden" : ""; // Controla rolagem da página
}

// Eventos do menu mobile
botaoMenu.addEventListener("click", alternarMenu);
barraLateralOverlay.addEventListener("click", alternarMenu);

// Fechar menu ao redimensionar para desktop
window.addEventListener("resize", () => {
  if (window.innerWidth > 768 && barraLateral.classList.contains("ativo")) {
    alternarMenu();
  }
});

// Inicializa navegação do carrossel principal
function inicializarCarrossel() {
  if (!botaoProximo || !botaoAnterior || !carrossel) return;
  
  const quantidadeRolagem = 300;
  
  botaoProximo.addEventListener("click", () => {
    carrossel.scrollBy({ left: quantidadeRolagem, behavior: "smooth" });
  });

  botaoAnterior.addEventListener("click", () => {
    carrossel.scrollBy({ left: -quantidadeRolagem, behavior: "smooth" });
  });
  
  // Navegação por teclado
  carrossel.setAttribute('tabindex', '0');
  carrossel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      carrossel.scrollBy({ left: quantidadeRolagem, behavior: 'smooth' });
    } else if (e.key === 'ArrowLeft') {
      carrossel.scrollBy({ left: -quantidadeRolagem, behavior: 'smooth' });
    }
  });
}

// Inicializa navegação por toque/swipe para o carrossel
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

// Inicializa múltiplos carrosséis na página
function inicializarMultiplosCarrosseis() {
  const carrosseis = document.querySelectorAll('.carrossel-wrapper');
  if (!carrosseis.length) return;

  carrosseis.forEach(wrapper => {
    const container = wrapper.querySelector('.carrossel-cards');
    const botaoAnt = wrapper.querySelector('.botao-anterior');
    const botaoProx = wrapper.querySelector('.botao-proximo');
    const quantidadeRolagem = window.innerWidth < 768 ? 200 : 300;
    const limiarSwipe = 50;

    // Navegação com botões
    if (botaoAnt && container) {
      botaoAnt.addEventListener('click', () => {
        container.scrollBy({ left: -quantidadeRolagem, behavior: 'smooth' });
      });
    }

    if (botaoProx && container) {
      botaoProx.addEventListener('click', () => {
        container.scrollBy({ left: quantidadeRolagem, behavior: 'smooth' });
      });
    }
    
    // Navegação por toque/swipe
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

// Inicializa destaque do item ativo na barra lateral
function inicializarBarraLateral() {
  const linksBarraLateral = document.querySelectorAll('.barra-lateral__link');
  if (!linksBarraLateral.length) return;

  linksBarraLateral.forEach(link => {
    link.addEventListener('click', function(e) {
      // Fechar menu mobile ao clicar em um link (em telas pequenas)
      if (window.innerWidth <= 768 && barraLateral.classList.contains("ativo")) {
        alternarMenu();
      }
      
      // Atualizar item ativo
      linksBarraLateral.forEach(l => l.classList.remove('barra-lateral__link--ativo'));
      this.classList.add('barra-lateral__link--ativo');
      
      // Prevenir navegação para links internos vazios
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });
}

// Inicializa pesquisa dinâmica nos cards
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

// Inicializa lazy loading para imagens
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
          observadorImagem.unobserve(img);
        }
      });
    });
    
    imagensLazy.forEach(img => observadorImagem.observe(img));
  } else {
    // Fallback para navegadores que não suportam IntersectionObserver
    imagensLazy.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
  inicializarCarrossel();
  inicializarNavegacaoToque();
  inicializarMultiplosCarrosseis();
  inicializarBarraLateral();
  inicializarPesquisa();
  inicializarLazyLoading();
});
