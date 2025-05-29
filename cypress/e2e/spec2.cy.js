describe('Página de Perfil', () => {
  beforeEach(() => {
    // Visita a página localmente. Ajuste a URL conforme necessário.
    cy.visit('página de perfil.html')
  })

  it('Deve renderizar os campos principais', () => {
    cy.get('#nome').should('have.value', 'Thomas').and('be.disabled')
    cy.get('#email').should('have.value', 'thomas123@gmail.com').and('be.disabled')
    cy.get('#senha').should('have.value', '********').and('be.disabled')
    cy.get('#endereco').should('have.value', 'Rua das Acácias, 123 - Bairro Jardim das Flores').and('be.disabled')
    cy.get('#telefone').should('have.value', '(31) 99876-5432').and('be.disabled')
  })

  it('Deve permitir edição de um campo e retornar ao estado desabilitado', () => {
    cy.get('#nome').parent().find('.edit-button').click()
    cy.get('#nome').should('not.be.disabled').clear().type('Carlos')
    cy.get('#nome').parent().find('.edit-button').click()
    cy.get('#nome').should('be.disabled').should('have.value', 'Carlos')
  })

  it('Deve simular clique em "Alterar foto"', () => {
    cy.get('.change-photo').click()
    // Não há como testar o FileReader diretamente com Cypress sem plugin, mas o clique é validado.
  })

  it('Todos os botões de edição devem funcionar', () => {
    const campos = ['#nome', '#email', '#senha', '#endereco', '#telefone']

    campos.forEach((campo) => {
      cy.get(campo).parent().find('.edit-button').click()
      cy.get(campo).should('not.be.disabled').type(' test')
      cy.get(campo).parent().find('.edit-button').click()
      cy.get(campo).should('be.disabled')
    })
  })
})
