Feature: Kraken Scenarios

@user1 @web
Scenario: Pruebas extremo a extremo con datos pseudoaletorios con mockaroo

# Escenario 42: Crear pagina con titulo que tiene 256 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create new pages with Datapool pseudoAleatorio limitesuperior
  And I wait for 2 seconds
  Then I publish the pages error
  And I wait for 2 seconds
  And I cancel pages
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 43: Crear pagina con titulo que tiene 254 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create new pages with Datapool pseudoAleatorio limitesuperiorAnt
  And I wait for 2 seconds
  Then I publish the pages  
  And I wait for 2 seconds
  And I go back to editor pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
  
# Escenario 44: Crear pagina con valores validos de frontera
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I go to new pages view
  And I wait for 2 seconds
  And I create new pages with Datapool pseudoAleatorio valido
  And I wait for 2 seconds
  Then I publish the pages
  And I wait for 2 seconds
  And I go back to editor pages
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 46: Editar pagina con un titulo que tiene 256 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I click firts pages
  And I wait for 2 seconds
  And I create new pages with Datapool pseudoAleatorio limitesuperior
  And I wait for 2 seconds
  Then I update the pages error
  And I wait for 2 seconds
  And I cancel pages
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
  
# Escenario 47: Editar pagina con un titulo que tiene 254 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I click firts pages
  And I wait for 2 seconds
  And I create new pages with Datapool pseudoAleatorio limitesuperiorAnt
  And I wait for 2 seconds
  Then I publish update pages valid
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 48: Editar pagina con valores validos de frontera
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  And I go to list pages view
  And I wait for 2 seconds
  When I click firts pages
  And I wait for 2 seconds
  And I create new pages with Datapool pseudoAleatorio valido
  And I wait for 2 seconds
  Then I publish update pages valid
  And I wait for 2 seconds
  And I go back to list pages view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds  

# Escenario 50: Crear tag con valores de frontera
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create new tag with Datapool pseudoAleatorio valido
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 51: Crear tag con nombre de 190 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create new tag with Datapool pseudoAleatorio limitesuperiorAnt
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 52: Crear tag con nombre de 192 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create new tag with Datapool pseudoAleatorio limitesuperior
  And I wait for 2 seconds
  Then I publish tag error
  And I wait for 2 seconds
  And I cancel tag
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 57: Crear tag con una descripcion valida
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create new tag descripcion with Datapool pseudoAleatorio valido
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 58: Crear tag con una descripcion de 499 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create new tag descripcion with Datapool pseudoAleatorio limitesuperiorAnt
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 59: Crear tag una descripcion de 501 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I go to new tags view
  And I wait for 2 seconds
  And I create new tag descripcion with Datapool pseudoAleatorio limitesuperior
  And I wait for 2 seconds
  Then I publish tag error
  And I wait for 2 seconds
  And I cancel tag
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds
      
# Escenario 54: Editar tag con nombre a valores validos
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I click firts tag
  And I wait for 2 seconds
  And I create new tag with Datapool pseudoAleatorio valido
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
  
 # Escenario 55: Editar tag con nombre a 190 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I click firts tag
  And I wait for 2 seconds
  And I create new tag with Datapool pseudoAleatorio limitesuperiorAnt
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
  
# Escenario 56: Editar tag con nombre a 192 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I click firts tag
  And I wait for 2 seconds
  And I create new tag with Datapool pseudoAleatorio limitesuperior
  And I wait for 2 seconds
  Then I publish tag error
  And I wait for 2 seconds
  And I cancel tag
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds
      
# Escenario 45: Editar tag la descripción a valores validos
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I click firts tag
  And I wait for 2 seconds
  And I create new tag descripcion with Datapool pseudoAleatorio valido
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds
  
# Escenario 49: Editar tag la descripción 499 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I click firts tag
  And I wait for 2 seconds
  And I create new tag descripcion with Datapool pseudoAleatorio limitesuperiorAnt
  And I wait for 2 seconds
  Then I create tag valid
  And I go to list tags view
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

# Escenario 53: Editar tag la descripción 501 caracteres
  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to list tags view
  And I wait for 2 seconds
  And I click firts tag
  And I wait for 2 seconds
  And I create new tag descripcion with Datapool pseudoAleatorio limitesuperior
  And I wait for 2 seconds
  Then I publish tag error
  And I wait for 2 seconds
  And I cancel tag
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds
  

