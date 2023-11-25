# Escenario 18

Feature: Editar un miembro

@user1 @web
Scenario: Pruebas extremo a extremo

  # Escenario 18: Editar un miembro, dato de correo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with name "Test Member" and email "member@uniandes.edu.co"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  And I click on the member with name "Test Member"
  And I wait for 2 seconds
  And I fill a new member with name "Test Member" and email "edited-member@uniandes.edu.co"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  Then I should see a member with name "Test Member" and email "edited-member@uniandes.edu.co"
  And I wait for 2 seconds
  # Tear down
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds



