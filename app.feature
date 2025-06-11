Feature: Plannea Home Page

  As a visitor to the Plannea website
  I want to browse, search, and interact with events
  So I can find information and explore features in an accessible way

  Background:
    Given I access the home page without logging in

  Scenario: View main elements of the page
    Then I should see the title "Plannea" in the sidebar
    And I should see the search field
    And I should see the "Sign Up" and "Login" buttons
    And I should see the title "Featured Event"
    And I should see the featured image carousel
    And I should see the title "Past Events"
    And I should see the past events card carousel

 
  Scenario: Navigate through the featured image carousel
    Given the image carousel is visible
    When I click the "Next" button on the image carousel
    Then the next slide should be displayed
    When I click the "Previous" button on the image carousel
    Then the previous slide should be displayed
    When I click on a slide indicator
    Then the corresponding slide should be displayed

  Scenario: Navigate through the past events card carousel
    Given the card carousel is visible
    When I click the "Next" button on the card carousel
    Then the carousel should scroll to the right showing new cards
    When I click the "Previous" button on the card carousel
    Then the carousel should scroll to the left showing previous cards


  Scenario: Search for events using the search field
    Given the search field is visible
    When I type "Show" in the search field
    Then I should see only the event cards that contain "Show" in the title or description
    When I clear the search field
    Then I should see all cards again

  Scenario: Navigation through the sidebar menu (desktop)
    Given I am on a desktop screen
    When I click the "Create Events" link in the sidebar
    Then the "Create Events" link should become active
    And the "Home" link should no longer be active

  Scenario: Navigation through the mobile menu
    Given I am on a mobile screen
    When I click the hamburger menu button
    Then the sidebar should be displayed
    When I click "Agenda" in the sidebar
    Then the menu should be closed
    And the "Agenda" link should become active


  Scenario: Accessibility - Skip to content link
    When I press the "Skip to content" link
    Then I should be directed to the main content of the page

  Scenario: Lazy loading of images
    Given there are images with lazy loading in the carousel
    When I scroll to the end of the card carousel
    Then the images should only be loaded when visible

  Scenario: Keyboard navigation in the card carousel
    Given the card carousel is focused
    When I press the right arrow key
    Then the carousel should scroll to the right
    When I press the left arrow key
    Then the carousel should scroll to the left


    
      Scenario: Successful login
    Given I am on the login page
    When I fill the email field with "wdwag@example.com"
    And I fill the password field with "12345678"
    And I click the login button
    And I click the password recovery link
    Then I should be authenticated or see the next screen

  Scenario: Login with empty fields
    Given I am on the login page
    And the email and password fields are empty
    When I click the login button
    Then I should see an error message or remain on the page

  Scenario: Successful registration
    Given I am on the registration page
    When I fill the address field with "Rua Exemplo, 123"
    And I fill the phone field with "71999999999"
    And I fill the name field with "João da Silva"
    And I fill the email field with "wdwag@example.com"
    And I fill the password field with "12345678"
    And I click to change the photo
    And I click the register button
    Then I should be registered or see a confirmation

  Scenario: Registration with empty fields
    Given I am on the registration page
    And all fields are empty
    When I click the register button
    Then I should see an error message or remain on the page

  Scenario: Successful password reset
    Given I am on the password reset page
    When I fill the email field with "wdwag@example.com"
    And I click the reset password button
    Then I should see a reset confirmation

  Scenario: Password reset with empty field
    Given I am on the password reset page
    And the email field is empty
    When I click the reset password button
    Then I should see an error message or remain on the page






Feature: Filtros página de meus eventos

  Scenario: status filter
    Given I am on the my events page
    And I click on the status button 
    And I select "Futuro"
    Then I should see only the "Eventos Futuro" section

  Scenario: Local filter
    Given I am on the my events page
    And I click on the "Local" button
    And I select "Salvador, BA"
    Then I should see only events with "Salvador, BA"

  Scenario: Type filter
    Given I am on the my events page
    And I click on the "Tipo" button
    And I select "Show"
    Then I should see only events with "Show"




    Feature: Button operation and page redirection

    Scenario: Click on the back button
        Given I am on the event page
        When I click the back button
        Then I should be redirected to the initial page

    Scenario: Click on the profile button
        Given I am on the event page
        When I click the profile button
        And I click the "Ver Perfil" button
        Then I should be redirected to the profile page

    Scenario: Click on the buy ticket button
        Given I am on the event page
        When I click the buy ticket button
        Then I should be redirected for the ticket type buttons

    Scenario: Click on the show more button
        Given I am on the event page
        When I click the show more button
        Then I should see the description text normally
        And I should see the show less button

    Scenario: Click on the show less button
        Given I am on the event page
        And I see the description text normally
        When I click the show less button
        Then I should see the short text
        And I should see the show more button

    Scenario: Click on the ticket type button
        Given I am on the event page
        When I click the ticket type button
        Then I should see the page to choose half or full ticket

    Scenario: Click on the confirm purchase button
        Given I am on the event page
        When I click the ticket type button
        And I choose half or full ticket
        And I click the confirm purchase button
        Then I should be redirected to the initial page

Feature: Validation field

    Scenario: Invalid half or full field
        Given I am on the event page
        When I click the ticket type button
        And I don't choose half or full ticket
        And I should see the confirm purchase button disabled

    Scenario: Valid half or full field
        Given I am on the event page
        When I click the ticket type button
        And I choose half or full ticket
        And I should see the confirm purchase button enabled




