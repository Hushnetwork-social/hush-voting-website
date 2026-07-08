import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "~/components/landing/Header";
import { HeroSection } from "~/components/landing/HeroSection";
import { MobileNavDisclosure } from "~/components/landing/MobileNavDisclosure";
import { BrandMark } from "~/components/landing/BrandMark";
import { TrustModelSection } from "~/components/landing/TrustModelSection";
import { RoleWorkflowSection } from "~/components/landing/RoleWorkflowSection";
import { ProtocolEvidenceSection } from "~/components/landing/ProtocolEvidenceSection";
import { PlatformReadinessSection } from "~/components/landing/PlatformReadinessSection";
import { ClaimBoundaryBar } from "~/components/landing/ClaimBoundaryBar";
import {
  HERO_COPY,
  NAV_LINKS,
  CTAS,
  BRAND_TEXT,
  TRUST_SECTION,
  ROLE_WORKFLOW_SECTION,
  PROTOCOL_EVIDENCE_SECTION,
  PLATFORM_READINESS_SECTION,
  FINAL_CTA_SECTION,
  PILOT_ACCESS_MAILTO,
  DOWNLOAD_OVERVIEW_CTA,
  FOOTER,
  UTILITY_PAGES,
} from "~/components/landing/constants";

/* ── BrandMark ── */

