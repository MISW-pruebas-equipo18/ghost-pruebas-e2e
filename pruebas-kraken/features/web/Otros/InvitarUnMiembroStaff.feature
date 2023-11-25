# Escenario 19
Feature: Kraken Scenarios

@user1 @web
Scenario: Pruebas extremo a e
  # Escenario 19: Staff, Invitar un miembro al staff
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to staff view
  And I wait for 2 seconds
  And I click on invite people button
  And I wait for 2 seconds
  And I fill the invite form for an admin user with email "new-member@uniandes.edu.co"
  And I wait for 2 seconds
  And I click on send invitation now button
  And I wait for 5 seconds
  And I reload the page
  And I wait for 5 seconds
  Then I should see a new invited user with email "new-member@uniandes.edu.co"
  And I wait for 2 seconds
  # Tear down
  And I revoke all invitations
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds