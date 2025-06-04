// cypress/e2e/pagina_inicial.cy.js

describe("Teste da Página Inicial - Plannea", () => {
  it("Deve carregar a página inicial corretamente e exibir elementos chave", () => {
    // Visita a página inicial (versão sem login)
    // Certifique-se de que o caminho está correto em relação à raiz do projeto Cypress
    cy.visit("./index-sem-login.html");

    // Verifica o título da página
    cy.title().should("include", "Plannea - Eventos");

    // Verifica se o título principal "Plannea" está visível na barra lateral
    cy.get(".barra-lateral__titulo").should("be.visible").and("contain", "Plannea");

    // Verifica se o campo de pesquisa está visível
    cy.get(".controle-formulario").should("be.visible");

    // Verifica se os botões de Cadastro e Login estão visíveis no header
    cy.get(".botao-cadastro").should("be.visible").and("contain", "Cadastro");
    cy.get(".botao-login").should("be.visible").and("contain", "Login");

    // Verifica se o título "Evento em destaque" está visível
    cy.contains("h2", "Evento em destaque").should("be.visible");

    // Verifica se o carrossel principal está visível
    cy.get("#carouselExample").should("be.visible");

    // Verifica se a seção "Eventos passados" está visível
    cy.contains("h2", "Eventos passados").should("be.visible");

    // Verifica se o carrossel de cards está visível
    cy.get("#carrosselCards").should("be.visible");
  });

  it("Deve permitir a pesquisa de eventos", () => {
    cy.visit("./index-sem-login.html");

    // Digita no campo de pesquisa
    cy.get(".controle-formulario").type("Show");

    // Verifica se o card correspondente ainda está visível (exemplo)
    cy.contains(".card-titulo", "Patati Patatá Circo Show").should("be.visible");

    // Limpa a pesquisa
    cy.get(".controle-formulario").clear();

    // Verifica se outros cards reaparecem (exemplo)
    cy.contains(".card-titulo", "O Céu da Língua").should("be.visible");
  });
});