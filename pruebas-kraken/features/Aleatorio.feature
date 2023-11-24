Feature: Kraken Scenarios

@user1 @web
Scenario: Pruebas extremo a extremo

# Escenario 41: Crear pagina con valores de frontera
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create new pages with Datapool Aleatorio limitesuperior
  And I wait for 2 seconds
  And I publish the pages
  And I wait for 2 seconds
  And I go back to editor pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 5 seconds