Feature: Event page creation

    Scenario: Enter the website
        Given the user accesses the event creation page
        Then the user goes to the event creation page
        And clicks on create event

    Scenario: Start creating the event
        Given the user accesses the event creation page
        Then the user will be redirected to the page
        And the user starts filling in the spaces
        And enters the event title
        And enters the detailed description of the event
        And enters the start and end date and time
        And enters the location
        And enters the cover image, choosing a file from their own computer
        And enters the event type
        And enters the maximum capacity of participants
        Then after everything is filled in, the user can Save or Delete the event

    Scenario: If any field is not filled in
        Given the user accesses the event creation page
        When the user tries to save, an error will occur
        And the file will not be saved
        Then the execution will not be carried out

    Scenario: If everything is filled in correctly
        Given the user accesses the event creation page
        When the user finishes filling in all the fields
        And the event is saved
        Then the execution will be successful, a success mensage appears





        Feature: Sidebar and Header of the Plannea Application
  As a user of the Plannea application,
  I want to interact with the sidebar and the header
  To navigate the application and access information.

    Background: Accessing the main page
    Given I am on the application's home page

  Scenario: Sidebar view on Desktop
    When I am viewing on a desktop device
    Then the sidebar should be visible by default
    And the mobile menu button should not be visible

  Scenario: Interaction with sidebar links on Desktop
    When I am viewing on a desktop device
    And I click the "Create events" link in the sidebar
    Then the "Create events" link should be marked as active
    And the "Home" link should not be marked as active

  Scenario: Initial view on Tablet/Mobile
    When I am viewing on a tablet or mobile device
    Then the sidebar should be hidden by default
    And the mobile menu button "☰" should be visible

  Scenario Outline: Open and close mobile menu using the button
    When I am viewing on a <DeviceType> device
    And I click the mobile menu button
    Then the sidebar should become visible
    And the overlay should become visible
    And the mobile menu button should display "✕"
    When I click the mobile menu button again
    Then the sidebar should become hidden
    And the overlay should not be visible
    And the mobile menu button should display "☰"


  Scenario Outline: Close mobile menu using the overlay
    When I am viewing on a <DeviceType> device
    And I click the mobile menu button to open the menu
    And I click the overlay outside the sidebar
    Then the sidebar should become hidden
    And the overlay should not be visible


  Scenario Outline: Close mobile menu by clicking a link
    When I am viewing on a <DeviceType> device
    And I click the mobile menu button to open the menu
    And I click the "Event Details" link in the sidebar
    Then the sidebar should become hidden
    And the "Event Details" link should be marked as active


  Scenario: Interaction with the search bar
    When I type "June Festival" in the header search field
    Then the search field should contain "June Festival"






Feature: Tela de feedback

  Scenario: Carregar os elementos da tela corretamente
    Given the user accesses the feedback page
    Then the logo should display "Plannea"
    And the avatar should have the image "src/img/imagem do figma.png"
    And the avatar name should be "Thomas"
    And the "Nome" field should be present with placeholder "Digite seu nome"
    And the "Email" field should be present with placeholder "Digite seu email"
    And the text "Escolha seu nível de satisfação:" should be present
    And there should be 5 satisfaction stars
    And the comment field should have the placeholder "Adicione um comentário..."
    And the "Enviar" button should be present
    And the "Cancelar" button should be present
    And the event name should be "O Céu da Língua"
    And the event description should contain "Gregorio Duvivier tem na língua portuguesa não somente uma pátria mas uma obsessão."

  Scenario: Preencher o formulário, enviar e verificar respostas
    Given the user accesses the feedback page
    When the user fills the name with "João Silva"
    And fills the email with "Joaosilva123@gmail.com"
    And selects 3 satisfaction stars
    And fills the comment with "Ótimo evento, aprendi muito!"
    And clicks the "Enviar" button
    Then the user should be redirected to the feedback answered page
    And the displayed name should be "João Silva"
    And the displayed email should be "Joaosilva123@gmail.com"
    And 3 stars should be selected
    And the displayed comment should be "Ótimo evento, aprendi muito!"
    When the user clicks the "Voltar" button
    Then the user should return to the feedback page

  Scenario: Preencher o formulário e cancelar
    Given the user accesses the feedback page
    When the user fills the name with "João Silva"
    And fills the email with "Joaosilva123@gmail.com"
    And selects 4 satisfaction stars
    And fills the comment with "Ótimo evento, aprendi muito!"
    And clicks the "Cancelar" button
    Then the name field should be empty
    And the email field should be empty
    And no stars should be selected
    And the comment field should be empty







Feature: Página de Perfil

  Scenario: Renderizar os campos principais
    Given the user visits the profile page
    Then the "Nome" field should be disabled with value "Thomas"
    And the "Email" field should be disabled with value "thomas123@gmail.com"
    And the "Senha" field should be disabled with value "********"
    And the "Endereço" field should be disabled with value "Rua das Acácias, 123 - Bairro Jardim das Flores"
    And the "Telefone" field should be disabled with value "(31) 99876-5432"

  Scenario: Permitir edição de um campo e retornar ao estado desabilitado
    Given the user visits the profile page
    When the user clicks the edit button for the "Nome" field
    Then the "Nome" field should be enabled
    When the user changes the "Nome" field to "Carlos"
    And clicks the edit button again for the "Nome" field
    Then the "Nome" field should be disabled with value "Carlos"

  Scenario: Simular clique em "Alterar foto"
    Given the user visits the profile page
    When the user clicks the "Change photo" button
    Then the photo change action should be triggered

  Scenario: Todos os botões de edição devem funcionar
    Given the user visits the profile page For each field in "Nome", "Email", "Senha", "Endereço", "Telefone":
      When the user clicks the edit button for the field
      Then the field should be enabled
      When the user types " test" in the field
      And clicks the edit button again for the field
      Then the field should be disabled









