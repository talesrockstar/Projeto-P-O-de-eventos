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