# Technology Decision: Full-Stack React Framework for HushVoting Website

| Field | Value |
|-------|-------|
| Scope | EPIC-001 |
| Status | DECIDED ✅ |
| Decision | TanStack Start (Release Candidate) with React Router v7 fallback |
| Approved By | EPIC-001 Owner |
| Approval Date | 2026-07-08 |
| Author | EPIC-001 context |
| Created | 2026-07-08 |
| Related EPIC | EPIC-001: HushVoting Website Platform & Initial Design |

## Context

The HushVoting Website (www.hushvoting.com) needs a full-stack React framework. The existing HushNetwork ecosystem projects have historically used Next.js. This document evaluates whether to continue with Next.js or migrate to TanStack Start for this new public-facing website.

## Decision Point

This is an open architectural decision for EPIC-001. The framework choice affects:

- Project scaffolding and build tooling
- Developer experience and iteration speed
- Deployment flexibility and hosting options
- Type safety guarantees across the full stack
- Future maintainability and team onboarding

## Evaluation Criteria

| Criterion | Weight | Why It Matters |
|-----------|--------|----------------|
| Developer Experience | High | Fast iteration cycles for a marketing/product website; the team should feel productive, not fight the framework |
| Deployment Flexibility | High | The website must deploy to AWS (per README.md CD contract); vendor lock-in is a risk |
| Type Safety | Medium | Good-to-have for a marketing website; critical for future interactive sections |
| Ecosystem Maturity | Medium | The website is a public-facing product surface; stability matters |
| Production Readiness | High | Must ship to production without blocking on framework instability |
| Portability / Future-Proofing | Medium | HushVoting may grow interactive server needs; framework should not limit options |

## Option A: Next.js (Vercel)

**Strengths:**
- Battle-tested at massive scale, largest community in React ecosystem
- Mature RSC (React Server Components) support
- Automatic image optimization, font loading
- Largest third-party integration ecosystem
- Next.js 15 (App Router) is production-grade stable

**Weaknesses:**
- **Vendor lock-in concern:** Many features work best or only on Vercel (ISR, Image Optimization, Middleware at Edge only). Self-hosting requires additional configuration and carries limitations.
- **Development performance:** Slow dev server startup (seconds, scales poorly with project size), slow HMR even with Turbopack, high CPU/RAM consumption during development.
- **Convention-over-configuration:** Deeply opinionated structure. Fighting the framework for non-standard setups is costly.
- **Heavy build system:** Webpack/Turbopack-based, slower than Vite-based alternatives.
- **Industry sentiment shift:** Growing developer frustration with Vercel lock-in, build complexity, and slow dev feedback loop. Multiple high-profile discussions (Reddit, Hacker News, Twitter/X) in 2025-2026 document teams migrating away for new projects.

## Option B: TanStack Start (TanStack Router + Vite/Rsbuild)

**Strengths:**
- **Deployment agnostic:** Built on Vite and Rsbuild builds. Deploy to AWS, Cloudflare, Netlify, Railway, Fly.io, Vercel (via Nitro), or any Node.js host. No vendor-specific features required.
- **Development performance:** Instant dev server startup (Vite/Rsbuild), lightning-fast HMR, lightweight CPU/RAM usage.
- **Type safety first:** End-to-end type-safe routing, server functions, loaders. Industry-leading type-safe routing via TanStack Router.
- **Composable middleware:** Middleware at both request level and server function level (client + server). Built-in input validation for server functions.
- **Selective SSR:** Fine-grained per-route SSR control (full SSR, data-only, or client-only).
- **Router-first architecture:** 90% of framework capability comes from the router, which is the best-in-class TanStack Router.
- **Native SWR caching:** Built-in stale-while-revalidate caching via TanStack Router, structural sharing for efficient re-renders.
- **TanStack ecosystem alignment:** Official TanStack Query, Form, Table integrations if the website grows interactive data surfaces.

