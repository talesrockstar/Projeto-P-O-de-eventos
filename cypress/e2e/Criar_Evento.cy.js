describe('Criação da Pagina de Eventos', () => {
  beforeEach(() => {
    cy.visit('index.html')
  })

  it('Dado que o usuario acesse a pagina de criação de eventos', () => {

  })
  it('Criação do evento', () => {
    cy.get('#every-title').type('Evento de Teste')
    cy.get('#every-description').type('Descrição do Evento Teste')
    cy.get('#every-location').type('local do evento')
    cy.get('button[type="submit"]').click()

  })
  it('Caso algum campo deixe de ser preenchido, exibir mensagem de erro', () => {
    cy.get('#every-title').type('Evento de Teste')
    cy.get('#every-description').type('Descrição do Evento Teste')
    cy.get('#every-location').type('local do evento')
    cy.get('button[type="submit"]').click()
    
    
    cy.get('.mensagem.erro').should('contain.text', 'Erro ao criar o evento');
    cy.get('#evento-display').should('not.exist')

  })
  it('Caso todos os campos sejam preenchidos corretamente, o evento deve ser criado', () => {
    cy.get('#every-title').type('Evento de Teste')
    cy.get('#every-description').type('Descrição do Evento Teste')
    cy.get('#every-location').type('local do evento')
    cy.get('button[type="submit"]').click()
    
  })
})