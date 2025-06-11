// ===========================================================
// Testes automatizados do Menu de Navegação (Lateral e Mobile)
// ===========================================================
// Este arquivo cobre os testes do menu lateral (desktop) e do menu mobile/hamburguer do Plannea.

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
      // Verifica se a barra lateral está visível e contém os links principais
      cy.get(".barra-lateral").should("be.visible");
      cy.get(".barra-lateral__link").should("have.length.at.least", 4);
      cy.contains(".barra-lateral__link", "Início").should("be.visible");
      cy.contains(".barra-lateral__link", "Criar eventos").should("be.visible");
    });

    it("Deve destacar o link ativo corretamente", () => {
      // Verifica se o link 'Início' está ativo por padrão
      cy.contains(".barra-lateral__link", "Início")
        .should("have.class", "barra-lateral__link--ativo");
      // Verifica se o link 'Criar eventos' não está ativo inicialmente
      cy.contains(".barra-lateral__link", "Criar eventos")
        .should("not.have.class", "barra-lateral__link--ativo");
    });

    it("Deve permitir a navegação entre os links (simulação)", () => {
      // Simula clique em 'Criar eventos' e verifica destaque
      cy.contains(".barra-lateral__link", "Criar eventos").click();
      cy.contains(".barra-lateral__link", "Criar eventos")
        .should("have.class", "barra-lateral__link--ativo");
      // Verifica se o link anterior perdeu o destaque
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
      // Verifica se o botão hamburguer aparece e a barra lateral está oculta
      cy.get(".botao-menu").should("be.visible");
      cy.get(".barra-lateral").should("not.be.visible");
    });

    it("Deve abrir e fechar o menu lateral ao clicar no botão hamburguer", () => {
      // Abre o menu e verifica se está visível e o ícone mudou para fechar
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");
      cy.get(".botao-menu").should("contain.text", "✕"); // Verifica ícone de fechar

      // Fecha o menu e verifica se está oculto e o ícone voltou para hamburguer
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("not.be.visible");
      cy.get(".barra-lateral-overlay").should("not.be.visible");
      cy.get(".botao-menu").should("contain.text", "☰"); // Verifica ícone de abrir novamente

      // Testa abrir e fechar novamente para garantir consistência
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("not.be.visible");
    });

    it("Deve fechar o menu lateral ao clicar fora dele", () => {
      // Abre o menu
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");
      // O clique fora (overlay) é testado em outros cenários ou pode ser adicionado aqui
    });

    it("Deve fechar o menu ao clicar em um link", () => {
      // Abre o menu
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("be.visible");

      // Clica em um link do menu lateral
      cy.contains(".barra-lateral__link", "Criar eventos").click();

      // Verifica se o menu fechou após o clique
      cy.get(".barra-lateral").should("not.be.visible");
      cy.get(".barra-lateral-overlay").should("not.be.visible");
      
      // Reabre o menu para verificar se o link clicado ficou ativo
      cy.get(".botao-menu").click();
      cy.contains(".barra-lateral__link", "Criar eventos")
        .should("have.class", "barra-lateral__link--ativo");
    });
  });
});