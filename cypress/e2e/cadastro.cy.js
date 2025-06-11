describe('teste página de login', () => {
  it('login', () => {
    cy.visit('login.html')

    cy.get('.email').type('wdwag@example.com')

    cy.get('.senha').type('12345678')
    cy.get('.btn').click()
    cy.get('.btn_btn-link').click()
  })

  it('não preenchido  ', () => {
    cy.visit('login.html')
    cy.get('#exampleInputEmail1').should('have.value', '')
    cy.get('#exampleInputPassword1').should('have.value', '')
    cy.get('.btn').click()
    
  })
  
})

describe('teste página de cadastro', () => {
  it('cadastro', () => {
    cy.visit('cadastro.html')

    cy.get('.endereco').type('Rua Exemplo, 123')

    cy.get('.telefone').type('71999999999')

    cy.get('.nome').type('João da Silva')

    cy.get('.email').type('wdwag@example.com')

    cy.get('.senha').type('12345678')

    cy.get('.change-photo').click()

    cy.get('.btn').click()
})
it('não preenchido', () => {
  cy.visit('cadastro.html')
  cy.get('#endereco').should('have.value', '')
  cy.get('#telefone').should('have.value', '')
  cy.get('#nome').should('have.value', '')
  cy.get('#exampleInputEmail1').should('have.value', '')
  cy.get('#exampleInputPassword1').should('have.value', '')
  cy.get('.btn').click() 
})
})
describe('teste página de redefinição de senha', () => {
  it('redefinir senha', () => {
    cy.visit('redefinirsenha.html')
    cy.get('.email').type('wdwag@example.com')
    cy.get('.btn').click()
})
it('não preenchido', () => {
  cy.visit('redefinirsenha.html')
  cy.get('#exampleInputEmail1').should('have.value', '')
  cy.get('.btn').click()
})
})
