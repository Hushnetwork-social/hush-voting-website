# HushVoting Website

Public website for HushVoting, the HushNetwork product surface for privacy-first organizational elections.

This repository is intended to power `www.hushvoting.com`. It explains the product, trust posture, technology, supported election scenarios, contact paths, and public verification or evidence entry points. It does not own authenticated election execution or a separate backend.

## Role in the HushNetwork ecosystem

HushVoting is part of the HushNetwork ecosystem and uses the existing HushServerNode backend and HushNetwork identity model. This website is the public-facing entry point for the HushVoting product, while authenticated election workflows live in the focused web client at `app.hushvoting.com`.

Related repositories:

- `hush-server-node`: shared backend and election services.
- `hush-voting-web-client`: focused authenticated HushVoting web app.
- `hush-website`: broader HushNetwork public website.
- `hush-web-client`: broader HushNetwork app client.

## Project Status

**Scaffold ready.** The TanStack Start project scaffold has been initialized, and the build/test/E2E infrastructure is in place.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 22
- [pnpm](https://pnpm.io/) >= 11.9.0 (package manager)

```bash
# Enable Corepack (included with Node.js >= 22)
corepack enable
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run unit tests
pnpm test:unit

# Run happy-path E2E tests
# (requires a running dev or production server)
pnpm test:e2e:happy-path
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Production build (client + server) |
| `pnpm start` | Start production server |
| `pnpm test:unit` | Run unit tests (Vitest) |
| `pnpm test:e2e:happy-path` | Run happy-path E2E tests (Playwright) |
| `pnpm typecheck` | TypeScript type checking (`tsc --noEmit`) |
| `pnpm lint` | Run ESLint |
| `pnpm format` | Format code with Prettier |
| `pnpm format:check` | Check formatting without writing |

## Framework

**TanStack Start v1.168.27** (pinned exact version)

This project uses [TanStack Start](https://tanstack.com/start/latest) (the React meta-framework built on TanStack Router and Vite) as the full-stack React framework. The framework is pinned to an exact version to ensure reproducible builds.

Key framework decisions:

- **Package:** `@tanstack/react-start@1.168.27`
- **Router:** `@tanstack/react-router@1.170.17` (type-safe routing)
- **Build tool:** Vite 8 with Rolldown bundler (fast builds + HMR)
- **Server:** Nitro-powered SSR with automatic code splitting

### React Router v7 Fallback

If the pinned TanStack Start RC blocks any of these requirements, the project may fall back to React Router v7 (Framework Mode):

1. `pnpm dev` cannot reliably start within a 60-second bounded smoke check
2. `pnpm build` cannot produce a production build with scaffolded configuration
3. `pnpm start` cannot reliably serve the built app within a 60-second bounded smoke check
4. The RC blocks a compatible TypeScript strict-mode setup without unreasonable workarounds
5. The RC forces routing conventions that are not maintainable for the planned website
6. The RC prevents stable Gherkin/Playwright happy-path execution
7. The RC requires fragile or undocumented workarounds for normal scaffold operation

Any fallback escalation must be documented with the exact TanStack Start version tested, the failing requirement, and evidence from bounded validation.

## Project Structure

```
hush-voting-website/
├── src/                        # Application source
│   ├── routes/                 # File-based routing (TanStack Router)
│   │   ├── __root.tsx          # Root layout with Outlet, error, not-found boundaries
│   │   └── index.tsx           # Homepage (scaffold validation)
│   ├── components/             # Reusable UI components (future FEATs)
│   ├── lib/                    # Utilities and helpers
│   ├── client.tsx              # Client hydration entry point
│   ├── router.tsx              # Router instance creation
│   ├── routeTree.gen.ts        # Auto-generated route tree (stub)
│   └── ssr.tsx                 # SSR handler entry point
├── styles/
│   └── app.css                 # Tailwind CSS v4 with Sovereign Shield tokens
├── tests/
│   ├── unit/                   # Unit tests (Vitest)
│   │   └── scaffold.test.ts    # Scaffold configuration tests
│   └── e2e/                    # E2E tests (Playwright + Gherkin)
│       ├── features/           # Gherkin .feature files
│       ├── playwright.config.ts
│       └── scaffold-happy-path.spec.ts
├── public/                     # Static assets
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json               # Strict TypeScript configuration
├── vite.config.ts              # Vite + TanStack Start + Tailwind config
├── vitest.config.ts            # Vitest configuration
├── prettier.config.js          # Prettier formatting config
├── .env.example                # Environment variable template
├── Dockerfile                  # Production container (FEAT-009)
└── scripts/                    # CI/CD scripts
```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | TanStack Start | 1.168.27 (pinned) |
| Router | TanStack Router | 1.170.17 |
| UI Library | React | ^19 |
| CSS | Tailwind CSS v4 + Sovereign Shield | ^4 |
| TypeScript | TypeScript strict mode | ~5.7 |
| Package Manager | pnpm | 11.9.0 |
| Unit Testing | Vitest | ^3 |
| E2E Testing | Playwright + Gherkin | ^1.52 |
| Linting | ESLint | ^9 |
| Formatting | Prettier | ^3 |

## Design System: Sovereign Shield

The project uses the **Sovereign Shield** design system with the full token set configured in Tailwind CSS v4:

- **Colors:** 40+ color tokens (surface, primary, secondary, tertiary, error, outline)
- **Typography:** 7 type scales using Hanken Grotesk and JetBrains Mono
- **Spacing:** 8px-based scale (xs: 8px through xl: 64px)
- **Border Radius:** 6 levels (sm: 4px through full: 9999px)
- **Icons:** Material Symbols (variable font)

See `MemoryBank/Overview/Prototype/.../sovereign_shield/DESIGN.md` for the full specification.

## Testing Conventions

### Unit Tests

- Location: `tests/unit/`
- Runner: Vitest
- Command: `pnpm test:unit`
- Test files: `*.test.ts` or `*.test.tsx`

### E2E Tests

- Location: `tests/e2e/`
- Runner: Playwright
- Framework: Playwright + Gherkin feature files
- Happy-path command: `pnpm test:e2e:happy-path`
- Tag conventions for CI:
  - `@HappyPath` — Core user journeys (run by default)
  - `@Smoke` — Quick smoke tests
  - `@LONG_RUNNING` — Excluded from normal CI runs
  - `@FEAT-NNN` — Feature-specific scenarios

E2E tests require a running development or production server. Run `pnpm dev` (or `pnpm build && pnpm start`) in a separate terminal before executing E2E tests.

### Linting and Formatting

- ESLint for code quality and consistency
- Prettier for automatic formatting
- TypeScript strict mode for type safety
- Run `pnpm lint`, `pnpm format`, or `pnpm typecheck` before committing

## CI Contract

GitHub Actions validates the scaffold on every push and pull request. The CI workflow:

1. Runs `pnpm install --frozen-lockfile` (requires committed lockfile)
2. Runs `pnpm build` (production build)
3. Runs `pnpm test:unit` (unit tests)
4. Runs `pnpm test:e2e:happy-path` (happy-path E2E, requires `@HappyPath` tag)

See `.github/workflows/ci.yml` and `scripts/ci/run-frontend-ci.sh` for details.

## CD Contract

Deployment is handled by GitHub Actions in `.github/workflows/cd.yml`.

- Trigger tag: `HushVotingWebsite-vMAJOR.MINOR.PATCH`
- Published image: `ghcr.io/hushnetwork-social/hush-voting-website:<version>`
- AWS runtime container name: `HushVotingWebSite`
- Production URL: `https://www.hushvoting.com`

See the README AWS CD secrets section for required GitHub secrets configuration.

## Planned Scope

- HushVoting product landing pages.
- Trust, security, privacy, and protocol explanation pages.
- Public documentation and evidence links.
- Contact and onboarding paths.
- Public verifier entry points where appropriate.

## Out of Scope

- User account ownership.
- Election creation, voting, trustee approval, and auditor workflows.
- A separate HushVoting backend.

Those capabilities are handled by the HushVoting web client and HushServerNode.

## License

MIT
