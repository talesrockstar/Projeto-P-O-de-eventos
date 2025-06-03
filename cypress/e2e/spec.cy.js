describe('Página de Agenda', () => {
  beforeEach(() => {
    cy.visit('agenda.html');
  });

  it('deve exibir o cabeçalho com o nome Plannea', () => {
    cy.get('header .Plannea h2').should('contain', 'Plannea');
    cy.get('header img[alt="Imagem de perfil"]').should('be.visible');
    cy.get('header .nav-link').should('contain', 'Thomas');
  });

  it('deve exibir os filtros corretamente', () => {
    cy.get('#StatusSelect').should('exist').and('contain', 'Status');
    cy.get('#StatusLocal').should('exist').and('contain', 'Local');
    cy.get('#Tipo').should('exist').and('contain', 'Tipo');
  });



  it('deve exibir cards de eventos futuros', () => {
    cy.get('.futuros .carrossel1 .card').should('have.length.at.least', 1);
    cy.get('.futuros .carrossel1 .card').first().within(() => {
      cy.get('img').should('be.visible');
      cy.get('#Local').should('contain', 'São Paulo, SP');
      cy.get('#Nome_evento').should('exist');
      cy.get('#Tipo_evento').should('exist');
      cy.get('#Data_evento').should('exist');
    });
  });

  it('deve exibir cards de eventos em andamento', () => {
    cy.get('.andamento .carrossel2 .card').should('have.length.at.least', 1);
    cy.get('.andamento .carrossel2 .card').first().within(() => {
      cy.get('img').should('be.visible');
      cy.get('#Local').should('contain', 'Natal, RN');
      cy.get('#Nome_evento').should('exist');
      cy.get('#Tipo_evento').should('exist');
      cy.get('#Data_evento').should('exist');
    });
  });

  it('deve exibir cards de eventos realizados', () => {
    cy.get('.realizados .carrossel3 .card').should('have.length.at.least', 1);
    cy.get('.realizados .carrossel3 .card').first().within(() => {
      cy.get('img').should('be.visible');
      cy.get('#Local').should('contain', 'Natal, RN');
      cy.get('#Nome_evento').should('exist');
      cy.get('#Tipo_evento').should('exist');
      cy.get('#Data_evento').should('exist');
    });
  });

  it('deve permitir selecionar filtros', () => {
    cy.get('#StatusSelect').select('Futuro').should('have.value', '1');
    cy.get('#StatusLocal').select('Natal, RN').should('have.value', '2');
    cy.get('#Tipo').select('Show').should('have.value', '1');
  });
});