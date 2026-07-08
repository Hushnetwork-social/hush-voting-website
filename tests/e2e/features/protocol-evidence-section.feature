Feature: Protocol Evidence Section
  As a site visitor
  I want the Protocol Evidence and Platform Readiness sections to render with Sovereign Shield styling
  So that the visual language is consistent across the website

  @VisualLanguage @FEAT-006
  Scenario: Protocol Evidence section renders with Sovereign Shield styling
    Given the HushVoting website is running
    When I visit the homepage
    Then I should see a section with id "protocol"
    And the section should have a heading "Protocol Omega"
    And the section should display 6 evidence category items
    And each evidence item should use a recessed surface fill without white borders
    And the evidence section should use a surface-container-low background band

  @VisualLanguage @FEAT-006
  Scenario: Platform Readiness section renders 3 deployment cards
    Given the HushVoting website is running
    When I visit the homepage
    Then I should see a section with id "platform"
    And I should see "Universal Deployment Readiness" heading
    And I should see 3 deployment cards
    And each card should separate content using surface fill, not white borders

  @VisualLanguage @FEAT-006
  Scenario: Claim boundary bar renders with 5 badges
    Given the HushVoting website is running
    When I visit the homepage
    Then I should see a horizontal bar with filled shield icons
    And I should see at least 5 claim badges
    And each badge should use a Sovereign Shield surface fill
