@login
Feature: Login scenarios in WebShop website

Background: 
Given I navigate to WebShop website
When I click on the Log in link

@success
Scenario: Successful login with valid credentials
When I enter valid credentials
| email | {userEmail} |
| password | Arij2026 |
And I click on the Log in button
Then I verify that I am redirected to the Home page with email '{userEmail}'

@failure
Scenario: Login with invalid credentials
When I enter invalid credentials
| email    | fakeuser@mail.com |
| password | wrongpassword     |
And I click on the Log in button
Then I verify login error message is displayed

@navigate
Scenario: Login and access Shoes category
When I enter valid credentials
| email | {userEmail} |
| password | Arij2026 |
And I click on the Log in button
Then I verify that I am redirected to the Home page with email '{userEmail}'
When I click on Shoes category
Then I verify that Shoes page is displayed    