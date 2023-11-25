# Escenario 1

Feature: PublicarEditarPost

@user1 @web
Scenario: Pruebas extremo a extremo

# Escenario 1: Publicar y editar un Post
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a post with title "    " and body "    "
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with title "(Untitled)" and status "Published"
  And I wait for 2 seconds
  And I click on the post with title "(Untitled)"
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 1" and body "Test Body scenario 1"
  And I wait for 2 seconds
  And I update the post
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  Then I should see a post with title "Test Post scenario 1" and status "Published"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
