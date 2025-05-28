describe('Tela de feedback', () => {
  beforeEach(() => {
    cy.visit('feedback.html')
  })

  
  it('Deve carregar os elementos da tela corretamente', () => {

    cy.get('span[class="logo"]').should('have.text', 'Plannea')

    cy.get('.avatar').should('have.attr', 'src', 'src/img/imagem do figma.png')
    cy.get('span[class="nome_do_avatar"]').should('have.text', 'Thomas')

    cy.get('label[for="nome"]').should('have.text', 'Nome')
    cy.get('#nome').should('have.attr', 'placeholder', 'Digite seu nome')

    cy.get('label[for="email"]').should('have.text', 'Email')
    cy.get('#email').should('have.attr', 'placeholder', 'Digite seu email')

    cy.get('label[class="form-label"]').should('have.text', 'Escolha seu nível de satisfação:')
    cy.get('.nivel .fa-star').should('have.length', 5)

    cy.get('#comentario').should('have.attr', 'placeholder', 'Adicione um comentário...')

    cy.get('#enviar').should('have.text', 'Enviar')
    cy.get('#cancelar').should('have.text', 'Cancelar')

    cy.get('.nome_do_evento').should('have.text', 'O Céu da Língua')
    cy.get('.descricao_do_evento').should('contain.text', 'Gregorio Duvivier tem na língua portuguesa não somente uma pátria mas uma obsessão. Ou, como dizem os\n            jovens, um hiperfoco.\n            Afinal a palavra é uma fonte inesgotável de humor, desde os primórdios. No Princípio era o Verbo, disse\n            Deus. E logo em seguida vieram os erros de concordância.')
  })


  it('Deve preencher o formulário, enviar, ser redirecionado a página de feedback respondido e verificar as respostas', () => {
    cy.get('#nome').type('João Silva').should('have.value', 'João Silva')

    cy.get('#email').type('Joaosilva123@gmail.com').should('have.value', 'Joaosilva123@gmail.com')

    cy.get('.nivel .fa-star[data-index="3"]').click()
    cy.get('.nivel .fa-star[data-index="3"]').should('have.class', 'selecionada')

    cy.get('#comentario').type('Ótimo evento, aprendi muito!').should('have.value', 'Ótimo evento, aprendi muito!')

    cy.get('#enviar').click()
    cy.url().should('include', 'feedback2.html')

    cy.get('#resposta-nome').should('have.text', 'João Silva')
    cy.get('#resposta-email').should('have.text', 'Joaosilva123@gmail.com')
    cy.get('#resposta-nivel .fa-star.selecionada').should('have.length', 3)
    cy.get('#resposta-comentario').should('have.text', 'Ótimo evento, aprendi muito!')

    cy.get('#voltar').click()
    cy.url().should('include', 'feedback.html')
  })


  it('Deve preencher o formulário, cancelar e retirar os elementos da tela', () => {
    cy.get('#nome').type('João Silva')
    cy.get('#email').type('Joaosilva123@gmail.com')

    cy.get('.nivel .fa-star').should('have.length', 5)
    cy.get('.nivel .fa-star[data-index="4"]').click()
    cy.get('.nivel .fa-star[data-index="4"]').should('have.class', 'selecionada')

    cy.get('#comentario').type('Ótimo evento, aprendi muito!')

    cy.get('#cancelar').click()

    
    cy.get('#nome').should('have.value', '')

    cy.get('#email').should('have.value', '')

    cy.get('.nivel .fa-star').should('have.length', 5)

    cy.get('#comentario').should('have.value', '')
  })
})
