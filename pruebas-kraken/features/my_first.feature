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
  And I write a post with title "    " and body "    "
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  Then I should see a post with title "(Untitled)" and status "Published"
  And I wait for 2 seconds
  When I click on the post with title "(Untitled)"
  And I write a post with title "Test Post scenario 1" and body "Test Body scenario 1"
  And I wait for 2 seconds
  And I update the post
  And I go back to posts view
  Then I should see a post with title "Test Post scenario 1" and status "Published"
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

  # Escenario 4: Verificar el Listado de Posts Inicial
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  When I go to posts view
  And I delete all remaining posts
  And I wait for 2 seconds
  Then I should see 0 posts
  And I wait for 5 seconds
  When I go to new post view
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 4.1" and body "Test Body scenario 4.1"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  Then I should see 1 posts
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a post with title "Test Post scenario 4.2 DRAFT" and body "Test Body scenario 4.2 DRAFT"
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  Then I should see 2 posts
  And I wait for 2 seconds
  When I delete the post with title "Test Post scenario 4.1"
  And I wait for 2 seconds
  Then I should see 1 posts
  # Tear down
  And I delete all remaining posts
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds


  # Escenario 5: Crear un tag
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
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
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
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
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
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

  # Escenario 9: publicar una página
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create new pages with title "Pagina desde kraken" and body "contenido aletorio para este campo de pagina"
  And I wait for 2 seconds
  And I publish the pages
  And I wait for 2 seconds
  And I go back to editor pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 5 seconds
  Then I should see a post with title "Pagina desde kraken" and status "Published"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 11: editar una página
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  And I validate pages with name "Pagina desde kraken"
  When I selected pages with name "Pagina desde kraken"
  And I update pages with new title "Modificado desde kraken"
  And I wait for 2 seconds
  And I go back to list pages view
  And I validate pages with name "Modificado desde kraken"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 12: des-publicar una página
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  And I validate pages with name "Modificado desde kraken"
  When I selected pages with name "Modificado desde kraken"
  And I unpublish the pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 2 seconds
  Then I should see a pages with title "Modificado desde kraken"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
  

  # Escenario 15: Cambio de contraseña, datos incorrectos
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  When I go to profile view
  And I wait for 2 seconds
  And I update my password with empty fields
  And I submit the password update form
  And I wait for 2 seconds
  Then I should see an empty password fields error message
  And I wait for 2 seconds
  When I update my password with a wrong old password
  And I submit the password update form
  And I wait for 2 seconds
  Then I should see a message that the old password is wrong
  And I wait for 2 seconds
  When I update my password with a new insecure password
  And I submit the password update form
  And I wait for 2 seconds
  Then I should see a password security error message
  And I wait for 2 seconds
  When I update my password with a short new password
  And I submit the password update form
  And I wait for 2 seconds
  Then I should see a password length error message
  And I wait for 2 seconds
  # Tear down
  And I logout
  And I wait for 5 seconds


  # Escenario 16: Cambio de nombre o Alias del Staff
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  When I go to profile view
  And I wait for 2 seconds
  And I update my slug name with "new-username"
  And I wait for 2 seconds
  Then I should see that the profile URL ends with "new-username"
  # Tear down
  And I update my slug name with "cristobal"
  And I logout
  And I wait for 5 seconds

  # Escenario 17: Agregar un nuevo miembro
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
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
  Then I should see a member with name "Test Member" and email "member@uniandes.edu.co"
  And I wait for 2 seconds
  # Tear down
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  # Escenario 18: Editar un miembro, dato de correo
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
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

  # Escenario 19: Staff, Invitar un miembro al staff
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
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

  # Escenario 20: Staff, los comentarios deberian estar activos en la seccion de
  # notificaciones de correo del profile del owner
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password
  And I wait for 2 seconds
  When I go to staff view
  And I wait for 2 seconds
  And I click on view owner profile button
  And I wait for 2 seconds
  Then I should see that the comments are enabled
  And I wait for 2 seconds
  # Tear down
  And I logout
  And I wait for 5 seconds
  
