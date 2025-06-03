Feature: Página de Perfil

  Scenario: Renderizar os campos principais
    Given the user visits the profile page
    Then the "Name" field should be disabled with value "Thomas"
    And the "Email" field should be disabled with value "thomas123@gmail.com"
    And the "Password" field should be disabled with value "********"
    And the "Address" field should be disabled with value "Rua das Acácias, 123 - Bairro Jardim das Flores"
    And the "Phone" field should be disabled with value "(31) 99876-5432"

  Scenario: Permitir edição de um campo e retornar ao estado desabilitado
    Given the user visits the profile page
    When the user clicks the edit button for the "Name" field
    Then the "Name" field should be enabled
    When the user changes the "Name" field to "Carlos"
    And clicks the edit button again for the "Name" field
    Then the "Name" field should be disabled with value "Carlos"

  Scenario: Simular clique em "Alterar foto"
    Given the user visits the profile page
    When the user clicks the "Change photo" button
    Then the photo change action should be triggered

  Scenario: Todos os botões de edição devem funcionar
    Given the user visits the profile page
    For each field in "Name", "Email", "Password", "Address", "Phone":
      When the user clicks the edit button for the field
      Then the field should be enabled
      When the user types " test" in the field
      And clicks the edit button again for the field
      Then the field should be disabled