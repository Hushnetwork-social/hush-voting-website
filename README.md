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

## Planned scope

- HushVoting product landing pages.
- Trust, security, privacy, and protocol explanation pages.
- Public documentation and evidence links.
- Contact and onboarding paths.
- Public verifier entry points where appropriate.

## Out of scope

- User account ownership.
- Election creation, voting, trustee approval, and auditor workflows.
- A separate HushVoting backend.

Those capabilities are handled by the HushVoting web client and HushServerNode.

## Development status

This repository has been initialized with project metadata only. The frontend scaffold and runtime commands will be added when implementation starts.

## License

MIT
