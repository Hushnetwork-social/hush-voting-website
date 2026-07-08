Feature: Visual Language Baseline
  As a developer
  I want the Sovereign Shield CSS to be loaded by the browser
  So that all sections render with the correct visual language

  @VisualLanguage @Prerequisite
  Scenario: Sovereign Shield CSS is loaded by the browser
    Given the HushVoting website is running
    When I visit the homepage
    Then the document head should contain a stylesheet link element
    And the CSS custom property "--color-surface" should have value "#091422"
    And the CSS custom property "--font-family-hanken" should include "Hanken Grotesk"
    And the body background-color should be "rgb(9, 20, 34)"
    And the body font-family should include "Hanken Grotesk"
