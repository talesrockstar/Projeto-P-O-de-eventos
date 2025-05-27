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
})
})