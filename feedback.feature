Feature: Tela de feedback

  Scenario: Carregar os elementos da tela corretamente
    Given the user accesses the feedback page
    Then the logo should display "Plannea"
    And the avatar should have the image "src/img/imagem do figma.png"
    And the avatar name should be "Thomas"
    And the "Name" field should be present with placeholder "Digite seu nome"
    And the "Email" field should be present with placeholder "Digite seu email"
    And the text "Escolha seu nível de satisfação:" should be present
    And there should be 5 satisfaction stars
    And the comment field should have the placeholder "Adicione um comentário..."
    And the "Send" button should be present
    And the "Cancel" button should be present
    And the event name should be "O Céu da Língua"
    And the event description should contain "Gregorio Duvivier tem na língua portuguesa não somente uma pátria mas uma obsessão."

  Scenario: Preencher o formulário, enviar e verificar respostas
    Given the user accesses the feedback page
    When the user fills the name with "João Silva"
    And fills the email with "Joaosilva123@gmail.com"
    And selects 3 satisfaction stars
    And fills the comment with "Ótimo evento, aprendi muito!"
    And clicks the "Send" button
    Then the user should be redirected to the feedback answered page
    And the displayed name should be "João Silva"
    And the displayed email should be "Joaosilva123@gmail.com"
    And 3 stars should be selected
    And the displayed comment should be "Ótimo evento, aprendi muito!"
    When the user clicks the "Back" button
    Then the user should return to the feedback page

  Scenario: Preencher o formulário e cancelar
    Given the user accesses the feedback page
    When the user fills the name with "João Silva"
    And fills the email with "Joaosilva123@gmail.com"
    And selects 4 satisfaction stars
    And fills the comment with "Ótimo evento, aprendi muito!"
    And clicks the "Cancel" button
    Then the name field should be empty
    And the email field should be empty
    And no stars should be selected
    And the comment field should be empty