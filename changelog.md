# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.8.1] - 2026-03-02
### Added
- Integrated Supabase API keys (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) into the environment configuration for future Supabase-specific features.

## [1.8.0] - 2026-03-02
### Changed
- Standardized database setup to use generic PostgreSQL environment variables (`DATABASE_URL`, `DIRECT_URL`).
- Renamed `ADMIN_RESET_TOKEN` to `JWT_SECRET` for generic compatibility and updated reset logic and tests.
- Added `NPM_CONFIG_IGNORE_SCRIPTS=true` to default environment configuration.
- Removed Supabase-specific suffixes from backend connection logging.

## [1.7.0] - 2026-03-02
### Added
- Created an explicit root `/` route on the Express API server to provide a helpful message during local development.

### Changed
- Migrated Supabase backend logic schema setup to use `$1, $2` and `?, ?` directly instead of regex replacement for stability.
- Moved `vercel.json` from the root into the `frontend/` directory to satisfy Vercel monorepo deployment configurations.
- Consolidated backend API static files (Monitor, Admin, Docs) so they are correctly served by Express resolving deep paths (`api/static`).

## [1.6.0] - 2026-03-02
### Changed
- Refactored project into a unified architecture, moving backend logic into the `frontend/api/` directory.
- Converted backend to ECMAScript Modules (ESM) for compatibility with the frontend structure.
- Simplified deployment by merging dependencies and configuration into the root/frontend.
- Updated Vercel configuration for unified routing.

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
