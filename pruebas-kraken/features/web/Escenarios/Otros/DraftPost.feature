# Escenario 3

Feature: Draft Post

@user1 @web
Scenario: Pruebas extremo a extremo
  # Escenario 3: Draft un Post
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 3 DRAFT" and body "Test Body scenario 3 DRAFT"
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with title "Test Post scenario 3 DRAFT" and status "Draft"
  And I wait for 2 seconds
  And I click on the post with title "Test Post scenario 3 DRAFT"
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 3" and body "Test Body scenario 3"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with title "Test Post scenario 3" and status "Published"
  And I wait for 2 seconds
  And I delete the post with title "Test Post scenario 3"
  And I wait for 2 seconds
  Then I should not see a post with title "Test Post scenario 3"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds