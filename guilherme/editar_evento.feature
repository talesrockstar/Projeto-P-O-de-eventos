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

    Scenario: Click on the cancel event button
        Given I am on the event page
        When I click the cancel event button
        Then I should be see a modal

    Scenario: Click on the confirm cancellation button
        Given I am on the event page
        When I click the cancel event button
        And I click the confirm cancellation button
        Then I should be redirected to the initial page

    Scenario: Click on the edit event button
        Given I am on the event page
        When I click the edit event button
        Then I should be redirected to the edit event page