Feature: Event Creation on Plannea Platform

Background:
    Given I am on the event creation page

  Scenario: View the event creation page
    Then I should see the title "Criar Evento"
    And I should see the section "1. Informações básicas" with the fields "Nome do evento", "Imagem do evento", "Tipo de evento", and "Faixa de participantes"
    And I should see the section "2. Descrição do evento" with the field "Conte os detalhes do seu evento"
    And I should see the section "3. Data e horário" with the fields "Data do evento" and "Hora do evento"
    And I should see the section "4. Local do evento" with the fields "Digite o endereço", "Nome da rua", "CEP", "Cidade", and "Estado"
    And I should see the "Cancelar" and "Criar evento" buttons

  Scenario: Fill in basic event information
    When I fill in the "Nome do evento" field with "Festa Junina da Comunidade"
    # Actual upload step might vary, but we simulate the selection
    And I select an image for "Imagem do evento"
    And I select "Presencial" in the "Tipo de evento" field
    And I select "51-100" in the "Faixa de participantes" field
    Then the "Nome do evento" field should contain "Festa Junina da Comunidade"
    # Image verification can be complex, focusing on selection
    And the "Tipo de evento" field should have "Presencial" selected
    And the "Faixa de participantes" field should have "51-100" selected

  Scenario: Fill in event description
    When I fill in the "Conte os detalhes do seu evento" field with "Venha celebrar conosco com comidas típicas, música e diversão!"
    Then the "Conte os detalhes do seu evento" field should contain "Venha celebrar conosco com comidas típicas, música e diversão!"

  Scenario: Fill in event date and time
    When I fill in the "Data do evento" field with "24/06/2025"
    And I fill in the "Hora do evento" field with "18:00"
    Then the "Data do evento" field should contain "24/06/2025"
    And the "Hora do evento" field should contain "18:00"

  Scenario: Fill in event location
    When I fill in the "Digite o endereço" field with "Praça Central, 123"
    And I fill in the "Nome da rua" field with "Rua Principal"
    And I fill in the "CEP" field with "12345-678"
    And I fill in the "Cidade" field with "São Paulo"
    And I fill in the "Estado" field with "SP"
    Then the "Digite o endereço" field should contain "Praça Central, 123"
    And the "Nome da rua" field should contain "Rua Principal"
    And the "CEP" field should contain "12345-678"
    And the "Cidade" field should contain "São Paulo"
    And the "Estado" field should contain "SP"

  Scenario: Attempt to create event with empty required fields (Example: Event Name)
    # Assuming "Nome do evento" is required
    When I leave the "Nome do evento" field empty
    And I fill in the other required fields
    And I click the "Criar evento" button
    Then I should see an error message indicating that the name is required
    # Or check if the field gets an error style
    And the "Nome do evento" field should be marked as invalid

  Scenario: Cancel event creation
    When I fill in some form fields
    And I click the "Cancelar" button
    Then I should be redirected to the previous page
    # Or verify if the form was cleared
    # And the "Nome do evento" field should be empty

