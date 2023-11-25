Feature: Kraken Scenarios

@user1 @web
Scenario: Pruebas extremo a extremo

# Escenario 42: Crear pagina con titulo que tiene 256 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create new pages with Datapool Aleatorio limitesuperior
  And I wait for 2 seconds
  Then I publish the pages error
  And I wait for 2 seconds
  And I cancel pages
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds