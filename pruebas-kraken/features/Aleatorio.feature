Feature: Escenarios aleatorios

@user1 @web
Scenario: Escenarios Aleatorios

  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$name_1"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  And I wait for 2 seconds
  Then I should see a post with random title "$$name_1" and status "Published"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$name_3"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 1 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$name_3" and status "Published"
  And I wait for 2 seconds
  And I delete the post with random title "$$name_3"
  And I wait for 5 seconds
  Then I should not see a post with random title "$$name_3"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds

  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 2 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$name_7"
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$name_7" and status "Draft"
  And I wait for 2 seconds
  And I click on the post with random title "$$name_7"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$name_7" and status "Published"
  And I wait for 2 seconds
  And I delete the post with random title "$$name_7"
  And I wait for 2 seconds
  Then I should not see a post with random title "$$name_7"
  And I wait for 5 seconds
  And I logout
  And I wait for 5 seconds


  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to posts view
  And I wait for 5 seconds
  And I go to new post view
  And I wait for 2 seconds
  And I write a random post with title "$name_5"
  And I wait for 2 seconds
  And I publish the post
  And I wait for 2 seconds
  And I go back to editor view
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  And I should see a post with random title "$$name_5" and status "Published"
  And I wait for 2 seconds
  And I click on the post with random title "$$name_5"
  And I wait for 2 seconds
  And I unpublish the post
  And I wait for 2 seconds
  And I go back to posts view
  And I wait for 2 seconds
  Then I should see a post with random title "$$name_5" and status "Draft"
  And I wait for 2 seconds
  And I delete the post with random title "$$name_5"
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$name_10" and email "$email_10"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  Then I should see a member with random name "$$name_10" and email "$$email_10"
  And I wait for 2 seconds
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to profile view
  And I wait for 2 seconds
  And I update my slug name with random "$name_11"
  Then I should see that the profile URL ends with "$$name_11"
  And I wait for 2 seconds
  # Tear down
  And I update my slug name with "alberto"
  And I wait for 2 seconds
  And I go back to profile
  And I wait for 2 seconds
  And I go back to dashboard view
  And I logout
  And I wait for 5 seconds

  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to members view
  And I wait for 2 seconds
  And I click on new member button
  And I fill a new member with random name "$name_11" and email "$email_11"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  And I click on the member with random name "$$name_11"
  And I wait for 2 seconds
  And I fill a new member with random name "$name_12" and email "$email_12"
  And I wait for 2 seconds
  And I save the new member
  And I wait for 2 seconds
  And I go to members view
  And I wait for 2 seconds
  Then I should see a member with random name "$$name_12" and email "$$email_12"
  And I wait for 2 seconds
  And I delete all remaining members
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds

  Given I login to Ghost Admin with "<USERNAME>" user and "<PASSWORD>" password and "<URLLOGIN>" url
  And I wait for 2 seconds
  When I go to staff view
  And I wait for 2 seconds
  And I click on invite people button
  And I wait for 2 seconds
  And I fill the invite form for an admin user with random email "$email_12"
  And I wait for 2 seconds
  And I click on send invitation now button
  And I wait for 5 seconds
  And I reload the page
  And I wait for 5 seconds
  Then I should see a new invited user with random email "$$email_12"
  And I wait for 2 seconds
  And I revoke all invitations
  And I wait for 2 seconds
  And I logout
  And I wait for 5 seconds