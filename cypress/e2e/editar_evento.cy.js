describe('Button operation and page redirection', () => {
  beforeEach(() => {
    cy.visit('editar_evento.html');
  });

  it('Click on the back button', () => {
    cy.get('.voltar a.navbar-brand').click();
    cy.url().should('eq', 'https://www.globo.com/');
  });

  it('Click on the profile button', () => {
    cy.get('.perfil .nav-link').click();
    cy.get('.perfil .dropdown-item').contains('Ver Perfil').click();
    cy.url().should('eq', 'https://www.globo.com/');
  });

  it('Click on the show more button', () => {
    cy.get('#mostrarMais').click();
    cy.get('#descricao').should('be.visible');
    cy.get('#spanMostrarMais').should('contain', 'Mostrar Menos'); // Se mudar dinamicamente
  });

  it('Click on the show less button', () => {
    cy.get('#mostrarMais').click();
    cy.get('#mostrarMais').click(); // Toggle
    cy.get('#descricao').should('be.visible');
    cy.get('#spanMostrarMais').should('contain', 'Mostrar Mais');
  });

  it('Click on the cancel event button', () => {
    cy.get('#comprarPrincipal').click();
    cy.get('#exampleModal').should('be.visible');
  });

  it('Click on the confirm cancellation event button', () => {
    cy.get('#comprarPrincipal').click();
    cy.get('#confirmarCompra').click();
    cy.url().should('eq', 'https://www.globo.com/');
  });

  it('Click on the edit event button', () => {
    cy.get('#editarEvento').click();
    cy.url().should('eq', 'https://www.globo.com/');
  });
});