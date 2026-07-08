import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "~/components/landing/Header";
import { HeroSection } from "~/components/landing/HeroSection";
import { MobileNavDisclosure } from "~/components/landing/MobileNavDisclosure";
import { BrandMark } from "~/components/landing/BrandMark";
import {
  HERO_COPY,
  NAV_LINKS,
  CTAS,
  BRAND_TEXT,
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
