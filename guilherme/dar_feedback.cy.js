describe('Button operation and page redirection', () => {
  beforeEach(() => {
    cy.visit('dar_feedback.html');
  });

  it('Click on the back button', () => {
    cy.get('.voltar a.navbar-brand').click();
    cy.url().should('eq', 'https://www.globo.com/');
  });

  it('Click on the profile button', () => {
    cy.get('.perfil .nav-link').click(); // Abre o dropdown
    cy.get('.perfil .dropdown-item').contains('Ver Perfil').click();
    cy.url().should('eq', 'https://www.globo.com/');
  });
  
    it('Click on the give feedback button', () => {
      cy.get('#comprarPrincipal').click();
      cy.url().should('eq', 'https://www.globo.com/'); // Pressuposto com base no comportamento anterior
    });

  it('Click on the show more button', () => {
    cy.get('#mostrarMais').click();
    cy.get('#descricao').should('be.visible');
    cy.get('#spanMostrarMais').should('contain', 'Mostrar Menos'); // se o texto mudar dinamicamente
  });

  it('Click on the show less button', () => {
    cy.get('#mostrarMais').click(); // Mostrar mais primeiro
    cy.get('#mostrarMais').click(); // Depois mostrar menos
    cy.get('#descricao').should('be.visible');
    cy.get('#spanMostrarMais').should('contain', 'Mostrar Mais');
  });
});