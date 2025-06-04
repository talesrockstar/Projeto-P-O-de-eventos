# ==========================================================
# Arquivo de cenários de aceitação para a Home do Plannea
# ==========================================================
# Este arquivo descreve os principais fluxos de uso e critérios
# de aceitação para a página inicial da plataforma Plannea,
# incluindo navegação, busca, acessibilidade e interação com carrosséis.

Feature: Plannea Home Page

  # Contexto: História do usuário para a home
  # ------------------------------------------
  # Como visitante, quero navegar, pesquisar e interagir com eventos
  # para encontrar informações e explorar funcionalidades de forma acessível.

  As a visitor to the Plannea website
  I want to browse, search, and interact with events
  So I can find information and explore features in an accessible way

  Background:
    # Garante que todos os cenários começam na página inicial (sem login)
    Given I access the home page without logging in

  # =========================
  # Elementos visuais e layout
  # =========================
  Scenario: View main elements of the page
    # Verifica a presença dos principais elementos da interface
    Then I should see the title "Plannea" in the sidebar
    And I should see the search field
    And I should see the "Sign Up" and "Login" buttons
    And I should see the title "Featured Event"
    And I should see the featured image carousel
    And I should see the title "Past Events"
    And I should see the past events card carousel

  # =========================
  # Interação com carrosséis
  # =========================
  Scenario: Navigate through the featured image carousel
    # Testa a navegação no carrossel principal de imagens
    Given the image carousel is visible
    When I click the "Next" button on the image carousel
    Then the next slide should be displayed
    When I click the "Previous" button on the image carousel
    Then the previous slide should be displayed
    When I click on a slide indicator
    Then the corresponding slide should be displayed

  Scenario: Navigate through the past events card carousel
    # Testa a navegação no carrossel customizado de cards
    Given the card carousel is visible
    When I click the "Next" button on the card carousel
    Then the carousel should scroll to the right showing new cards
    When I click the "Previous" button on the card carousel
    Then the carousel should scroll to the left showing previous cards

  # =========================
  # Funcionalidade de busca
  # =========================
  Scenario: Search for events using the search field
    # Testa o filtro dinâmico de cards pela busca
    Given the search field is visible
    When I type "Show" in the search field
    Then I should see only the event cards that contain "Show" in the title or description
    When I clear the search field
    Then I should see all cards again

  # =========================
  # Navegação (sidebar e mobile)
  # =========================
  Scenario: Navigation through the sidebar menu (desktop)
    # Testa a navegação e destaque de links na barra lateral (desktop)
    Given I am on a desktop screen
    When I click the "Create Events" link in the sidebar
    Then the "Create Events" link should become active
    And the "Home" link should no longer be active

  Scenario: Navigation through the mobile menu
    # Testa abertura, fechamento e navegação no menu mobile
    Given I am on a mobile screen
    When I click the hamburger menu button
    Then the sidebar should be displayed
    When I click "Agenda" in the sidebar
    Then the menu should be closed
    And the "Agenda" link should become active

  # =========================
  # Acessibilidade e usabilidade
  # =========================
  Scenario: Accessibility - Skip to content link
    # Garante que o link de pular para o conteúdo funciona para navegação por teclado
    When I press the "Skip to content" link
    Then I should be directed to the main content of the page

  Scenario: Lazy loading of images
    # Verifica que as imagens só são carregadas quando visíveis (performance)
    Given there are images with lazy loading in the carousel
    When I scroll to the end of the card carousel
    Then the images should only be loaded when visible

  Scenario: Keyboard navigation in the card carousel
    # Testa acessibilidade do carrossel de cards pelo teclado
    Given the card carousel is focused
    When I press the right arrow key
    Then the carousel should scroll to the right
    When I press the left arrow key
    Then the carousel should scroll to the left