describe("BrandMark", () => {
  it("renders the shield SVG", () => {
    const { container } = render(<BrandMark />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("has role img when non-decorative", () => {
    const { container } = render(<BrandMark />);
    const span = container.firstChild as HTMLElement;
    expect(span).toHaveAttribute("role", "img");
    expect(span).toHaveAttribute("aria-label", "HushVoting shield mark");
  });

  it("has aria-hidden when decorative", () => {
    const { container } = render(<BrandMark decorative />);
    const span = container.firstChild as HTMLElement;
    expect(span).toHaveAttribute("aria-hidden", "true");
  });
});

/* ── Header ── */

describe("Header", () => {
  it("renders header landmark", () => {
    const { container } = render(<Header />);
    expect(container.querySelector("header")).toBeInTheDocument();
  });

  it("renders at least one navigation landmark named Primary", () => {
    render(<Header />);
    const navs = screen.getAllByRole("navigation", { name: "Primary" });
    expect(navs.length).toBeGreaterThanOrEqual(1);
  });

  it("renders brand identity with link to home", () => {
    render(<Header />);
    const homeLink = screen.getByRole("link", { name: "HushVoting home" });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders desktop navigation links with correct labels and hrefs", () => {
    render(<Header />);
    for (const link of NAV_LINKS) {
      const anchors = screen.getAllByRole("link", { name: link.label });
      // At least one anchor matches in the desktop nav
      const matchingAnchor = anchors.find(
        (a) => a.getAttribute("href") === link.href,
      );
      expect(matchingAnchor).toBeTruthy();
      expect(matchingAnchor).toHaveAttribute("href", link.href);
    }
  });

  it("renders Pilot Access CTA in nav with correct href", () => {
    render(<Header />);
    const pilotLinks = screen.getAllByRole("link", {
      name: CTAS.navPilotAccess.label,
    });
    const navCta = pilotLinks.find(
      (l) => l.getAttribute("href") === CTAS.navPilotAccess.href,
    );
    expect(navCta).toBeInTheDocument();
  });
});

/* ── HeroSection ── */

describe("HeroSection", () => {
  it("renders a section landmark", () => {
    const { container } = render(<HeroSection />);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders the approved headline as the page heading", () => {
    render(<HeroSection />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(HERO_COPY.headline);
  });

  it("renders the approved subheadline", () => {
    render(<HeroSection />);
    expect(screen.getByText(HERO_COPY.subheadline)).toBeInTheDocument();
  });

  it("renders primary CTA with correct label and href", () => {
    render(<HeroSection />);
    const cta = screen.getByRole("link", { name: CTAS.pilotAccess.label });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", CTAS.pilotAccess.href);
  });

  it("renders secondary CTA with correct label and href", () => {
    render(<HeroSection />);
    const cta = screen.getByRole("link", { name: CTAS.verifierModel.label });
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", CTAS.verifierModel.href);
  });

  it("renders decorative brand mark", () => {
    const { container } = render(<HeroSection />);
    const brandMarks = container.querySelectorAll('[aria-hidden="true"]');
    // The glow div and brand mark should both be decorative
    expect(brandMarks.length).toBeGreaterThanOrEqual(1);
  });
});

/* ── TrustModelSection ── */

describe("TrustModelSection", () => {
  it("renders a section landmark with id trust", () => {
    const { container } = render(<TrustModelSection />);
    const section = container.querySelector("section#trust");
    expect(section).toBeInTheDocument();
  });

  it("renders the eyebrow label", () => {
    render(<TrustModelSection />);
    expect(screen.getByText(TRUST_SECTION.eyebrow)).toBeInTheDocument();
  });

  it("renders the heading as h2", () => {
    render(<TrustModelSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(TRUST_SECTION.heading);
  });

  it("renders the supporting copy", () => {
    render(<TrustModelSection />);
    // Supporting copy is not a heading; use text query
    expect(screen.getByText(TRUST_SECTION.supportingCopy)).toBeInTheDocument();
  });

  it("renders HushVoting! card title", () => {
    render(<TrustModelSection />);
    expect(
      screen.getByText(TRUST_SECTION.hushVoting.title),
    ).toBeInTheDocument();
  });

  it("renders HushVoting! trust label", () => {
    render(<TrustModelSection />);
    expect(
      screen.getByText(TRUST_SECTION.hushVoting.subtitle),
    ).toBeInTheDocument();
  });

  it("renders all HushVoting capability chips", () => {
    render(<TrustModelSection />);
    for (const chip of TRUST_SECTION.hushVoting.capabilities) {
      expect(screen.getByText(chip.label)).toBeInTheDocument();
    }
  });

  it("renders HushNetwork card title", () => {
    render(<TrustModelSection />);
    expect(
      screen.getByText(TRUST_SECTION.hushNetwork.title),
    ).toBeInTheDocument();
  });

  it("renders HushNetwork trust label", () => {
    render(<TrustModelSection />);
    expect(
      screen.getByText(TRUST_SECTION.hushNetwork.subtitle),
    ).toBeInTheDocument();
  });

  it("renders all HushNetwork trust labels", () => {
    render(<TrustModelSection />);
    for (const label of TRUST_SECTION.hushNetwork.trustLabels) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });

  it("does not render focusable elements for chips or labels", () => {
    const { container } = render(<TrustModelSection />);
    const focusable = container.querySelectorAll(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    // The only focusable element should be none — chips/labels are spans
    expect(focusable.length).toBe(0);
  });

  it("does not render buttons or links inside the section", () => {
    const { container } = render(<TrustModelSection />);
    const buttons = container.querySelectorAll("button");
    const links = container.querySelectorAll("a");
    expect(buttons.length).toBe(0);
    expect(links.length).toBe(0);
  });
});

/* ── RoleWorkflowSection ── */

describe("RoleWorkflowSection", () => {
  it("renders a section landmark with id roles", () => {
    const { container } = render(<RoleWorkflowSection />);
    const section = container.querySelector("section#roles");
    expect(section).toBeInTheDocument();
  });

  it("renders the eyebrow label", () => {
    render(<RoleWorkflowSection />);
    expect(screen.getByText(ROLE_WORKFLOW_SECTION.eyebrow)).toBeInTheDocument();
  });

  it("renders the heading as h2", () => {
    render(<RoleWorkflowSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(ROLE_WORKFLOW_SECTION.heading);
  });

  it("renders the section description", () => {
    render(<RoleWorkflowSection />);
    expect(
      screen.getByText(ROLE_WORKFLOW_SECTION.description),
    ).toBeInTheDocument();
  });

  it("renders all four role titles as h3 elements", () => {
    render(<RoleWorkflowSection />);
    const roleHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(roleHeadings).toHaveLength(4);
    expect(roleHeadings[0]).toHaveTextContent(
      ROLE_WORKFLOW_SECTION.roles[0].role,
    );
    expect(roleHeadings[1]).toHaveTextContent(
      ROLE_WORKFLOW_SECTION.roles[1].role,
    );
    expect(roleHeadings[2]).toHaveTextContent(
      ROLE_WORKFLOW_SECTION.roles[2].role,
    );
    expect(roleHeadings[3]).toHaveTextContent(
      ROLE_WORKFLOW_SECTION.roles[3].role,
    );
  });

  it("renders all four role titles in the correct order", () => {
    render(<RoleWorkflowSection />);
    const roleHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(roleHeadings[0]).toHaveTextContent("Organizations");
    expect(roleHeadings[1]).toHaveTextContent("Voters");
    expect(roleHeadings[2]).toHaveTextContent("Trustees");
    expect(roleHeadings[3]).toHaveTextContent("Auditors");
  });

  it("renders all four approved role descriptions", () => {
    render(<RoleWorkflowSection />);
    for (const roleCard of ROLE_WORKFLOW_SECTION.roles) {
      expect(screen.getByText(roleCard.description)).toBeInTheDocument();
    }
  });

  it("marks all card icons as decorative with aria-hidden", () => {
    const { container } = render(<RoleWorkflowSection />);
    const iconSpans = container.querySelectorAll(
      "span.material-symbols-outlined",
    );
    expect(iconSpans.length).toBe(4);
    iconSpans.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("does not render focusable elements inside the section", () => {
    const { container } = render(<RoleWorkflowSection />);
    const focusable = container.querySelectorAll(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    expect(focusable.length).toBe(0);
  });

  it("does not render buttons or links inside the section", () => {
    const { container } = render(<RoleWorkflowSection />);
    const buttons = container.querySelectorAll("button");
    const links = container.querySelectorAll("a");
    expect(buttons.length).toBe(0);
    expect(links.length).toBe(0);
  });

  it("renders exactly four card containers (one per role)", () => {
    const { container } = render(<RoleWorkflowSection />);
    // Cards are div children of the grid container
    const section = container.querySelector("section#roles");
    const grid = section!.querySelector(".grid");
    const cards = grid!.querySelectorAll(":scope > div");
    expect(cards.length).toBe(4);
  });

  it("does not duplicate aria-label on decorative icons", () => {
    const { container } = render(<RoleWorkflowSection />);
    const iconSpans = container.querySelectorAll(
      "span.material-symbols-outlined",
    );
    iconSpans.forEach((icon) => {
      expect(icon).not.toHaveAttribute("aria-label");
    });
  });
});

/* ── MobileNavDisclosure ── */

describe("MobileNavDisclosure", () => {
  it("renders a menu toggle button with accessible name", () => {
    render(<MobileNavDisclosure />);
    const button = screen.getByRole("button", { name: "Open navigation" });
    expect(button).toBeInTheDocument();
  });

  it("toggle button has aria-expanded and aria-controls", () => {
    render(<MobileNavDisclosure />);
    const button = screen.getByRole("button", { name: "Open navigation" });
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls");
  });

  it("reveals nav links and CTA when opened", () => {
    render(<MobileNavDisclosure />);
    const button = screen.getByRole("button", { name: "Open navigation" });

    // Click to open using fireEvent
    fireEvent.click(button);

    // After click, aria-expanded should be true
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-label", "Close navigation");

    // Nav links should be visible
    for (const link of NAV_LINKS) {
      const anchors = screen.getAllByRole("link", { name: link.label });
      expect(anchors.length).toBeGreaterThanOrEqual(1);
    }

    // Pilot Access CTA should be available
    const pilotLinks = screen.getAllByRole("link", {
      name: CTAS.navPilotAccess.label,
    });
    expect(pilotLinks.length).toBeGreaterThanOrEqual(1);
  });

  it("closes menu after link activation", () => {
    render(<MobileNavDisclosure />);
    const button = screen.getByRole("button", { name: "Open navigation" });

    // Open using fireEvent
    fireEvent.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");

    // Click a nav link
    const firstLink = screen.getAllByRole("link", {
      name: NAV_LINKS[0].label,
    })[0];
    fireEvent.click(firstLink);

    // Menu should be closed
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

/* ── Constants contract ── */

describe("Constants contract", () => {
  it("HERO_COPY has exact approved headline", () => {
    expect(HERO_COPY.headline).toBe(
      "Governed remote voting for serious organizations.",
    );
  });

  it("HERO_COPY has exact approved subheadline", () => {
    expect(HERO_COPY.subheadline).toBe(
      "HushVoting! helps organizations run private, auditable, protocol-bound votes with clear roles for voters, owners, trustees, and auditors.",
    );
  });

  it("NAV_LINKS have correct labels and hrefs", () => {
    expect(NAV_LINKS).toEqual([
      { label: "Trust Model", href: "#trust" },
      { label: "Roles", href: "#roles" },
      { label: "Protocol Evidence", href: "#protocol" },
      { label: "Platform", href: "#platform" },
    ]);
  });

  it("ROLE_WORKFLOW_SECTION has exact approved eyebrow", () => {
    expect(ROLE_WORKFLOW_SECTION.eyebrow).toBe("Role Workflow");
  });

  it("ROLE_WORKFLOW_SECTION has exact approved heading", () => {
    expect(ROLE_WORKFLOW_SECTION.heading).toBe(
      "Four roles, one protocol-bound election flow.",
    );
  });

  it("ROLE_WORKFLOW_SECTION has exact approved description", () => {
    expect(ROLE_WORKFLOW_SECTION.description).toBe(
      "HushVoting separates election governance, private participation, trustee safeguards, and audit review into clear responsibilities.",
    );
  });

  it("ROLE_WORKFLOW_SECTION has exactly four roles in the correct order", () => {
    const roles = ROLE_WORKFLOW_SECTION.roles;
    expect(roles.length).toBe(4);
    expect(roles[0].role).toBe("Organizations");
    expect(roles[1].role).toBe("Voters");
    expect(roles[2].role).toBe("Trustees");
    expect(roles[3].role).toBe("Auditors");
  });

  it("ROLE_WORKFLOW_SECTION roles have exact approved descriptions", () => {
    const roles = ROLE_WORKFLOW_SECTION.roles;
    expect(roles[0].description).toBe(
      "Create and govern election parameters, define voter rolls, and establish timing protocols.",
    );
    expect(roles[1].description).toBe(
      "Securely claim eligibility through private ID providers and cast cryptographically masked ballots.",
    );
    expect(roles[2].description).toBe(
      "Approve governed actions and manage distributed decryption keys.",
    );
    expect(roles[3].description).toBe(
      "Review protocol evidence and package integrity through the standalone verifier suite.",
    );
  });

  it("ROLE_WORKFLOW_SECTION roles have exact approved icon names", () => {
    const roles = ROLE_WORKFLOW_SECTION.roles;
    expect(roles[0].icon).toBe("corporate_fare");
    expect(roles[1].icon).toBe("groups");
    expect(roles[2].icon).toBe("key");
    expect(roles[3].icon).toBe("rule");
  });

  it("CTAS.pilotAccess has correct label and href", () => {
    expect(CTAS.pilotAccess.label).toBe("Request pilot access");
    expect(CTAS.pilotAccess.href).toBe("#pilot-access");
  });

  it("CTAS.verifierModel has correct label and href", () => {
    expect(CTAS.verifierModel.label).toBe("View verifier model");
    expect(CTAS.verifierModel.href).toBe("#protocol");
  });

  it("CTAS.navPilotAccess has correct label and href", () => {
    expect(CTAS.navPilotAccess.label).toBe("Pilot Access");
    expect(CTAS.navPilotAccess.href).toBe("#pilot-access");
  });
});

/* ── FEAT-006 Constants Contract ── */

describe("FEAT-006 Constants contract", () => {
  it("PROTOCOL_EVIDENCE_SECTION has exact approved heading", () => {
    expect(PROTOCOL_EVIDENCE_SECTION.heading).toBe("Protocol Omega");
  });

  it("PROTOCOL_EVIDENCE_SECTION has a narrative string", () => {
    expect(PROTOCOL_EVIDENCE_SECTION.narrative.length).toBeGreaterThan(50);
  });

  it("PROTOCOL_EVIDENCE_SECTION badge has correct label and icon", () => {
    expect(PROTOCOL_EVIDENCE_SECTION.badge.label).toBe(
      "100% Mathematically Verifiable",
    );
    expect(PROTOCOL_EVIDENCE_SECTION.badge.icon).toBe("verified");
  });

  it("PROTOCOL_EVIDENCE_SECTION exports exactly six evidence items in approved order", () => {
    const items = PROTOCOL_EVIDENCE_SECTION.items;
    expect(items.length).toBe(6);

    expect(items[0].key).toBe("cryptographicReceipts");
    expect(items[0].label).toBe("Cryptographic Receipts");
    expect(items[0].icon).toBe("receipt_long");

    expect(items[1].key).toBe("eligibilityProofs");
    expect(items[1].label).toBe("Eligibility Proofs");
    expect(items[1].icon).toBe("how_to_reg");

    expect(items[2].key).toBe("anonymousBallots");
    expect(items[2].label).toBe("Anonymous Ballots");
    expect(items[2].icon).toBe("shield_lock");

    expect(items[3].key).toBe("tamperEvidentRecords");
    expect(items[3].label).toBe("Tamper-Evident Records");
    expect(items[3].icon).toBe("database");

    expect(items[4].key).toBe("verifiableTally");
    expect(items[4].label).toBe("Verifiable Tally");
    expect(items[4].icon).toBe("verified");

    expect(items[5].key).toBe("auditEvidence");
    expect(items[5].label).toBe("Audit Evidence");
    expect(items[5].icon).toBe("fact_check");
  });

  it("PROTOCOL_EVIDENCE_SECTION items have descriptions", () => {
    for (const item of PROTOCOL_EVIDENCE_SECTION.items) {
      expect(item.description.length).toBeGreaterThan(10);
    }
  });

  it("PLATFORM_READINESS_SECTION has exact approved heading", () => {
    expect(PLATFORM_READINESS_SECTION.heading).toBe(
      "Universal Deployment Readiness",
    );
  });

  it("PLATFORM_READINESS_SECTION has a description string", () => {
    expect(PLATFORM_READINESS_SECTION.description.length).toBeGreaterThan(50);
  });

  it("PLATFORM_READINESS_SECTION exports exactly three deployment cards in approved order", () => {
    const cards = PLATFORM_READINESS_SECTION.cards;
    expect(cards.length).toBe(3);

    expect(cards[0].key).toBe("pwaFirst");
    expect(cards[0].headline).toBe("PWA-First");
    expect(cards[0].icon).toBe("install_mobile");

    expect(cards[1].key).toBe("electrobunReady");
    expect(cards[1].headline).toBe("Electrobun-Ready");
    expect(cards[1].icon).toBe("desktop_windows");

    expect(cards[2].key).toBe("mobileNative");
    expect(cards[2].headline).toBe("Mobile Native");
    expect(cards[2].icon).toBe("phone_iphone");
  });

  it("PLATFORM_READINESS_SECTION cards have descriptions", () => {
    for (const card of PLATFORM_READINESS_SECTION.cards) {
      expect(card.description.length).toBeGreaterThan(10);
    }
  });

  it("PLATFORM_READINESS_SECTION exports exactly five claim badges in approved order", () => {
    const badges = PLATFORM_READINESS_SECTION.claimBadges;
    expect(badges.length).toBe(5);

    expect(badges[0].label).toBe("Designed for organizational remote voting");
    expect(badges[0].icon).toBe("groups");

    expect(badges[1].label).toBe("Privacy-first");
    expect(badges[1].icon).toBe("privacy_tip");

    expect(badges[2].label).toBe("Verifiable outcomes");
    expect(badges[2].icon).toBe("verified");

    expect(badges[3].label).toBe("Audit-ready evidence packages");
    expect(badges[3].icon).toBe("fact_check");

    expect(badges[4].label).toBe("Enabled by HushNetwork");
    expect(badges[4].icon).toBe("hub");
  });

  it("PLATFORM_READINESS_SECTION claim badges all have fill 1", () => {
    for (const badge of PLATFORM_READINESS_SECTION.claimBadges) {
      expect(badge.fill).toBe(1);
    }
  });
});

/* ── FEAT-006 Component Render Tests ── */

describe("ProtocolEvidenceSection", () => {
  it("renders a section landmark with id protocol", () => {
    const { container } = render(<ProtocolEvidenceSection />);
    const section = container.querySelector("section#protocol");
    expect(section).toBeInTheDocument();
  });

  it("renders the Protocol Omega heading as h2", () => {
    render(<ProtocolEvidenceSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Protocol Omega");
  });

  it("renders the protocol narrative text", () => {
    render(<ProtocolEvidenceSection />);
    expect(
      screen.getByText(PROTOCOL_EVIDENCE_SECTION.narrative),
    ).toBeInTheDocument();
  });

  it("renders the 100% Mathematically Verifiable badge", () => {
    render(<ProtocolEvidenceSection />);
    expect(
      screen.getByText("100% Mathematically Verifiable"),
    ).toBeInTheDocument();
  });

  it("renders all six evidence item labels", () => {
    render(<ProtocolEvidenceSection />);
    for (const item of PROTOCOL_EVIDENCE_SECTION.items) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it("marks evidence item icons as decorative with aria-hidden", () => {
    const { container } = render(<ProtocolEvidenceSection />);
    const icons = container.querySelectorAll(
      "section#protocol span.material-symbols-outlined",
    );
    expect(icons.length).toBeGreaterThanOrEqual(6);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("does not render focusable elements", () => {
    const { container } = render(<ProtocolEvidenceSection />);
    const focusable = container.querySelectorAll(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    expect(focusable.length).toBe(0);
  });

  it("does not render border-white classes", () => {
    const { container } = render(<ProtocolEvidenceSection />);
    const whiteBorders = container.querySelectorAll('[class*="border-white"]');
    expect(whiteBorders.length).toBe(0);
  });
});

describe("PlatformReadinessSection", () => {
  it("renders a section landmark with id platform", () => {
    const { container } = render(<PlatformReadinessSection />);
    const section = container.querySelector("section#platform");
    expect(section).toBeInTheDocument();
  });

  it("renders the Universal Deployment Readiness heading as h2", () => {
    render(<PlatformReadinessSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Universal Deployment Readiness");
  });

  it("renders all three deployment card headlines as h3 elements", () => {
    render(<PlatformReadinessSection />);
    const cardHeadings = screen.getAllByRole("heading", { level: 3 });
    expect(cardHeadings).toHaveLength(3);
    expect(cardHeadings[0]).toHaveTextContent("PWA-First");
    expect(cardHeadings[1]).toHaveTextContent("Electrobun-Ready");
    expect(cardHeadings[2]).toHaveTextContent("Mobile Native");
  });

  it("renders all three deployment card descriptions", () => {
    render(<PlatformReadinessSection />);
    for (const card of PLATFORM_READINESS_SECTION.cards) {
      expect(screen.getByText(card.description)).toBeInTheDocument();
    }
  });

  it("marks card icons as decorative with aria-hidden", () => {
    const { container } = render(<PlatformReadinessSection />);
    const icons = container.querySelectorAll(
      "section#platform span.material-symbols-outlined",
    );
    expect(icons.length).toBeGreaterThanOrEqual(3);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("does not render focusable elements", () => {
    const { container } = render(<PlatformReadinessSection />);
    const focusable = container.querySelectorAll(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    expect(focusable.length).toBe(0);
  });

  it("does not render border-white classes", () => {
    const { container } = render(<PlatformReadinessSection />);
    const whiteBorders = container.querySelectorAll('[class*="border-white"]');
    expect(whiteBorders.length).toBe(0);
  });
});

describe("ClaimBoundaryBar", () => {
  it("renders a list with claim boundary label", () => {
    const { container } = render(<ClaimBoundaryBar />);
    const listContainer = container.querySelector('[role="list"]');
    expect(listContainer).toBeInTheDocument();
  });

  it("renders all five claim badge labels", () => {
    render(<ClaimBoundaryBar />);
    for (const badge of PLATFORM_READINESS_SECTION.claimBadges) {
      expect(screen.getByText(badge.label)).toBeInTheDocument();
    }
  });

  it("renders exactly five list items", () => {
    const { container } = render(<ClaimBoundaryBar />);
    const items = container.querySelectorAll('[role="listitem"]');
    expect(items.length).toBe(5);
  });

  it("marks claim icons as decorative with aria-hidden", () => {
    const { container } = render(<ClaimBoundaryBar />);
    const icons = container.querySelectorAll(
      '[role="list"] span.material-symbols-outlined',
    );
    expect(icons.length).toBe(5);
    icons.forEach((icon) => {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    });
  });

  it("does not render focusable elements", () => {
    const { container } = render(<ClaimBoundaryBar />);
    const focusable = container.querySelectorAll(
      'button, a, [tabindex]:not([tabindex="-1"])',
    );
    expect(focusable.length).toBe(0);
  });
});

/* ── FEAT-007 Constants Contract ── */

describe("FEAT-007 Constants contract", () => {
  it("FINAL_CTA_SECTION has exact approved id", () => {
    expect(FINAL_CTA_SECTION.id).toBe("pilot-access");
  });

  it("FINAL_CTA_SECTION has exact approved heading", () => {
    expect(FINAL_CTA_SECTION.heading).toBe(
      "Bring protocol-bound voting to your organization.",
    );
  });

  it("FINAL_CTA_SECTION has exact approved description", () => {
    expect(FINAL_CTA_SECTION.description).toBe(
      "Secure, private, and mathematically verifiable governance at scale.",
    );
  });

  it("FINAL_CTA_SECTION has exact approved placeholder note", () => {
    expect(FINAL_CTA_SECTION.placeholderNote).toBe(
      "Pilot access requests currently open an email draft while onboarding is reviewed.",
    );
  });

  it("FINAL_CTA_SECTION has exact approved CTA labels", () => {
    expect(FINAL_CTA_SECTION.primaryActionLabel).toBe("Request pilot access");
    expect(FINAL_CTA_SECTION.secondaryActionLabel).toBe("Download overview");
  });

  it("PILOT_ACCESS_MAILTO has correct to field", () => {
    expect(PILOT_ACCESS_MAILTO.to).toBe("hello@hushvoting.com");
  });

  it("PILOT_ACCESS_MAILTO has subject", () => {
    expect(PILOT_ACCESS_MAILTO.subject).toBe("HushVoting pilot access request");
  });

  it("PILOT_ACCESS_MAILTO has a non-empty body", () => {
    expect(PILOT_ACCESS_MAILTO.body.length).toBeGreaterThan(50);
  });

  it("DOWNLOAD_OVERVIEW_CTA has correct label and href", () => {
    expect(DOWNLOAD_OVERVIEW_CTA.label).toBe("Download overview");
    expect(DOWNLOAD_OVERVIEW_CTA.href).toBe("#protocol");
  });

  it("DOWNLOAD_OVERVIEW_CTA has a pending note", () => {
    expect(DOWNLOAD_OVERVIEW_CTA.pendingNote.length).toBeGreaterThan(10);
  });

  it("DOWNLOAD_OVERVIEW_CTA href is not broken empty fragment", () => {
    // Prevent silent href="#" behavior
    expect(DOWNLOAD_OVERVIEW_CTA.href).not.toBe("#");
    expect(DOWNLOAD_OVERVIEW_CTA.href).not.toBe("");
  });

  it("FOOTER has brand and tagline", () => {
    expect(FOOTER.brand).toBe("HushVoting!");
    expect(FOOTER.tagline).toBe("HushVoting! is a product of HushNetwork.");
  });

  it("FOOTER has three utility links with correct labels and hrefs", () => {
    const links = FOOTER.links;
    expect(links.length).toBe(3);
    expect(links[0].label).toBe("Privacy Policy");
    expect(links[0].href).toBe("/privacy");
    expect(links[1].label).toBe("Terms of Service");
    expect(links[1].href).toBe("/terms");
    expect(links[2].label).toBe("Security Audit");
    expect(links[2].href).toBe("/security");
  });

  it("UTILITY_PAGES has exactly three pages in correct order", () => {
    expect(UTILITY_PAGES.length).toBe(3);
    expect(UTILITY_PAGES[0].route).toBe("/privacy");
    expect(UTILITY_PAGES[0].title).toBe("Privacy Policy");
    expect(UTILITY_PAGES[1].route).toBe("/terms");
    expect(UTILITY_PAGES[1].title).toBe("Terms of Service");
    expect(UTILITY_PAGES[2].route).toBe("/security");
    expect(UTILITY_PAGES[2].title).toBe("Security Audit");
  });

  it("UTILITY_PAGES each have pending-review status", () => {
    for (const page of UTILITY_PAGES) {
      expect(page.status).toContain("pending");
      expect(page.status).toContain("review");
    }
  });

  it("UTILITY_PAGES each have non-empty body copy", () => {
    for (const page of UTILITY_PAGES) {
      expect(page.bodyCopy.length).toBeGreaterThan(50);
    }
  });

  it("UTILITY_PAGES each have back-to-home link", () => {
    for (const page of UTILITY_PAGES) {
      expect(page.backToHomeLabel).toBeTruthy();
      expect(page.backToHomeHref).toBe("/");
    }
  });
});

/* ── FEAT-007 Mailto Helper ── */

import { buildMailtoHref } from "~/components/landing/mailto";

describe("buildMailtoHref", () => {
  const testParams = {
    to: "hello@hushvoting.com",
    subject: "HushVoting pilot access request",
    body: "Hello team,\n\nI would like pilot access.",
  };

  it("returns a string starting with mailto:", () => {
    const href = buildMailtoHref(testParams);
    expect(href).toMatch(/^mailto:/);
  });

  it("includes the recipient email", () => {
    const href = buildMailtoHref(testParams);
    expect(href).toContain("hello@hushvoting.com");
  });

  it("includes encoded subject parameter", () => {
    const href = buildMailtoHref(testParams);
    expect(href).toContain("?subject=");
    expect(href).toContain(encodeURIComponent(testParams.subject));
  });

  it("includes encoded body parameter", () => {
    const href = buildMailtoHref(testParams);
    expect(href).toContain("&body=");
    expect(href).toContain(encodeURIComponent(testParams.body));
  });

  it("produces a valid mailto href from PILOT_ACCESS_MAILTO constants", () => {
    const href = buildMailtoHref({
      to: PILOT_ACCESS_MAILTO.to,
      subject: PILOT_ACCESS_MAILTO.subject,
      body: PILOT_ACCESS_MAILTO.body,
    });
    expect(href).toMatch(/^mailto:hello@hushvoting.com/);
    expect(href).toContain(encodeURIComponent(PILOT_ACCESS_MAILTO.subject));
    expect(href).toContain(encodeURIComponent(PILOT_ACCESS_MAILTO.body));
  });

  it("encodes special characters in subject and body", () => {
    const special = {
      to: "test@example.com",
      subject: "Subject with spaces & special chars!",
      body: "Body with newlines\nand & ampersands.",
    };
    const href = buildMailtoHref(special);
    expect(href).toContain(encodeURIComponent(special.subject));
    expect(href).toContain(encodeURIComponent(special.body));
    // The href should not contain raw spaces or special chars in query string
    const queryString = href.split("?")[1] ?? "";
    expect(queryString).not.toContain(" ");
  });

  it("returns a string type", () => {
    const href: string = buildMailtoHref(testParams);
    expect(typeof href).toBe("string");
  });
});

/* ── FEAT-007 Component Render Tests ── */

import { FinalCtaSection } from "~/components/landing/FinalCtaSection";
import { Footer } from "~/components/landing/Footer";
import { UtilityPageShell } from "~/components/landing/UtilityPageShell";

describe("FinalCtaSection", () => {
  it("renders a section landmark with id pilot-access", () => {
    const { container } = render(<FinalCtaSection />);
    const section = container.querySelector("section#pilot-access");
    expect(section).toBeInTheDocument();
  });

  it("renders the approved heading as h2", () => {
    render(<FinalCtaSection />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent(FINAL_CTA_SECTION.heading);
  });

  it("renders the approved description", () => {
    render(<FinalCtaSection />);
    expect(screen.getByText(FINAL_CTA_SECTION.description)).toBeInTheDocument();
  });

  it("renders the primary CTA as an anchor with mailto href", () => {
    render(<FinalCtaSection />);
    const primaryCta = screen.getByRole("link", {
      name: FINAL_CTA_SECTION.primaryActionLabel,
    });
    expect(primaryCta).toBeInTheDocument();
    expect(primaryCta).toHaveAttribute("href");
    expect(primaryCta.getAttribute("href")).toMatch(/^mailto:/);
  });

  it("renders the secondary CTA as an anchor with overview href", () => {
    render(<FinalCtaSection />);
    const secondaryCta = screen.getByRole("link", {
      name: DOWNLOAD_OVERVIEW_CTA.label,
    });
    expect(secondaryCta).toBeInTheDocument();
    expect(secondaryCta).toHaveAttribute("href", DOWNLOAD_OVERVIEW_CTA.href);
  });

  it("renders the placeholder note", () => {
    render(<FinalCtaSection />);
    expect(
      screen.getByText(FINAL_CTA_SECTION.placeholderNote),
    ).toBeInTheDocument();
  });

  it("does not render border-white classes", () => {
    const { container } = render(<FinalCtaSection />);
    const whiteBorders = container.querySelectorAll('[class*="border-white"]');
    expect(whiteBorders.length).toBe(0);
  });

  it("does not render button elements (navigational CTAs are anchors)", () => {
    const { container } = render(<FinalCtaSection />);
    const buttons = container.querySelectorAll("button");
    expect(buttons.length).toBe(0);
  });
});

describe("Footer", () => {
  it("renders a footer landmark", () => {
    const { container } = render(<Footer />);
    expect(container.querySelector("footer")).toBeInTheDocument();
  });

  it("renders the brand text", () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER.brand)).toBeInTheDocument();
  });

  it("renders the tagline", () => {
    render(<Footer />);
    expect(screen.getByText(FOOTER.tagline)).toBeInTheDocument();
  });

  it("renders all three footer links as anchors", () => {
    render(<Footer />);
    for (const link of FOOTER.links) {
      const anchor = screen.getByRole("link", { name: link.label });
      expect(anchor).toBeInTheDocument();
      expect(anchor).toHaveAttribute("href", link.href);
    }
  });

  it("renders a navigation landmark for footer links", () => {
    render(<Footer />);
    const nav = screen.getByRole("navigation", { name: "Footer legal links" });
    expect(nav).toBeInTheDocument();
  });

  it("does not render border-white classes", () => {
    const { container } = render(<Footer />);
    const whiteBorders = container.querySelectorAll('[class*="border-white"]');
    expect(whiteBorders.length).toBe(0);
  });
});

describe("UtilityPageShell", () => {
  it("renders the page title as h1", () => {
    render(<UtilityPageShell config={UTILITY_PAGES[0]} />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(UTILITY_PAGES[0].title);
  });

  it("renders the pending-review status", () => {
    render(<UtilityPageShell config={UTILITY_PAGES[0]} />);
    expect(screen.getByText(UTILITY_PAGES[0].status)).toBeInTheDocument();
  });

  it("renders the body copy", () => {
    render(<UtilityPageShell config={UTILITY_PAGES[0]} />);
    expect(screen.getByText(UTILITY_PAGES[0].bodyCopy)).toBeInTheDocument();
  });

  it("renders a back-to-home link", () => {
    render(<UtilityPageShell config={UTILITY_PAGES[1]} />);
    const homeLink = screen.getByRole("link", {
      name: UTILITY_PAGES[1].backToHomeLabel,
    });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", UTILITY_PAGES[1].backToHomeHref);
  });

  it("renders correct content for each utility page", () => {
    for (const page of UTILITY_PAGES) {
      const { unmount } = render(<UtilityPageShell config={page} />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        page.title,
      );
      expect(screen.getByText(page.status)).toBeInTheDocument();
      expect(screen.getByText(page.bodyCopy)).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: page.backToHomeLabel }),
      ).toHaveAttribute("href", page.backToHomeHref);
      unmount();
    }
  });

  it("marks the back icon as decorative with aria-hidden", () => {
    const { container } = render(
      <UtilityPageShell config={UTILITY_PAGES[0]} />,
    );
    const backIcons = container.querySelectorAll(
      '.material-symbols-outlined[aria-hidden="true"]',
    );
    expect(backIcons.length).toBeGreaterThanOrEqual(1);
  });

  it("does not render border-white classes", () => {
    const { container } = render(
      <UtilityPageShell config={UTILITY_PAGES[0]} />,
    );
    const whiteBorders = container.querySelectorAll('[class*="border-white"]');
    expect(whiteBorders.length).toBe(0);
  });
});
