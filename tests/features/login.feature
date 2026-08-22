Feature: Login
@login
Scenario: Login successfully with valid credentials
    Given user is on the login page
    When user enters correct username
    And user enters correct password
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should be redirected to the dashboard

Scenario Outline: LOGIN_02 - Đăng nhập thành công theo từng vai trò
    When user enters username and password for "<role>"
    And user searches and selects the CQDP database
    And user clicks the Login button
    Then user should be redirected to the dashboard
    And user should see menu options matching role "<role>"
Examples:
    | role       |
    | ADMIN      |
    | UBND_TINH  |
    | UBND_XA    |
    | HDND_TINH  |
    | HDND_XA    |