**Weaknesses:**
- **Release Candidate stage (not v1):** Feature-complete and API-stable, but not yet formally v1. Road to v1 should be quick, but risk exists for edge cases or breaking changes before v1.
- **Smaller community:** Growing but significantly smaller than Next.js. Fewer blog posts, Stack Overflow answers, and third-party examples.
- **RSC support is experimental:** Not yet a primary paradigm; uses client-led composition approach rather than RSC-first.
- **Less battle-tested at scale:** Fewer known large-scale production deployments compared to Next.js.

## Option C: React Router v7 (Framework Mode)

**Strengths:**
- Web standards-first approach (fetch, FormData, Headers)
- Progressive enhancement (works without JavaScript by default)
- Vite-based, fast dev performance
- Evolution of Remix, strong community

**Weaknesses:**
- Less type-safe than TanStack Start (no type-first architecture)
- No built-in SWR caching (requires manual integration)
- Weaker server function middleware model

## Recommendation

**For a marketing / public-facing product website** that needs fast iteration, flexible deployment (AWS per CD contract), and excellent developer experience, **TanStack Start is the recommended choice.**

Rationale:

1. **Deployment to AWS is a hard requirement** (per README.md CD contract). Next.js's Vercel-optimized architecture adds friction for self-hosting. TanStack Start deploys to any Node.js host with zero vendor-specific configuration.

2. **Fast dev feedback loop** matters for iterating on design and content. Vite-based TanStack Start provides instant startup and HMR vs Next.js's multi-second startup and sluggish HMR.

3. **Type safety from day one** prevents regressions on a public-facing site that represents the HushVoting brand. TanStack Router's end-to-end type safety catches routing and data-flow errors at compile time.

4. **The deployment flexibility** means this same stack can power future interactive sections (live verifier, evidence lookup) without an architectural change or framework migration.

5. **Release Candidate risk is acceptable** for a marketing website scope. The website doesn't depend on RSC or bleeding-edge features. TanStack Start's SSR, streaming, server functions, and static prerendering are stable.

6. **TanStack ecosystem alignment:** HushVoting's authenticated web client or future interactive surfaces may benefit from TanStack Query and Router. Using TanStack Start now establishes consistent patterns.

**Risk Mitigation for Release Candidate status:**
- Pin to a specific RC version in `package.json`
- Freeze the framework version at the start of EPIC-001 implementation
- If blocking issues emerge during EPIC-001 FEATs, switch to React Router v7 (Framework Mode) as fallback — same Vite ecosystem, similar architecture

## Decision (Confirmed)

**Decision: TanStack Start (Release Candidate) — APPROVED ✅**

On 2026-07-08, the EPIC-001 owner reviewed the analysis and confirmed TanStack Start as the framework for the HushVoting Website.

### Rationale (confirmed)

1. **AWS deployment requirement** — TanStack Start deploys to any Node.js host with zero vendor lock-in.
2. **Developer experience** — Vite-based instant startup and HMR accelerate design iteration.
3. **Type safety** — TanStack Router's end-to-end type safety prevents routing and data-flow regressions.
4. **Portability** — Future interactive sections (live verifier, evidence lookup) can reuse the same stack.
5. **RC risk is acceptable** — The marketing website scope does not depend on RSC or bleeding-edge features. The RC is feature-complete and API-stable.

### Risk Mitigation (active)

- Pin to a specific RC version in `package.json`.
- Freeze the framework version at the start of EPIC-001 implementation.
- **Fallback:** If blocking issues emerge during EPIC-001 FEATs, switch to React Router v7 (Framework Mode) — same Vite ecosystem, similar architecture.

## References

- [TanStack Start Official Documentation](https://tanstack.com/start/latest)
- [TanStack Start vs Next.js vs React Router Comparison](https://tanstack.com/router/latest/docs/framework/react/start/comparison)
- [README.md - CD Contract](../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Router v7 Framework Mode](https://reactrouter.com/)

## Change Log

- v1.0 (2026-07-08): Initial evaluation created as part of EPIC-001 planning.
- v1.1 (2026-07-08): Decision confirmed. Status updated to DECIDED ✅. TanStack Start selected with React Router v7 fallback.
