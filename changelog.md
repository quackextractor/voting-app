# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2026-03-08
### Added
- LocalStorage based vote persistence so users can see what they voted for (Resolves #1).
- Duplicate vote prevention and warning UI to immediately inform users if they already voted (Resolves #2, #4).
- Contact page link added to the main Layout footer for better discoverability (Resolves #3).
- Comprehensive ARIA accessibility labels across the application for improved screen reader support (Resolves #6).

## [1.6.1] - 2026-03-06
### Fixed
- Fixed build failures caused by unused variables (`Cpu`, `Clock`) in `DocsPage.tsx` and `MonitorPage.tsx`.
- Resolved remaining frontend ESLint issues (removed `any` types and unused variables).

## [1.6.0] - 2026-03-06
### Changed
- Major architectural upgrade: All statically served HTML backend pages (Docs, Monitor, Admin, Contact) have been migrated into the core React Single Page Application (SPA).
- Unified cohesive Tailwind CSS design and Shadcn components across the entire platform via a shared `Layout` wrapper component. 
- Removed redundant Express routing for physical HTML deliveries.

## [1.5.1] - 2026-03-06
### Added
- Created a new Contact page (`/contact`) and added it to all navigation menus for reporting issues and providing feedback.

### Fixed
- Fixed navigation menu alignment on the `/docs` page by removing the erroneous right-alignment class.
- Fixed a user experience issue where voting twice displayed an error instead of smoothly transitioning to the results page.

## [1.5.0] - 2026-03-02
### Added
- External database support for Supabase (PostgreSQL).
- Hybrid database logic: dynamic switching between SQLite and PostgreSQL via `DATABASE_URL`.
- Vercel deployment configuration for the frontend.
- Frontend environment variable support for API base URL via `VITE_API_BASE_URL`.
- Supabase initialization schema `supabase_schema.sql`.

## [1.4.1] - 2026-02-23
### Changed
- Replaced coffee emoji `☕` with a professional Lucide logo icon for a consistent, state-of-the-art rebranding across all application interfaces.

## [1.4.0] - 2026-02-23
### Added
- Unified navigation panel across all routes (Poll, Admin, Monitor, Docs).
- Sticky glassmorphism navigation bar for premium UI experience.
- Mobile-responsive navigation toggles for standalone interfaces.

## [1.3.0] - 2026-02-23
### Added
- Real-time System Monitor dashboard at `/monitor`.
- Enhanced `/health` and `/api/stats` endpoints with system metrics (uptime, memory, etc.).
- Integrated voting statistics into the monitoring core.

## [1.2.0] - 2026-02-23
### Added
- Migrated Admin Panel to a standalone server-side route at `/admin`.
- Decoupled admin functionality from the React frontend for improved separation.
- Standalone premium-styled `admin.html` served directly by the backend.
- Refined `/health` check to be served from the root level.
## [1.1.0] - 2026-02-23
### Added
- Health check endpoint (`/health`) for backend monitoring.
- UptimeRobot monitoring setup instructions in `README.md`.

## [1.0.0] - 2026-02-23
### Added
- Complete backend Node.js + Express REST API.
- SQLite database integration for storing poll options and votes.
- Double-voting prevention mechanism via IP and persistent client-side cookies.
- Admin token verification for the reset endpoint.
- Complete frontend React + Vite UI.
- TailwindCSS v4 and shadcn-ui components (Card, Button, Input, RadioGroup, Progress).
- Automated backend integration tests using Jest and Supertest.
- Full deployment documentation for Render.com.
- Fixed single-service deployment error by using Express 5 compatible wildcard routing.
