# Escenario 4

Feature: DespublicarPost

@user1 @web
Scenario: Pruebas extremo a extremo
  # Escenario 4: Despublicar un post
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 5 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 4" and body "Test Body scenario 4"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with title "Test Post scenario 4" and status "Published"
  And I wait for 2 seconds
  And I click on the post with title "Test Post scenario 4"
  And I wait for 2 seconds
  And I unpublish the post
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  Then I should see a post with title "Test Post scenario 4" and status "Draft"
  And I wait for 2 seconds
  And I delete the post with title "Test Post scenario 4"
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

