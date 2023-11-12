Feature: Kraken Scenarios

# http://localhost:2368/ghost/

@user1 @web
Scenario: Pruebas exploratorias
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I login with "<USERNAME>" user and "<PASSWORD>" password

  # Scenario 1

  # Scenario 2


