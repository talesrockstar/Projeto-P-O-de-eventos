// cypress/e2e/pagina_logada.cy.js

describe("Teste da Página Inicial - Usuário Logado - Plannea", () => {
  beforeEach(() => {
    // Visita a página logada antes de cada teste
    cy.visit("./index-logado.html");
  });

  it("Deve carregar a página logada corretamente e exibir elementos chave", () => {
    // Verifica o título da página
    cy.title().should("include", "Plannea - Eventos");

    // Verifica se o título principal "Plannea" está visível na barra lateral
    cy.get(".barra-lateral__titulo").should("be.visible").and("contain", "Plannea");

    // Verifica se o campo de pesquisa está visível
    cy.get(".controle-formulario").should("be.visible");

    // Verifica se o container do usuário (avatar e nome) está visível no header
    cy.get(".container-usuario").should("be.visible");
    cy.get(".avatar-usuario").should("be.visible").and("have.attr", "alt", "Foto de perfil");
    cy.get(".nome-usuario").should("be.visible").and("contain.text", "Ludmila Silva");

    // Verifica se os botões de Cadastro e Login NÃO estão visíveis
    cy.get(".botao-cadastro").should("not.exist");
    cy.get(".botao-login").should("not.exist");

    // Verifica se o título "Evento em destaque" está visível
    cy.contains("h2", "Evento em destaque").should("be.visible");

    // Verifica se o carrossel principal está visível
    cy.get("#carouselExample").should("be.visible");

    // Verifica se a seção "Eventos passados" está visível
    cy.contains("h2", "Eventos passados").should("be.visible");

    // Verifica se o carrossel de cards está visível
    cy.get("#carrosselCards").should("be.visible");
  });

  // Pode adicionar mais testes específicos para a versão logada aqui, 
  // como interações com elementos que só aparecem para usuários logados.
});