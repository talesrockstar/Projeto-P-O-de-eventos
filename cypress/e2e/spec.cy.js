describe('Filtros página de meus eventos', () => {
  beforeEach(() => {
    cy.visit('/agenda.html');
  });

  it('Filtra por status "Futuro"', () => {
    cy.get('#StatusSelect').select('Futuro');
    cy.get('.futuros').should('be.visible');
    cy.get('.andamento').should('not.be.visible');
    cy.get('.realizados').should('not.be.visible');
  });

  it('Filtra por local "Natal, RN"', () => {
    cy.get('#StatusLocal').select('Natal, RN');
    cy.get('.card:visible').each(($card) => {
      cy.wrap($card).should('contain.text', 'Natal, RN');
    });
    cy.get('.card:visible').should('not.contain.text', 'São Paulo, SP');
    cy.get('.card:visible').should('not.contain.text', 'Salvador, BA');
  });

  it('Filtra por tipo "Show"', () => {
    cy.get('#Tipo').select('Show');
    cy.get('.card:visible').each(($card) => {
      cy.wrap($card).should('contain.text', 'Show');
    });
    cy.get('.card:visible').should('not.contain.text', 'Peça');
    cy.get('.card:visible').should('not.contain.text', 'Musical');
    cy.get('.card:visible').should('not.contain.text', 'Stand-UP');
    cy.get('.card:visible').should('not.contain.text', 'Infantil');
  });
});