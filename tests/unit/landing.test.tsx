import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "~/components/landing/Header";
import { HeroSection } from "~/components/landing/HeroSection";
import { MobileNavDisclosure } from "~/components/landing/MobileNavDisclosure";
import { BrandMark } from "~/components/landing/BrandMark";
import { TrustModelSection } from "~/components/landing/TrustModelSection";
import { RoleWorkflowSection } from "~/components/landing/RoleWorkflowSection";
import {
  HERO_COPY,
  NAV_LINKS,
  CTAS,
  BRAND_TEXT,
  TRUST_SECTION,
  ROLE_WORKFLOW_SECTION,
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
