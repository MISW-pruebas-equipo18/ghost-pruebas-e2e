Feature: Kraken Scenarios

# http://localhost:2368/ghost/

@user1 @web
Scenario: Pruebas exploratorias

  # Escenario 1: Publicar y editar un Post
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 2 seconds
  And I login with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  And Title is "Dashboard"
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a new post with title "Test Post scenario 1" and body "Test Body scenario 1"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 1"
  And I wait for 5 seconds
  # Tear down
  And I delete the post with title "Test Post scenario 1" 
  And I wait for 2 seconds
  And I logout
  And I wait for 2 seconds
