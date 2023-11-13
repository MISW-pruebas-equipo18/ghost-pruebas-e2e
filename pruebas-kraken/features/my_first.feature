Feature: Kraken Scenarios

@user1 @web
Scenario: Pruebas extremo a extremo

# Escenario 1: Publicar y editar un Post
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 1" and body "Test Body scenario 1"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 1" and status "Published"
  And I wait for 2 seconds
  When I click on the post with title "Test Post scenario 1"
  And I write a post with title "Test Post scenario 1 EDIT" and body "Test Body scenario 1 EDIT"
  And I wait for 2 seconds
  And I update the post
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 1 EDIT" and status "Published"
  And I wait for 5 seconds
  # Tear down
  And I delete all remaining posts
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 2: Publicar, Editar y Borrar  un Post
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 2" and body "Test Body scenario 2"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 2" and status "Published"
  And I wait for 2 seconds
  When I click on the post with title "Test Post scenario 2"
  And I write a post with title "Test Post scenario 2 EDIT" and body "Test Body scenario 2 EDIT"
  And I wait for 2 seconds
  And I update the post
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 2 EDIT" and status "Published"
  And I wait for 2 seconds
  When I delete the post with title "Test Post scenario 2 EDIT"
  And I wait for 2 seconds
  Then I should not see a post with title "Test Post scenario 2 EDIT"
  And I wait for 5 seconds
  # Tear down
  And I delete all remaining posts
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 3: Publicar, Editar y Borrar  un Post
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 3 DRAFT" and body "Test Body scenario 3 DRAFT"
  And I wait for 2 seconds
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 3 DRAFT" and status "Draft"
  And I wait for 2 seconds
  When I click on the post with title "Test Post scenario 3 DRAFT"
  And I write a post with title "Test Post scenario 3" and body "Test Body scenario 3"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 3" and status "Published"
  And I wait for 2 seconds
  When I delete the post with title "Test Post scenario 3"
  And I wait for 2 seconds
  Then I should not see a post with title "Test Post scenario 3"
  And I wait for 5 seconds
  # Tear down
  And I delete all remaining posts
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 5: Crear un tag
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 5 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new tag with name "kraken" and description "tag creado desde kraken" and color "a51d2d"
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  Then I validate tag with name "kraken"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 6: editar un tag
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 5 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I validate tag with name "kraken"
  When I selected tag with name "kraken"
  And I update tag with new name "ajuste"
  And I go to list tags view
  Then I validate tag with name "ajuste"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 7: eliminar un tag
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  And I wait for 5 seconds
  And I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 5 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I validate tag with name "ajuste"
  When I selected tag with name "ajuste"
  And I delete tag with name "ajuste"
  And I go to list tags view
  Then I validate delete tag with name "ajuste"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
  