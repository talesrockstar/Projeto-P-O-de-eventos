# language: en

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

    Examples:
      | DeviceType |
      | tablet     |
      | mobile     |

  Scenario Outline: Close mobile menu using the overlay
    When I am viewing on a <DeviceType> device
    And I click the mobile menu button to open the menu
    And I click the overlay outside the sidebar
    Then the sidebar should become hidden
    And the overlay should not be visible

    Examples:
      | DeviceType |
      | tablet     |
      | mobile     |

  Scenario Outline: Close mobile menu by clicking a link
    When I am viewing on a <DeviceType> device
    And I click the mobile menu button to open the menu
    And I click the "Event Details" link in the sidebar
    Then the sidebar should become hidden
    And the "Event Details" link should be marked as active

    Examples:
      | DeviceType |
      | tablet     |
      | mobile     |

  Scenario: Interaction with the search bar
    When I type "June Festival" in the header search field
    Then the search field should contain "June Festival"

