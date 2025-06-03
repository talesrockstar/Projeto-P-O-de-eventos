describe("Testes da Sidebar e Header", () => {
  const mobileViewportWidth = 760;
  const tabletViewportWidth = 1024;
  const desktopViewportWidth = 1280;
  const viewportHeight = 800;

  beforeEach(() => {
    // Visita a página antes de cada teste
    // **IMPORTANTE:** Substitua "/" pelo caminho correto da sua página HTML
    cy.visit("dashboard.html");
  });

  context("Visualização Desktop", () => {
    beforeEach(() => {
      cy.viewport(desktopViewportWidth, viewportHeight);
    });

    it("Deve exibir a sidebar por padrão", () => {
      cy.get(".barra-lateral").should("be.visible");
      // Verificar se não está transladada para fora da tela
      cy.get(".barra-lateral").should("have.css", "transform", "matrix(1, 0, 0, 1, 0, 0)");
    });

    it("Não deve exibir o botão de menu mobile", () => {
      cy.get(".botao-menu").should("not.be.visible");
    });

    it("Não deve exibir o overlay", () => {
      cy.get(".barra-lateral-overlay").should("not.be.visible");
    });

    it("Deve destacar o link clicado na sidebar", () => {
      cy.get(".barra-lateral__link").eq(1).click(); // Clica no segundo link
      cy.get(".barra-lateral__link").eq(1).should("have.class", "barra-lateral__link--ativo");
      cy.get(".barra-lateral__link").eq(0).should("not.have.class", "barra-lateral__link--ativo");
    });

    it("Deve permitir digitar na barra de pesquisa", () => {
      const textoPesquisa = "Teste de evento";
      cy.get(".controle-formulario")
        .should("be.visible")
        .type(textoPesquisa)
        .should("have.value", textoPesquisa);
    });
  });

  context("Visualização Tablet/Mobile", () => {
    beforeEach(() => {
      // Usar viewport de tablet para testar a lógica mobile
      cy.viewport(tabletViewportWidth, viewportHeight);
    });

    it("Deve esconder a sidebar por padrão", () => {
      cy.get(".barra-lateral").should("have.css", "transform", "matrix(1, 0, 0, 1, -250, 0)"); // Verifica translateX(-100%)
    });

    it("Deve exibir o botão de menu mobile", () => {
      cy.get(".botao-menu").should("be.visible");
    });

    it("Deve abrir e fechar a sidebar ao clicar no botão de menu", () => {
      // Abre
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("have.class", "ativo");
      cy.get(".barra-lateral").should("have.css", "transform", "");
      cy.get(".barra-lateral-overlay").should("have.class", "ativo").and("be.visible");
      cy.get(".botao-menu").should("contain.text", "✕");

      // Fecha
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("not.have.class", "ativo");
      cy.get(".barra-lateral").should("have.css", "transform", "matrix(1, 0, 0, 1, -250, 0)");
      cy.get(".barra-lateral-overlay").should("not.have.class", "ativo");
      // Aguarda a transição do overlay antes de verificar a visibilidade
      cy.get(".barra-lateral-overlay").should("not.be.visible");
      cy.get(".botao-menu").should("contain.text", "☰");
    });

    it("Deve fechar a sidebar ao clicar no overlay", () => {
      // Abre primeiro
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("have.class", "ativo");
      cy.get(".barra-lateral-overlay").should("have.class", "ativo").and("be.visible");

      // Clica no overlay (força o clique pois pode estar parcialmente coberto)
      cy.get(".barra-lateral-overlay").click({ force: true });

      // Verifica se fechou
      cy.get(".barra-lateral").should("not.have.class", "ativo");
      cy.get(".barra-lateral-overlay").should("not.have.class", "ativo");
      cy.get(".barra-lateral-overlay").should("not.be.visible");
      cy.get(".botao-menu").should("contain.text", "☰");
    });

    it("Deve fechar a sidebar e destacar o link ao clicar em um item do menu", () => {
      // Abre primeiro
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("have.class", "ativo");

      // Clica no terceiro link
      cy.get(".barra-lateral__link").eq(2).click();

      // Verifica se fechou e destacou
      cy.get(".barra-lateral").should("not.have.class", "ativo");
      cy.get(".barra-lateral-overlay").should("not.have.class", "ativo");
      cy.get(".barra-lateral__link").eq(2).should("have.class", "barra-lateral__link--ativo");
      cy.get(".barra-lateral__link").eq(0).should("not.have.class", "barra-lateral__link--ativo");
    });

    it("Deve fechar a sidebar ao redimensionar para desktop", () => {
       // Abre primeiro
      cy.get(".botao-menu").click();
      cy.get(".barra-lateral").should("have.class", "ativo");

      // Redimensiona para desktop
      cy.viewport(desktopViewportWidth, viewportHeight);

      // Verifica se fechou (pode precisar de um pequeno wait pela transição/evento)
      cy.wait(500); // Espera um pouco para o evento resize ser processado
      cy.get(".barra-lateral").should("not.have.class", "ativo");
      cy.get(".barra-lateral-overlay").should("not.have.class", "ativo");
      // No desktop, o botão não deve ser visível
      cy.get(".botao-menu").should("not.be.visible");
    });

    it("Deve permitir digitar na barra de pesquisa", () => {
      const textoPesquisa = "Outro teste";
      cy.get(".controle-formulario")
        .should("be.visible")
        .type(textoPesquisa)
        .should("have.value", textoPesquisa);
    });
  });
});

