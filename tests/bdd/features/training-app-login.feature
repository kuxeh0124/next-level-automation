Feature: Training app login

  Scenario: Standard user signs in successfully
    Given the user is on the training app login page
    When the user signs in as "standardUser"
    Then the user should land on the dashboard
    And the runtime MFA code should be captured

  Scenario: Invalid MFA code is rejected
    Given the user is on the training app login page
    When the user submits an invalid MFA code as "standardUser"
    Then the user should remain on the MFA challenge
