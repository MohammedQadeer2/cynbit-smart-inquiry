# Cynbit Smart Inquiry System

## Assessment goal

Improve the existing Cynbit website's basic contact journey with a structured, responsive project inquiry prototype. Do not rebuild or modify the original Cynbit website.

## Product requirements

- Four guided steps: service, project requirements, contact information, and review.
- Services: AI Automation, Full-stack Development, Backend Systems, Cloud Infrastructure, and Technical SEO.
- Collect a 30–2,000 character project description, budget, timeline, project type, full name, valid email, optional company, and industry.
- Preserve values when navigating between steps and provide editable review, loading, validation, error, and database-confirmed success states.
- Store inquiries with MongoDB/Mongoose. Never return private inquiry records from a public listing endpoint.
- Validate on frontend and backend, limit request size, use rate limiting/security middleware, and restrict browser origins.

## Design and architecture decisions

- Palette: teal `#00666B`, background `#F2F6F5`, charcoal `#171D1D`, white cards.
- Client: React 19, Vite 8, JavaScript, custom responsive CSS, Axios, and React Hooks. No Tailwind or router was added because custom CSS and a single-page step flow meet the need without extra dependencies.
- API: Node.js, Express 5, Mongoose 9, CORS, Helmet, express-rate-limit, and dotenv.
- API endpoints: `GET /api/health`, `POST /api/inquiries`.
- MongoDB connection string: backend-only `MONGODB_URI`; frontend backend origin: `VITE_API_URL`.
- Deployment targets: Vercel frontend and Render backend. Public deployment has not been performed or verified.
- No local `.env` values or credentials are recorded in this file; `server.js` loads environment variables at runtime without printing them.

## Current workspace status

- Git remote `origin` points to `https://github.com/MohammedQadeer2/cynbit-smart-inquiry`; branch is `main`.
- Initial repository commit, Phase 1 documentation commit, MVP implementation commit `2592cc5`, and MVP documentation commit `0756b31` are pushed to `origin/main`.
- Both `client/` and `server/` exist. Root `.gitignore` ignores dependencies, environment files, build output, logs, and common editor files; the placeholder `server/.env.example` is explicitly allowed. Existing client/server ignore files remain.
- The existing `server/.env` contents were not inspected, printed, or recorded. Running the server entry point reported `database.configured: false` and `database.connected: false`; no Atlas connection or persistence write was attempted.

## Implementation progress

### Frontend

- Replaced the Vite starter screen with a Cynbit-inspired responsive inquiry experience, reusable components, four-step progress, service cards, requirements/contact forms, review/edit, and confirmation view.
- Added client validation, focus/error accessibility, disabled/loading submit state, duplicate-submit guard, API error display, and an Axios client configured with `VITE_API_URL`.
- Browser-tested service selection, required-service validation, step navigation, field entry, review, editing requirements without losing values, and the backend-unavailable submission state.
- At 1440px desktop and 390px mobile viewport sizes, measured document content width equalled the viewport's usable width (no horizontal overflow). Browser reported no uncaught page errors.
- Vite production build and ESLint pass.

### Backend

- Added Express app composition, Mongo connection management, Mongoose inquiry model, controller, routes, request validation, centralized JSON errors, Helmet, restricted CORS, a 10 KB JSON limit, and 10 requests/15-minute inquiry rate limit.
- Health returns database readiness booleans only. Valid submissions receive HTTP 201 only after Mongoose persistence. Missing or disconnected MongoDB returns HTTP 503; no in-memory fallback or fake success exists.
- Added six Node tests for health, required fields, email/description validation, valid payload behavior without storage, unknown routes, and rejected CORS origins.
- `npm --prefix server test`: 6 passed. `npm audit --prefix server`: 0 vulnerabilities after pinning a safe transitive `minimatch` range.
- The server entry point started and health returned HTTP 200. Database configuration was false; valid persistence has not been exercised.

### Documentation/deployment preparation

- Root `README.md` documents the problem, features, architecture, setup, environment, API, tests, and Vercel/Render steps.
- `server/.env.example` contains placeholder MongoDB credentials and local defaults; never commit `server/.env`.
- Added `render.yaml` for the backend service. Vercel deployment settings are documented in the README.
- `TECHNICAL_REPORT.md` records assessment framing, implementation choices, verified results, and remaining limitations.

## Verification results

- `npm --prefix client run lint`: passed.
- `npm --prefix client run build`: passed.
- `npm --prefix server test`: 6 passed, 0 failed.
- `npm audit --prefix server`: 0 vulnerabilities.
- `npm audit --omit=dev --prefix client`: 0 vulnerabilities.
- Live backend entry point: HTTP 200 health, MongoDB not configured/connected in the test runtime.
- Browser UI: tested at desktop and mobile widths; no horizontal overflow. Without MongoDB, the real API's HTTP 503 is shown and success is not displayed.
- MongoDB persistence and public deployment remain unverified because no Atlas configuration or deployment URLs were available.

## Remaining work

1. Configure a real MongoDB Atlas URI in `server/.env` locally and/or Render's secret settings; verify health reports connected and perform a controlled test write/readback.
2. Deploy backend to Render, set the exact Vercel production origin in `CLIENT_URL`, deploy frontend to Vercel with `VITE_API_URL`, then test a persisted live inquiry.
3. Record deployment URLs and verify a persisted end-to-end inquiry after the services are configured.

## Constraints

- Do not commit credentials, `node_modules`, or generated build output.
- Never force-push or overwrite existing Git history.
- Do not claim MongoDB persistence or deployment until explicitly verified.
