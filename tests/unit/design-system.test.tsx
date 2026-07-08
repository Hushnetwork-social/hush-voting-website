import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Button,
  Section,
  Card,
  InsetWell,
  MetricCard,
  StatusChip,
  IconLabel,
} from "../../src/components/ui";

/* ── Button ── */

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: "Click me" }),
    ).toBeInTheDocument();
  });

  it("renders as a native button element", () => {
    const { container } = render(<Button>Test</Button>);
    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("applies primary variant classes by default", () => {
    const { container } = render(<Button>Primary</Button>);
    const btn = container.querySelector("button")!;
    expect(btn.className).toContain("bg-primary");
    expect(btn.className).toContain("text-on-primary");
  });

  it("applies secondary variant classes", () => {
    const { container } = render(
      <Button variant="secondary">Secondary</Button>,
    );
    const btn = container.querySelector("button")!;
    expect(btn.className).toContain("bg-surface-container-high");
  });

  it("applies ghost variant classes", () => {
    const { container } = render(<Button variant="ghost">Ghost</Button>);
    const btn = container.querySelector("button")!;
    expect(btn.className).toContain("bg-transparent");
  });

  it("applies size classes", () => {
    const { container: c1 } = render(<Button size="sm">S</Button>);
    expect(c1.querySelector("button")!.className).toContain("px-3");

    const { container: c2 } = render(<Button size="lg">L</Button>);
    expect(c2.querySelector("button")!.className).toContain("px-7");
  });

  it("is disabled when disabled prop is true", () => {
    const { container } = render(<Button disabled>Disabled</Button>);
    expect(container.querySelector("button")).toBeDisabled();
  });

  it("shows spinner and disables when loading", () => {
    const { container } = render(<Button isLoading>Loading</Button>);
    const btn = container.querySelector("button")!;
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
    const spinner = btn.querySelector('[aria-hidden="true"]');
    expect(spinner).toBeInTheDocument();
  });

  it("forwards additional HTML button props", () => {
    render(<Button type="submit">Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("applies custom className", () => {
    const { container } = render(
      <Button className="custom-class">Styled</Button>,
    );
    expect(container.querySelector("button")!.className).toContain(
      "custom-class",
    );
  });
});

/* ── Section ── */

describe("Section", () => {
  it("renders children", () => {
    render(
      <Section>
        <p>Content</p>
      </Section>,
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("renders as section element by default", () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders as div when as prop is div", () => {
    const { container } = render(<Section as="div">Content</Section>);
    expect(container.querySelector("div")).toBeInTheDocument();
    expect(container.querySelector("section")).not.toBeInTheDocument();
  });

  it("renders eyebrow when provided", () => {
    render(<Section eyebrow="EYEBROW">Content</Section>);
    expect(screen.getByText("EYEBROW")).toBeInTheDocument();
  });

  it("renders title as heading when provided", () => {
    render(<Section title="Title">Content</Section>);
    expect(screen.getByRole("heading")).toHaveTextContent("Title");
  });

  it("renders description when provided", () => {
    render(<Section description="Description text">Content</Section>);
    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("does not render optional header elements when omitted", () => {
    const { container } = render(<Section>Content</Section>);
    expect(container.querySelector("h2")).not.toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});

/* ── Card ── */

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies default tone classes", () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-surface-container");
  });

  it("applies tone classes for alternate tones", () => {
    const { container } = render(<Card tone="primary">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("bg-primary-container");
  });
});

/* ── InsetWell ── */

describe("InsetWell", () => {
  it("renders children", () => {
    render(<InsetWell>Well content</InsetWell>);
    expect(screen.getByText("Well content")).toBeInTheDocument();
  });

  it("applies recessed surface classes", () => {
    const { container } = render(<InsetWell>Content</InsetWell>);
    const well = container.firstChild as HTMLElement;
    expect(well.className).toContain("bg-surface-container-lowest");
  });
});

/* ── MetricCard ── */

describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Voters" value={1024} />);
    expect(screen.getByText("Voters")).toBeInTheDocument();
    expect(screen.getByText("1024")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<MetricCard label="Rate" value="87%" description="Above quorum" />);
    expect(screen.getByText("Above quorum")).toBeInTheDocument();
  });

  it("renders fallback for null value", () => {
    const { container } = render(
      <MetricCard label="Empty" value={null as unknown as number} />,
    );
    expect(container.textContent).toContain("\u2014");
  });

  it("renders fallback for undefined value", () => {
    const { container } = render(
      <MetricCard label="Empty" value={undefined as unknown as number} />,
    );
    expect(container.textContent).toContain("\u2014");
  });

  it("renders fallback for empty string value", () => {
    const { container } = render(<MetricCard label="Empty" value="" />);
    expect(container.textContent).toContain("\u2014");
  });
});

/* ── StatusChip ── */

describe("StatusChip", () => {
  it("renders label", () => {
    render(<StatusChip label="Active" />);
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("applies neutral tone classes by default", () => {
    const { container } = render(<StatusChip label="Neutral" />);
    const chip = container.firstChild as HTMLElement;
    expect(chip.className).toContain("bg-surface-container-high");
  });

  it("renders icon when provided", () => {
    const { container } = render(
      <StatusChip label="Verified" tone="primary" icon="check_circle" />,
    );
    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe("check_circle");
  });
});

/* ── IconLabel ── */

describe("IconLabel", () => {
  it("renders icon and text", () => {
    const { container } = render(<IconLabel icon="lock">Encrypted</IconLabel>);
    expect(screen.getByText("Encrypted")).toBeInTheDocument();
    const icon = container.querySelector('[aria-hidden="true"]');
    expect(icon).toBeInTheDocument();
    expect(icon?.textContent).toBe("lock");
  });
});
