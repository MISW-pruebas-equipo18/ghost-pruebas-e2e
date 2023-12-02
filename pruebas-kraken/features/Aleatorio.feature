Feature: Escenarios aleatorios

@user1 @web
Scenario: Escenarios Aleatorios

  # Crear y editar un post con título y body aleatorio
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$string_1"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  And I wait for 2 seconds
  Then I should see a post with random title "$$string_1" and status "Published"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Crear un post con título y body aleatorios y luego eliminarlo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$string_3"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$string_3" and status "Published"
  And I wait for 2 seconds
  And I delete the post with random title "$$string_3"
  And I wait for 5 seconds
  Then I should not see a post with random title "$$string_3"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Poner un post como draft con título y body aleatorios y luego publicarlo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$string_7"
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$string_7" and status "Draft"
  And I wait for 2 seconds
  And I click on the post with random title "$$string_7"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$string_7" and status "Published"
  And I wait for 2 seconds
  And I delete the post with random title "$$string_7"
  And I wait for 2 seconds
  Then I should not see a post with random title "$$string_7"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Crear un post con título y body aleatorios y luego despubliacrlo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 5 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$string_5"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$string_5" and status "Published"
  And I wait for 2 seconds
  And I click on the post with random title "$$string_5"
  And I wait for 2 seconds
  And I unpublish the post
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  Then I should see a post with random title "$$string_5" and status "Draft"
  And I wait for 2 seconds
  And I delete the post with random title "$$string_5"
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Eliminar un post creado con datos aleatorios
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$string_1"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  When I delete the post with random title "$$string_1"
  And I wait for 2 seconds
  Then I should not see a post with random title "$$string_1"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds


  # Crear un miembro con nombre e email aleatorios
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$string_10" and email "$email_10"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  Then I should see a member with random name "$$string_10" and email "$$email_10"
  And I wait for 2 seconds
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Crear un miembro con nombre aleatorio y un email inválido
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$string_20" and email "$string_21"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  Then I should see an invalid email message
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  And I close the unsaved window
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Crear un miembro con nombre vacío y un email aleatorio
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name empty and email "$email_22"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  Then I should see a member with random name "$$email_22"
  And I wait for 2 seconds
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Editar un miembro con nombre e email aleatorios
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$string_11" and email "$email_11"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  And I click on the member with random name "$$string_11"
  And I wait for 2 seconds
  And I fill a new member with random name "$string_12" and email "$email_12"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  Then I should see a member with random name "$$string_12" and email "$$email_12"
  And I wait for 2 seconds
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Editar un miembro con nombre aleatorio e email inválido
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$string_23" and email "$email_24"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on the member with random name "$$string_23"
  And I wait for 2 seconds
  And I fill a new member with random name "$string_24" and email "$string_25"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  Then I should see an invalid email message
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  And I close the unsaved window
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Editar un miembro con nombre vacío e email aleatorio
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$string_26" and email "$email_27"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on the member with random name "$$string_26"
  And I wait for 2 seconds
  And I fill a new member with random name empty and email "$email_28"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  Then I should see a member with random name "$$email_28"
  And I wait for 2 seconds
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Eliminar un miembro creado con datos aleatorios
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$string_1" and email "$email_1"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I delete the member with random name "$$string_1"
  And I wait for 2 seconds
  Then I should not see a member with random name "$$string_1"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds



  # Crear un tag con nombre y descripción aleatorias
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new random tag with name "$string_1"
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  Then I validate random tag with name "$$string_1"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Crear un tag con nombre aleatorio y descripción inválida
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new random tag with name "$string_1" and invalid description
  And I wait for 2 seconds
  Then I should see an invalid description message
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I close the unsaved window
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Crear un tag con nombre inválido y descripción aleatoria
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new random tag with invalid name
  And I wait for 2 seconds
  Then I should see an invalid name message
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I close the unsaved window
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Editar un tag con un nombre y descripción aleatorias
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new random tag with name "$string_1"
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I select the tag with random name "$$string_1"
  And I wait for 2 seconds
  And I edit the tag with random name "$string_2" and description "$string_3"
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  Then I validate random tag with name "$$string_2"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Editar un tag con un nombre aleatorio y una descripción inválida
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new random tag with name "$string_1"
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I select the tag with random name "$$string_1"
  And I wait for 2 seconds
  And I edit the tag with random name "$string_2" and invalid description 
  And I wait for 2 seconds
  Then I should see an invalid description message
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I close the unsaved window
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Editar un tag con un nombre inválido y una descripción aleatoria
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new random tag with name "$string_1"
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I select the tag with random name "$$string_1"
  And I wait for 2 seconds
  And I edit the tag with random invalid name
  And I wait for 2 seconds
  Then I should see an invalid name message
  And I wait for 2 seconds
  And I go to list tags view
  And I wait for 2 seconds
  And I close the unsaved window
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Eliminar un tag creado con datos aleatorios
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create a new random tag with name "$string_1"
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I click on the tag with random name "$$string_1"
  And I wait for 2 seconds
  And I delete the tag
  And I wait for 2 seconds
  Then I should not see a tag with random name "$$string_1"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds  

  # Crear y editar una página con título y body aleatorio
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create a random page with title "$string_1"
  And I wait for 2 seconds
  And I publish the pages
  And I wait for 2 seconds
  And I go back to editor pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 5 seconds
  Then I should see a page with random title "$$string_1" and status "Published"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Crear una página con título y body aleatorios y luego eliminarlo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  And I go to new pages view
  And I wait for 2 seconds
  And I create a random page with title "$string_3"
  And I wait for 2 seconds
  And I publish the pages
  And I wait for 2 seconds
  When I go back to editor pages
  And I wait for 1 seconds
  And I go back to list pages view
  And I wait for 2 seconds
  And I should see a page with random title "$$string_3" and status "Published"
  And I wait for 2 seconds
  And I delete the page with random title "$$string_3"
  And I wait for 5 seconds
  Then I should not see a page with random title "$$string_3"
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Poner una página como draft con título y body aleatorios y luego publicarlo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create a random page with title "$string_1"
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 2 seconds
  And I should see a page with random title "$$string_1" and status "Draft"
  And I wait for 2 seconds
  And I click on the page with random title "$$string_1"
  And I wait for 2 seconds
  And I publish the pages
  And I wait for 2 seconds
  And I go back to editor pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 2 seconds
  Then I should see a page with random title "$$string_1" and status "Published"
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds


  # Crear una página con título y body aleatorios y luego despubliacrlo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create a random page with title "$string_1"
  And I wait for 2 seconds
  And I publish the pages
  And I wait for 2 seconds
  And I go back to editor pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 2 seconds
  And I should see a page with random title "$$string_1" and status "Published"
  And I wait for 2 seconds
  And I click on the page with random title "$$string_1"
  And I wait for 2 seconds
  And I unpublish the pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 2 seconds
  Then I should see a page with random title "$$string_1" and status "Draft"
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Eliminar una página creada aleatoriamente
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I go to list pages view
  And I wait for 2 seconds
  And I go to new pages view
  And I wait for 2 seconds
  And I create a random page with title "$string_1"
  And I wait for 2 seconds
  And I publish the pages
  And I wait for 2 seconds
  When I go back to editor pages
  And I wait for 1 seconds
  And I go back to list pages view
  And I wait for 2 seconds
  When I delete the page with random title "$$string_1"
  And I wait for 2 seconds
  Then I should not see a page with random title "$$string_1"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
