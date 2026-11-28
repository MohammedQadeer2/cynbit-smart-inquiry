# Cynbit Smart Inquiry System — Project Context

## Assessment goal

Improve the existing Cynbit website's basic contact journey with a polished, structured project inquiry. This application is a prototype and does not replace or modify the original Cynbit website.

## Product and architecture

- Four guided steps: select service; describe requirements; add contact details; review and submit.
- Services: AI Automation, Full-stack Development, Backend Systems, Cloud Infrastructure, and Technical SEO.
- Client: React 19, Vite 8, JavaScript, custom responsive CSS, Axios, and React Hooks.
- API: Node.js, Express 5, JavaScript ES modules, Mongoose 9, CORS, Helmet, express-rate-limit, and dotenv.
- Database: MongoDB Atlas database `cynbit-smart-inquiry`, collection `inquiries`.
- Hosting: Vercel frontend and Render backend.
- API: `GET /api/health`, `POST /api/inquiries`. There is no public inquiry listing endpoint.
- Backend secrets stay in environment configuration; never put MongoDB credentials in frontend variables or Git.

## Current deployment status

- Repository: [MohammedQadeer2/cynbit-smart-inquiry](https://github.com/MohammedQadeer2/cynbit-smart-inquiry), branch `main`.
- Frontend: [https://cynbit-smart-inquiry1.vercel.app](https://cynbit-smart-inquiry1.vercel.app), publicly accessible.
- Backend: [https://cynbit-smart-inquiry.onrender.com](https://cynbit-smart-inquiry.onrender.com); `GET /api/health` returned HTTP 200.
- MongoDB Atlas: Render deployment logs confirmed MongoDB connected.
- Production CORS issue: OPTIONS preflight from `https://cynbit-smart-inquiry1.vercel.app` currently returns HTTP 403 without `Access-Control-Allow-Origin`. Correct Render `CLIENT_URL` to exactly that origin (no trailing slash/path) and redeploy.
- Do not mark production inquiry submission successful until preflight passes and a controlled inquiry is verified in MongoDB.

## Implementation and verification

- Frontend includes responsive service cards, project/contact steps, review/edit, field validation, loading/error handling, duplicate-submit protection, and database-confirmed success state.
- Backend includes Mongoose persistence, server validation, centralized JSON errors, Helmet, exact-origin CORS, 10 KB JSON limit, and 10 requests per 15 minutes on the inquiry route.
- `npm --prefix server test`: latest CORS regression suite reports 9 passed, 0 failed. It covers health, invalid/missing fields, no fake success when storage is unavailable, unknown route, allowed and rejected origins, comma-separated `CLIENT_URL`, preflight, and local development origin.
- Previously run frontend ESLint and Vite production build passed. Browser checks exercised the step flow and measured no horizontal overflow at 1440 px desktop and 390 px mobile widths.
- The production preflight failure means a successful production browser submission and Atlas write/readback have not been verified.

## Documentation

- `README.md`: installation, environment variables, API, database schema, deployment URLs, tests, current CORS issue, and deployment verification steps.
- `TECHNICAL_REPORT.md`: assessment report with requirements, architecture diagram, frontend/backend design, data model, API examples, security, test results, deployment status, screenshot placeholders, and limitations.
- `server/.env.example`: connection-string format with credential placeholders; verify its cluster host and database path. The actual `server/.env` must remain private.

## Release follow-up

1. In Render's service environment, set `CLIENT_URL=https://cynbit-smart-inquiry1.vercel.app`.
2. Redeploy the Render service.
3. Verify `OPTIONS https://cynbit-smart-inquiry.onrender.com/api/inquiries` returns HTTP 204 and the exact `Access-Control-Allow-Origin`.
4. Submit a controlled test inquiry from Vercel and verify the corresponding Atlas document.
5. Add genuine screenshots to the assessment if desired; do not fabricate a success screen.

## Git and safety constraints

- Preserve existing commits; never force-push.
- Do not commit `.env`, credentials, dependencies, or generated build output.
- For documentation-only updates, stage and commit only the documentation requested.
