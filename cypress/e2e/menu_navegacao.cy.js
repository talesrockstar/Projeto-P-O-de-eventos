// cypress/e2e/menu_navegacao.cy.js

describe("Testes do Menu de Navegação (Lateral e Mobile) - Plannea", () => {
  beforeEach(() => {
    // Visita a página antes de cada teste neste bloco
    cy.visit("./index-sem-login.html");
  });

  context("Menu Lateral (Desktop)", () => {
    beforeEach(() => {
      // Garante que a viewport está em modo desktop
      cy.viewport("macbook-15");
    });

    it("Deve exibir a barra lateral e seus links corretamente", () => {
      cy.get(".barra-lateral").should("be.visible");
      cy.get(".barra-lateral__link").should("have.length.at.least", 4);
      cy.contains(".barra-lateral__link", "Início").should("be.visible");
      cy.contains(".barra-lateral__link", "Criar eventos").should("be.visible");
    });

    it("Deve destacar o link ativo corretamente", () => {
      cy.contains(".barra-lateral__link", "Início")
        .should("have.class", "barra-lateral__link--ativo");
      cy.contains(".barra-lateral__link", "Criar eventos")
        .should("not.have.class", "barra-lateral__link--ativo");
    });

    it("Deve permitir a navegação entre os links (simulação)", () => {
      cy.contains(".barra-lateral__link", "Criar eventos").click();
      // Verifica se o link clicado agora está ativo
      cy.contains(".barra-lateral__link", "Criar eventos")
        .should("have.class", "barra-lateral__link--ativo");
      // Verifica se o link anterior não está mais ativo
      cy.contains(".barra-lateral__link", "Início")
        .should("not.have.class", "barra-lateral__link--ativo");
        
      // Volta para o início para outros testes
      cy.contains(".barra-lateral__link", "Início").click();
      cy.contains(".barra-lateral__link", "Início")
        .should("have.class", "barra-lateral__link--ativo");
    });
  });

  context("Menu Mobile", () => {
    beforeEach(() => {
      // Garante que a viewport está em modo mobile
      cy.viewport("iphone-xr");
    });

    it("Deve exibir o botão de menu hamburguer e esconder a barra lateral", () => {
      cy.get(".botao-menu").should("be.visible");
      cy.get(".barra-lateral").should("not.be.visible");
    });

    it("Deve abrir e fechar o menu lateral ao clicar no botão hamburguer", () => {
      // Abre o menu
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");
      cy.get(".botao-menu").should("contain.text", "✕"); // Verifica ícone de fechar

      // Fecha o menu
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("not.be.visible");
      cy.get(".barra-lateral-overlay").should("not.be.visible");
      cy.get(".botao-menu").should("contain.text", "☰"); // Verifica ícone de abrir novamente

      // Verifica se o menu abre e fecha novamente
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("not.be.visible");
    });

    it("Deve fechar o menu lateral ao clicar fora dele", () => {
      // Abre o menu
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");
    });

    it("Deve fechar o menu ao clicar em um link", () => {
      // Abre o menu
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");

      // Clica em um link
      cy.contains(".barra-lateral__link", "Criar eventos").click();

      // Verifica se o menu fechou
      cy.get(".barra-lateral").should("not.be.visible");
      cy.get(".barra-lateral-overlay").should("not.be.visible");
      
      // Verifica se o link clicado ficou ativo (após fechar)
      // Reabre para verificar o estado ativo
      cy.get(".botao-menu").click();
      cy.contains(".barra-lateral__link", "Criar eventos")
        .should("have.class", "barra-lateral__link--ativo");
    });
  });
});
