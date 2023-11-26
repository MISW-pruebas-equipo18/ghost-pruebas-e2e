Feature: Kraken Scenarios

@user1 @web
Scenario: Pruebas extremo a extremo con datos apriori archivo json elaborado con mockaroo

  # Escenario : logins
  Given I login to Ghost from data CSV and "<URLLOGIN>" url
  And I wait for 2 seconds
  Then I login to Ghost from data CSV and "<URLLOGIN>" url
  And I wait for 2 seconds
  Then I login to Ghost from data CSV and "<URLLOGIN>" url
  And I wait for 2 seconds



