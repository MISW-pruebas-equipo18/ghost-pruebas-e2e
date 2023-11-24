# Escenario 20
Feature: Kraken Scenarios

@user1 @web
Scenario: Pruebas extremo a extremo
  # Escenario 20: Staff, los comentarios deberian estar activos en la seccion de
  # notificaciones de correo del profile del owner
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to staff view
  And I wait for 2 seconds
  And I click on view owner profile button
  And I wait for 2 seconds
  Then I should see that the comments are enabled
  And I wait for 2 seconds
  # Tear down
  And I wait for 2 seconds
  And I go back to profile
  And I wait for 2 seconds
  And I go back to dashboard view
  And I logout
  And I wait for 5 seconds