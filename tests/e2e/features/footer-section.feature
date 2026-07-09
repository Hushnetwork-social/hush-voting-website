Feature: Footer Section
  As a site visitor
  I want the footer, CTA, and utility pages to render with Sovereign Shield styling
  So that the visual language is consistent across the entire website

  @VisualLanguage @FEAT-007
  Scenario: Final CTA section renders with Sovereign Shield styling
    Given the HushVoting website is running
    When I visit the homepage
    Then I should see a CTA section with heading "Bring protocol-bound voting to your organization."
    And I should see the CTA button "Request pilot access"
    And I should not see a public "Download overview" CTA until an approved Protocol Omega overview PDF exists
    And the CTA card should use surface-container background without white borders

  @VisualLanguage @FEAT-007
  Scenario: Footer renders with brand, tagline, and legal links
    Given the HushVoting website is running
    When I visit the homepage
    Then I should see a footer element
    And the footer should contain "HushVoting!" brand text
    And the footer should contain "product of HushNetwork"
    And the footer should contain links for Privacy Policy, Terms of Service, and Security Audit
    And footer link text should use label-sm typography (monospace, uppercase style)
    And the footer should use surface-container-lowest background

  @VisualLanguage @FEAT-007
  Scenario: Utility page uses Sovereign Shield styling
    Given the HushVoting website is running
    When I visit "/privacy"
    Then the page should use Sovereign Shield surface colors
    And the page should contain a navigation link back to the homepage

  @VisualLanguage @FEAT-007
  Scenario: Utility pages expose placeholder content without implying final approval
    Given the HushVoting website is running
    When I visit "/terms"
    Then the page should communicate that final terms content is pending review
    And the page should contain a navigation link back to the homepage
    When I visit "/security"
    Then the page should communicate that final security audit content is pending review
    And the page should contain a navigation link back to the homepage
