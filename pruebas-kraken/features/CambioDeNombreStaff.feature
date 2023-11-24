# Escenario 16

Feature: Cambio de nombre staff

@user1 @web
Scenario: Pruebas extremo a extremo
  # Escenario 16: Cambio de nombre o Alias del Staff
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to profile view
  And I wait for 2 seconds
  And I update my slug name with "new-username"
  Then I should see that the profile URL ends with "new-username"
  And I wait for 2 seconds
  # Tear down
  And I update my slug name with "alberto"
  And I wait for 2 seconds
  And I go back to profile
  And I wait for 2 seconds
  And I go back to dashboard view
  And I logout
  And I wait for 5 seconds
