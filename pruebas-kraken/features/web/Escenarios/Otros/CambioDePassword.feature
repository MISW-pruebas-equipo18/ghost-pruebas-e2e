# Escenario 15


Feature: Cambio de password

@user1 @web
Scenario: Pruebas extremo a extremo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to profile view
  And I wait for 2 seconds
  And I click on change password button
  And I wait for 2 seconds
  And I update my password with empty fields
  And I wait for 2 seconds
  And I submit the password update form
  And I wait for 2 seconds
  And I should see an empty password fields error message
  And I wait for 2 seconds
  And I update my password with a wrong old password
  And I submit the password update form
  And I wait for 2 seconds
  And I should see a message that the old password is wrong
  And I wait for 2 seconds
  And I update my password with a new insecure password
  And I submit the password update form
  And I wait for 2 seconds
  And I should see a password security error message
  And I wait for 2 seconds
  And I update my password with a short new password
  And I submit the password update form
  And I wait for 2 seconds
  Then I should see a password length error message
  And I wait for 2 seconds
  And I go back to profile
  And I wait for 2 seconds
  And I go back to dashboard view
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds
