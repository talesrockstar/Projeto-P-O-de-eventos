// Elementos DOM principais
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

// Alterna a visibilidade do menu mobile
function alternarMenu() {
  // Verifica se os elementos existem antes de tentar acessá-los
  if (!barraLateral || !barraLateralOverlay || !botaoMenu) {
    console.error("Elementos da barra lateral ou botão de menu não encontrados.");
    return;
  }

  barraLateral.classList.toggle("ativo");
  barraLateralOverlay.classList.toggle("ativo");

  const menuAtivo = barraLateral.classList.contains("ativo");
  botaoMenu.innerHTML = menuAtivo ? "✕" : "☰";
  botaoMenu.setAttribute("aria-label", menuAtivo ? "Fechar menu" : "Abrir menu");
  // Controla rolagem da página apenas se o menu estiver ativo
  document.body.style.overflow = menuAtivo ? "hidden" : "";
  // Adiciona/remove classe no body para controle extra se necessário
  document.body.classList.toggle("menu-aberto", menuAtivo);
}

// Eventos do menu mobile
// Verifica se o botão existe antes de adicionar o listener
if (botaoMenu) {
  botaoMenu.addEventListener("click", alternarMenu);
}
// Verifica se o overlay existe antes de adicionar o listener
if (barraLateralOverlay) {
  barraLateralOverlay.addEventListener("click", alternarMenu);
}

// Fechar menu ao redimensionar para desktop
window.addEventListener("resize", () => {
  // Verifica se a barra lateral existe e está ativa
  if (barraLateral && window.innerWidth > 1024 && barraLateral.classList.contains("ativo")) {
    alternarMenu();
  }
});

// Inicializa destaque do item ativo na barra lateral
function inicializarBarraLateral() {
  // Verifica se a barra lateral existe antes de procurar links
  if (!barraLateral) return;

  const linksBarraLateral = barraLateral.querySelectorAll(".barra-lateral__link");
  if (!linksBarraLateral.length) return;

  linksBarraLateral.forEach(link => {
    link.addEventListener("click", function(e) {
      // Fechar menu mobile ao clicar em um link (em telas pequenas)
      if (window.innerWidth <= 1024 && barraLateral.classList.contains("ativo")) {
        alternarMenu();
      }

      // Atualizar item ativo
      linksBarraLateral.forEach(l => l.classList.remove("barra-lateral__link--ativo"));
      this.classList.add("barra-lateral__link--ativo");

      // Prevenir navegação para links internos vazios
      if (this.getAttribute("href") === "#") {
        e.preventDefault();
      }
    });
  });

  // Define o link ativo inicial com base na URL atual (opcional, mas recomendado)
  const caminhoAtual = window.location.pathname;
  linksBarraLateral.forEach(link => {
    if (link.getAttribute('href') === caminhoAtual || (caminhoAtual === '/' && link.getAttribute('href') === 'index-logado.html')) {
      link.classList.add('barra-lateral__link--ativo');
    } else {
      link.classList.remove('barra-lateral__link--ativo');
    }
  });
  // Garante que pelo menos o primeiro link esteja ativo se nenhum corresponder
  if (!barraLateral.querySelector('.barra-lateral__link--ativo')) {
      const primeiroLink = barraLateral.querySelector('.barra-lateral__link');
      if (primeiroLink) {
          primeiroLink.classList.add('barra-lateral__link--ativo');
      }
  }
}

// Função inicializarNavegacaoToque não foi fornecida, remover chamada se não existir
// function inicializarNavegacaoToque() { ... }

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  // inicializarNavegacaoToque(); // Remover se a função não existir
  inicializarBarraLateral();
});
