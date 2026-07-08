/**
 * Unit tests for FEAT-008 responsive helpers.
 *
 * @vitest-environment jsdom
 */
import { describe, it, expect } from "vitest";
import {
  parsePxValue,
  isFluidFontSize,
  meetsTouchTarget,
  meetsTouchTargetDimension,
  matchesGutter,
  classifyBreakpoint,
  isInBreakpoint,
  hasWhiteBorderClass,
} from "../e2e/fixtures/responsive-helpers";

describe("parsePxValue", () => {
  it("parses integer px values", () => {
    expect(parsePxValue("16px")).toBe(16);
    expect(parsePxValue("48px")).toBe(48);
  });

  it("parses decimal px values", () => {
    expect(parsePxValue("1.5px")).toBe(1.5);
    expect(parsePxValue("0.5px")).toBe(0.5);
  });

  it("returns NaN for non-px values", () => {
    expect(parsePxValue("1rem")).toBeNaN();
    expect(parsePxValue("clamp(1rem, 2vw, 2rem)")).toBeNaN();
    expect(parsePxValue("auto")).toBeNaN();
    expect(parsePxValue("")).toBeNaN();
  });
});

describe("isFluidFontSize", () => {
  it("detects clamp() values", () => {
    expect(isFluidFontSize("clamp(1rem, 2vw, 2rem)")).toBe(true);
  });

  it("detects min() values", () => {
    expect(isFluidFontSize("min(2rem, 4vw)")).toBe(true);
  });

  it("detects max() values", () => {
    expect(isFluidFontSize("max(1rem, 2vw)")).toBe(true);
  });

  it("returns false for static values", () => {
    expect(isFluidFontSize("16px")).toBe(false);
    expect(isFluidFontSize("1.5rem")).toBe(false);
    expect(isFluidFontSize("inherit")).toBe(false);
  });
});

describe("meetsTouchTarget", () => {
  it("returns true for 48x48 box", () => {
    expect(meetsTouchTarget({ x: 0, y: 0, width: 48, height: 48 })).toBe(true);
  });

  it("returns true for larger box", () => {
    expect(meetsTouchTarget({ x: 0, y: 0, width: 100, height: 60 })).toBe(true);
  });

  it("returns false when width is too small", () => {
    expect(meetsTouchTarget({ x: 0, y: 0, width: 30, height: 48 })).toBe(false);
  });

  it("returns false when height is too small", () => {
    expect(meetsTouchTarget({ x: 0, y: 0, width: 48, height: 32 })).toBe(false);
  });
});

describe("meetsTouchTargetDimension", () => {
  it("returns true when dimension meets minimum", () => {
    expect(meetsTouchTargetDimension(48)).toBe(true);
    expect(meetsTouchTargetDimension(60)).toBe(true);
  });

  it("returns false when dimension is below minimum", () => {
    expect(meetsTouchTargetDimension(40)).toBe(false);
    expect(meetsTouchTargetDimension(47)).toBe(false);
  });

  it("accepts custom minimum", () => {
    expect(meetsTouchTargetDimension(32, 32)).toBe(true);
    expect(meetsTouchTargetDimension(24, 32)).toBe(false);
  });
});

describe("matchesGutter", () => {
  it("matches mobile gutter (16px)", () => {
    expect(matchesGutter("16px", "mobile")).toBe(true);
    expect(matchesGutter("18px", "mobile")).toBe(false);
  });

  it("matches desktop gutter (24px)", () => {
    expect(matchesGutter("24px", "desktop")).toBe(true);
    expect(matchesGutter("26px", "desktop")).toBe(false);
  });

  it("allows tolerance", () => {
    expect(matchesGutter("17px", "mobile", 1)).toBe(true);
    expect(matchesGutter("18px", "mobile", 1)).toBe(false);
  });

  it("returns false for non-px values", () => {
    expect(matchesGutter("16rem", "mobile")).toBe(false);
    expect(matchesGutter("auto", "mobile")).toBe(false);
  });
});

describe("classifyBreakpoint", () => {
  it("classifies 320px as mobile", () => {
    expect(classifyBreakpoint(320)).toBe("mobile");
  });

  it("classifies 767px as mobile", () => {
    expect(classifyBreakpoint(767)).toBe("mobile");
  });

  it("classifies 768px as tablet", () => {
    expect(classifyBreakpoint(768)).toBe("tablet");
  });

  it("classifies 1023px as tablet", () => {
    expect(classifyBreakpoint(1023)).toBe("tablet");
  });

  it("classifies 1024px as desktop", () => {
    expect(classifyBreakpoint(1024)).toBe("desktop");
  });

  it("classifies 1440px as desktop", () => {
    expect(classifyBreakpoint(1440)).toBe("desktop");
  });
});

describe("isInBreakpoint", () => {
  it("320px is in mobile", () => {
    expect(isInBreakpoint(320, "mobile")).toBe(true);
  });

  it("768px is not in mobile", () => {
    expect(isInBreakpoint(768, "mobile")).toBe(false);
  });

  it("768px is in tablet", () => {
    expect(isInBreakpoint(768, "tablet")).toBe(true);
  });

  it("1024px is not in tablet", () => {
    expect(isInBreakpoint(1024, "tablet")).toBe(false);
  });
});

describe("hasWhiteBorderClass", () => {
  it("detects border-white", () => {
    expect(hasWhiteBorderClass("border-white")).toBe(true);
  });

  it("detects border-white in compound classes", () => {
    expect(hasWhiteBorderClass("flex border-white rounded")).toBe(true);
  });

  it("detects directional white borders", () => {
    expect(hasWhiteBorderClass("border-t-white")).toBe(true);
    expect(hasWhiteBorderClass("border-r-white")).toBe(true);
    expect(hasWhiteBorderClass("border-b-white")).toBe(true);
    expect(hasWhiteBorderClass("border-l-white")).toBe(true);
  });

  it("returns false for non-white borders", () => {
    expect(hasWhiteBorderClass("border-outline-variant")).toBe(false);
    expect(hasWhiteBorderClass("border-primary")).toBe(false);
    expect(hasWhiteBorderClass("border-t-outline-variant")).toBe(false);
  });

  it("returns false for empty string", () => {
    expect(hasWhiteBorderClass("")).toBe(false);
  });
});
