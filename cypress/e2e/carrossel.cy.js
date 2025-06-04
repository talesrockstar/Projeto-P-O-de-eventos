// ===============================================
// Testes automatizados dos Carrosséis do Plannea
// ===============================================
// Este arquivo Cypress cobre testes do carrossel de imagens (Bootstrap)
// e do carrossel de cards customizado na página inicial do Plannea.

describe("Testes dos Carrosséis (Imagens e Cards) - Plannea", () => {
  beforeEach(() => {
    // Visita a página sem login antes de cada teste
    cy.visit("./index-sem-login.html");
  });

  // ==========================================
  // Testes do Carrossel de Imagens (Bootstrap)
  // ==========================================
  context("Carrossel de Imagens (Bootstrap)", () => {
    const carrosselImagens = "#carouselExample";

    it("Deve exibir o carrossel de imagens e seus controles", () => {
      // Verifica se o carrossel e seus elementos principais estão visíveis
      cy.get(carrosselImagens).should("be.visible");
      cy.get(`${carrosselImagens} .carousel-inner`).should("be.visible");
      cy.get(`${carrosselImagens} .carousel-item`).should("have.length.at.least", 1);
      cy.get(`${carrosselImagens} .carousel-control-prev`).should("be.visible");
      cy.get(`${carrosselImagens} .carousel-control-next`).should("be.visible");
      cy.get(`${carrosselImagens} .carousel-indicators button`).should("have.length.at.least", 1);
    });

    it("Deve navegar para o próximo slide ao clicar no botão 'Próximo'", () => {
      // Verifica o slide inicial ativo
      cy.get(`${carrosselImagens} .carousel-item.active`).find("img").should("have.attr", "alt", "Mauricio Manieri - Tour Classics 2025"); 

      // Clica no botão próximo
      cy.get(`${carrosselImagens} .carousel-control-next`).click();

      // Aguarda a transição do carrossel
      cy.wait(1000); 

      // Verifica se o segundo slide está ativo
      cy.get(`${carrosselImagens} .carousel-item.active`).find("img").should("have.attr", "alt", "Imagem do evento Loira 2");
    });

    it("Deve navegar para o slide anterior ao clicar no botão 'Anterior'", () => {
      // Navega para o próximo primeiro para poder voltar
      cy.get(`${carrosselImagens} .carousel-control-next`).click();
      cy.wait(1000);
      cy.get(`${carrosselImagens} .carousel-item.active`).find("img").should("have.attr", "alt", "Imagem do evento Loira 2");

      // Clica no botão anterior
      cy.get(`${carrosselImagens} .carousel-control-prev`).click();
      cy.wait(1000);

      // Verifica se voltou para o primeiro slide
      cy.get(`${carrosselImagens} .carousel-item.active`).find("img").should("have.attr", "alt", "Mauricio Manieri - Tour Classics 2025");
    });

    it("Deve navegar para um slide específico ao clicar nos indicadores", () => {
      // Clica no terceiro indicador (índice 2)
      cy.get(`${carrosselImagens} .carousel-indicators button`).eq(2).click();
      cy.wait(1000);

      // Verifica se o terceiro slide está ativo
      cy.get(`${carrosselImagens} .carousel-item.active`).find("img").should("have.attr", "alt", "Imagem do evento Ludmila");
    });
  });

  // ========================================
  // Testes do Carrossel de Cards Customizado
  // ========================================
  context("Carrossel de Cards (Customizado)", () => {
    const carrosselCards = "#carrosselCards"; // ID do carrossel
    const wrapper = ".secao-carrossel-cards .carrossel-wrapper"; 

    it("Deve exibir o carrossel de cards e seus controles", () => {
      // Verifica se o carrossel de cards e os botões de navegação estão visíveis
      cy.get(carrosselCards).should("be.visible");
      cy.get(`${carrosselCards} .card-personalizado`).should("have.length.gt", 0);
      cy.get(`${wrapper} .botao-anterior`).should("be.visible");
      cy.get(`${wrapper} .botao-proximo`).should("be.visible");
    });

    it("Deve rolar para a direita ao clicar no botão 'Próximo'", () => {
      // Captura a posição inicial de rolagem do carrossel
      cy.get(carrosselCards).scrollIntoView().invoke("scrollLeft").then((scrollInicial) => {
        // Clica no botão próximo para rolar o carrossel
        cy.get(`${wrapper} .botao-proximo`).click();
        // Espera o término da animação de rolagem
        cy.wait(500);
        // Verifica se a posição de rolagem é maior que a inicial (rolou para a direita)
        cy.get(carrosselCards).invoke("scrollLeft").should("be.gt", scrollInicial);
      });
    });

    it("Deve rolar para a esquerda ao clicar no botão 'Anterior'", () => {
      // Rola para a direita primeiro para poder voltar
      cy.get(`${wrapper} .botao-proximo`).click();
      cy.wait(500);

      // Obtém a posição de rolagem após rolar para a direita
      cy.get(carrosselCards).invoke("scrollLeft").then((scrollDireita) => {
        // Clica no botão anterior para rolar de volta
        cy.get(`${wrapper} .botao-anterior`).click();
        cy.wait(500);
        // Verifica se a posição de rolagem diminuiu (rolou para a esquerda)
        cy.get(carrosselCards).invoke("scrollLeft").should("be.lt", scrollDireita);
      });
    });
  });
});