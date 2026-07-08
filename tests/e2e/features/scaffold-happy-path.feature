Feature: Scaffold Happy Path
  As a visitor
  I want the HushVoting website to be reachable
  So that I can explore the product

  @HappyPath @Smoke
  Scenario: The scaffold homepage is reachable
    Given the HushVoting website is running
    When I visit the homepage
    Then I see the page title is "HushVoting"
    And I see the brand name "HushVoting!"
    And I see Sovereign Shield styled content
