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

    Scenario: Click on the see feedbacks button
        Given I am on the event page
        When I click the see feedbacks button
        Then I should be redirected to the see feedbacks page

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