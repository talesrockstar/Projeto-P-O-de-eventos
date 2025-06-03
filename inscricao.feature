Feature: Button operation and page redirection

    Scenario: Click on the back button
        Given I am on the registration page
        When I click the back button
        Then I should be redirected to the initial page

    Scenario: Click on the profile button
        Given I am on the registration page
        When I click the profile button
        And I click the "Ver Perfil" button
        Then I should be redirected to the profile page

    Scenario: Click on the buy ticket button
        Given I am on the registration page
        When I click the buy ticket button
        Then I should be redirected for the ticket type buttons

    Scenario: Click on the show more button
        Given I am on the registration page
        When I click the show more button
        Then I should see the description text normally
        And I should see the show less button

    Scenario: Click on the show less button
        Given I am on the registration page
        And I see the description text normally
        When I click the show less button
        Then I should see the short text
        And I should see the show more button

    Scenario: Click on the ticket type button
        Given I am on the registration page
        When I click the ticket type button
        Then I should see the page to choose half or full ticket

    Scenario: Click on the confirm purchase button
        Given I am on the registration page
        When I click the ticket type button
        And I choose half or full ticket
        And I click the confirm purchase button
        Then I should be redirected to the initial page

Feature: Validation field

    Scenario: Invalid half or full field
        Given I am on the registration page
        When I click the ticket type button
        And I don't choose half or full ticket
        And I should see the confirm purchase button disabled

    Scenario: Valid half or full field
        Given I am on the registration page
        When I click the ticket type button
        And I choose half or full ticket
        And I should see the confirm purchase button enabled