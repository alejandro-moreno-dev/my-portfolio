# Sandbox

This is a React sandbox where I experiment with feature isolation, service abstraction, and reusable UI primitives.

The structure originally lived inside a larger production repository. I extracted the architectural layer into this standalone repo to remove domain-specific logic and clean up some legacy coupling, keeping only the patterns that are reusable across projects.

It is intentionally incomplete. The focus here is structure, not features.

---

## Why This Exists

After working on multiple React codebases over the years, I’ve found that scalability issues usually come from:

- Poor feature boundaries
- Over-centralized state
- Tight coupling between UI and business logic
- Unclear ownership of modules

This sandbox is where I iterate on alternatives before applying them in production environments.

---

## What I’m Currently Exploring

- Feature-first module organization
- Localized state with minimal global surface area
- Service layer isolation for easier backend replacement
- Extractable UI primitives that can evolve into a lightweight design system

The current iteration focuses on tightening feature boundaries and reducing unnecessary cross-module dependencies.

---

## Notes

- Static data is used intentionally
- No backend integration in this repo
- This is a working sandbox and will evolve over time

The goal of this repository is to refine structural decisions outside of product constraints.
