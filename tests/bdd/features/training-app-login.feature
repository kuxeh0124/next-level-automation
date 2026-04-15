Feature: Training app login

  Scenario: Standard user signs in successfully
    Given the user is on the training app login page
    When the user signs in as a standard user
    Then the sign in action should complete successfully
