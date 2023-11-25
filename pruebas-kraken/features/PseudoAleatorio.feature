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