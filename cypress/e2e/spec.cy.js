describe('Filtros página de meus eventos', () => {
  beforeEach(() => {
    cy.visit('/agenda.html'); // ajuste o caminho se necessário
  });

  it('Filtra por status "Futuro"', () => {
    cy.get('#StatusSelect').select('Futuro');
    cy.get('.futuros').should('be.visible');
    cy.get('.andamento').should('not.be.visible');
    cy.get('.realizados').should('not.be.visible');
  });

  it('Filtra por local', () => {
    cy.get('#StatusLocal').select('Natal, RN');
    cy.get('.card').each((card) => {
      cy.wrap(card).should('include.text', 'Natal, RN');
    });
  });

  it('Filtra por tipo "Show"', () => {
    cy.get('#Tipo').select('Show');
    cy.get('.card').each(($card) => {
      cy.wrap($card).should('contain.text', 'Show');
    });
  });
});