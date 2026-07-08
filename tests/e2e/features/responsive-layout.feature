Feature: Responsive Layout
  As a mobile user
  I want the website to be fully responsive with correct touch targets and layout
  So that I can use the site on any device

  @VisualLanguage @FEAT-008
  Scenario: Navigation switches to hamburger on mobile viewport
    Given the HushVoting website is running
    When I set the viewport to 375x812 pixels
    Then I should not see inline navigation links
    And I should see a hamburger menu button
    When I click the hamburger menu button
    Then I should see the navigation links
    And each navigation link should have a minimum height of 48 pixels
    And the mobile navigation surface should use `bg-surface-container-low`
    And the mobile navigation divider should use `border-outline-variant`
    And the mobile navigation should not use `border-white`

  @VisualLanguage @FEAT-008
  Scenario: Navigation shows inline links on desktop viewport
    Given the HushVoting website is running
    When I set the viewport to 1440x900 pixels
    Then I should see inline navigation links for Trust Model, Roles, Protocol Evidence, and Platform
    And the hamburger menu button should not be visible
    And the Pilot Access button should be visible in the nav bar

  @VisualLanguage @FEAT-008
  Scenario: Tablet navigation uses hamburger disclosure
    Given the HushVoting website is running
    When I set the viewport to 768x1024 pixels
    Then I should not see inline navigation links
    And I should see a hamburger menu button
    When I click the hamburger menu button
    Then I should see the navigation links
    And I should see the Pilot Access button

  @VisualLanguage @FEAT-008
  Scenario: Role cards display in correct grid at different viewports
    Given the HushVoting website is running
    When I set the viewport to 375x812 pixels
    Then the role cards should be in a single column layout
    When I set the viewport to 768x1024 pixels
    Then the role cards should be in a 2-column grid layout
    When I set the viewport to 1440x900 pixels
    Then the role cards should be in a 4-column grid layout

  @VisualLanguage @FEAT-008
  Scenario: No white borders at any viewport
    Given the HushVoting website is running
    When I visit the homepage at 320x568 pixels
    Then no element should use a "border-white" CSS class
    When I visit the homepage at 375x812 pixels
    Then no element should use a "border-white" CSS class
    When I visit the homepage at 768x1024 pixels
    Then no element should use a "border-white" CSS class
    When I visit the homepage at 1440x900 pixels
    Then no element should use a "border-white" CSS class

  @VisualLanguage @FEAT-008
  Scenario: Section padding adjusts for viewport
    Given the HushVoting website is running
    When I set the viewport to 375x812 pixels
    Then section containers should use 16px horizontal padding
    When I set the viewport to 1440x900 pixels
    Then section containers should use 24px horizontal padding

  @VisualLanguage @FEAT-008
  Scenario: Responsive typography remains readable
    Given the HushVoting website is running
    When I set the viewport to 320x568 pixels
    Then the hero heading should use fluid display scaling
    And body text should remain readable
    And section headings should use fluid headline scaling
    When I set the viewport to 1440x900 pixels
    Then hero, body, and section heading typography should remain within the expected tokenized scale

  @VisualLanguage @FEAT-008
  Scenario: Touch targets meet minimum size
    Given the HushVoting website is running
    When I visit the homepage
    Then all interactive elements should have a minimum height of 48 pixels
    And all interactive elements should have a minimum width of 48 pixels or equivalent interactive padding

  @VisualLanguage @FEAT-008
  Scenario: Protocol Evidence items stack on mobile
    Given the HushVoting website is running
    When I set the viewport to 375x812 pixels
    Then the protocol evidence items should be in a single column layout
    When I set the viewport to 1440x900 pixels
    Then the protocol evidence items should be in a 2-column grid layout

  @VisualLanguage @FEAT-008
  Scenario: Platform Readiness cards stack correctly
    Given the HushVoting website is running
    When I set the viewport to 375x812 pixels
    Then the platform readiness cards should be in a single column layout
    When I set the viewport to 1440x900 pixels
    Then the platform readiness cards should be in a 3-column grid layout
