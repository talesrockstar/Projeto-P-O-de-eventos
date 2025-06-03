describe('template spec', () => {

  beforeEach(() => {
    cy.visit('index.html')
  })

  it('Click on the back button', () => {
    cy.get('.navbar-brand').should('have.attr', 'href', 'https://www.globo.com')
    // cy.get('.navbar-brand').click()
    // cy.url().should('eq', 'https://www.globo.com')
  })

  it('Click on the profile button', () => {
    cy.get('.nav-link').click()
    cy.contains('Ver Perfil').should('have.attr', 'href', 'https:\\\\globo.com')
    // cy.contains('Ver Perfil').click()
    // cy.url().should('eq', 'https:\\\\globo.com')
  })

  it('Click on the buy ticket button', () => {
    cy.get('#comprarPrincipal').click()
    cy.window().then((win) => {
      expect(win.scrollY).to.be.greaterThan(0);
    });
  })

  it('Click on the show more button', () => {
    cy.get('#mostrarMais').should('have.text', 'Mostrar Mais')
    cy.get('#mostrarMais').click()
    cy.get('#descricao').should('have.class', 'line')
    cy.get('#mostrarMais').should('have.text', 'Mostrar Menos')
  })

  it('Click on the show less button', () => {
    cy.get('#mostrarMais').click()
    cy.get('#mostrarMais').should('have.text', 'Mostrar Menos')
    cy.get('#mostrarMais').click()
    cy.get('#descricao').should('have.class', 'line-clamp-5')
    cy.get('#mostrarMais').should('have.text', 'Mostrar Mais')
  })

  it('Click on the ticket type button', () => {
    cy.get('.list-group-item').then((items) => {
      const count = items.length;

      for (let i = 0; i < count; i++) {
        cy.get('.list-group-item').eq(i).click();
        cy.get('#exampleModal').should('be.visible');
        cy.get('#cancelar').click();
      }
    });
  });

  // it('Click on the confirm purchase button', () => {
  //   cy.get('.list-group-item').then((items) => {
  //     const count = items.length;
  //     for (let i = 0; i < count; i++) {
  //       cy.get('.form-check-input').then((inputs) => {
  //         const count = inputs.length;
  //         for (let i = 0; i < count; i++) {
  //           cy.reload()
  //           cy.get('.list-group-item').eq(i).click();
  //           cy.get('.form-check-input').eq(i).click();
  //           cy.get('#confirmarCompra').click()
  //           cy.url().should('eq', 'https://www.globo.com/');
  //         }
  //       });
  //     }
  //   });
  // })

})

describe('Validation field', () => {

  beforeEach(() => {
    cy.visit('index.html')
  })

  it('Invalid half or full field', () => {
    cy.get('.list-group-item').then((items) => {
      const count = items.length;
      for (let i = 0; i < count; i++) {
        cy.get('.form-check-label').then((inputs) => {
          const count = inputs.length;
          for (let i = 0; i < count; i++) {
            cy.reload()
            cy.get('.list-group-item').eq(i).click();
            cy.get('#confirmarCompra').should('be.disabled')
          }
        });
      }
    });
  })

  it('Valid half or full field', () => {
    cy.get('.list-group-item').then((items) => {
      const count = items.length;
      for (let i = 0; i < count; i++) {
        cy.get('.form-check-label').then((inputs) => {
          const count = inputs.length;
          for (let i = 0; i < count; i++) {
            cy.reload()
            cy.get('.list-group-item').eq(i).click();
            cy.get('.form-check-input').eq(i).click();
            cy.get('#confirmarCompra').should('be.enabled')
          }
        });
      }
    });
  })
  
})