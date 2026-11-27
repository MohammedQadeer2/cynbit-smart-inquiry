# Cynbit Smart Inquiry

A responsive, four-step project inquiry prototype for Cynbit. It improves the existing contact experience by collecting a service choice, project requirements, contact details, and a final review before saving an inquiry.

## Problem and solution

The existing Cynbit website has a basic contact form. A single open-ended form can make it difficult for a prospective customer to describe what they need and for a team to triage the inquiry. This prototype guides visitors through a short sequence of structured questions and presents their answers for review before submission.

The backend validates the inquiry and stores it in MongoDB through Mongoose. The confirmation screen appears only when the API confirms that MongoDB accepted the write; missing or unavailable database configuration produces an explicit error instead.

## Features

- Four guided steps with progress indication and backward navigation.
- Five selectable services: AI Automation, Full-stack Development, Backend Systems, Cloud Infrastructure, and Technical SEO.
- Project description, budget, timeline, project type, contact, company, and industry fields.
- Client and server validation with field-level feedback.
- Review screen with edit shortcuts, loading state, duplicate-submit protection, and API error handling.
- Responsive layouts, keyboard-visible focus, reduced-motion support, and accessible form labels.
- Helmet security headers, restricted CORS, JSON request size limit, and inquiry rate limiting.
- Private inquiry storage: no public endpoint lists or returns customer inquiry records.

## Technology

- **Frontend:** React 19, Vite 8, JavaScript, CSS, Axios.
- **Backend:** Node.js, Express 5, Mongoose 9.
- **Database:** MongoDB Atlas (provided through `MONGODB_URI`).
- **Deployment targets:** Vercel (frontend), Render (backend).

Tailwind and a router are intentionally not included: the application uses one custom responsive stylesheet and a single-page step flow.

## Architecture

```text
client/
  src/
    components/       Reusable form, progress, review, and confirmation components
    data/             Shared client form-option lists
    services/         Axios API client
    utils/            Client-side validation
    App.jsx           Four-step inquiry flow
server/
  app.js              Express middleware, health route, and API mounting
  server.js           Environment loading, database connection, and HTTP startup
  config/db.js        MongoDB connection and readiness checks
  controllers/       Inquiry persistence
  middleware/        Request validation and centralized errors
  models/            Mongoose inquiry schema
  routes/             Inquiry API routes
  tests/              Node.js API and validation tests
  utils/              Allowed inquiry option values
render.yaml           Render Blueprint configuration
```

## Requirements

- Node.js `>=20.19.0` and npm.
- MongoDB Atlas database and a MongoDB connection string to persist inquiries.

## Local setup

From the repository root in PowerShell:

```powershell
npm --prefix server install
npm --prefix client install
if (-not (Test-Path 'server\.env')) { Copy-Item server\.env.example server\.env }
```

Set `MONGODB_URI` in `server\.env` to your own Atlas connection string. Replace the placeholder username, password, cluster, and database; do not commit this file. `CLIENT_URL` defaults to the local Vite origin below if omitted.

In one terminal, start the API:

```powershell
npm --prefix server run dev
```

In another terminal, start Vite:

```powershell
npm --prefix client run dev
```

Open the URL Vite prints (normally `http://localhost:5173`). The frontend sends requests to `http://localhost:5000` by default.

Without a valid `MONGODB_URI`, the API can still start and serve the health check, but inquiry submission returns HTTP 503 and the UI will not show a success confirmation.

## Environment variables

### Backend (`server/.env`)

| Variable | Required | Description |
| --- | --- | --- |
| `MONGODB_URI` | Yes, for inquiry storage | MongoDB Atlas connection string. Never expose it to frontend code. |
| `PORT` | No | HTTP port; defaults to `5000` locally and uses Render's assigned port in deployment. |
| `CLIENT_URL` | No locally; required for deployment | Comma-separated exact browser origins allowed by CORS. Local Vite origins are allowed by default. |

### Frontend (Vite environment)

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | No locally; required for deployment | Backend origin, for example `https://your-api.onrender.com` (do not append `/api`). Local default is `http://localhost:5000`. |

The sample backend environment file is `server/.env.example`; it contains placeholders only.

## API

### `GET /api/health`

Returns API status and booleans for database configuration/connection. It never returns connection details.

### `POST /api/inquiries`

Accepts JSON with all fields required except `company`:

```json
{
  "fullName": "Alex Morgan",
  "email": "alex@example.com",
  "company": "Example Co",
  "industry": "Technology",
  "service": "AI Automation",
  "description": "We need to automate a multi-step customer onboarding process.",
  "budget": "$5,000 – $15,000",
  "timeline": "1–3 months",
  "projectType": "Existing business"
}
```

On successful MongoDB persistence, returns HTTP `201` with a success message and the new inquiry ID. Validation errors return HTTP `400` with field-specific errors. Missing or unavailable MongoDB returns HTTP `503`; no success response is sent unless the database write succeeds. Requests are limited to 10 attempts per IP per 15 minutes.

There is deliberately no public endpoint for listing or reading stored inquiries.

## Validation and tests

```powershell
npm --prefix client run lint
npm --prefix client run build
npm --prefix server test
```

The backend test suite verifies health, required-field and email validation, allowed inquiry data, missing database behavior, and the absence of a public inquiry-list endpoint. A valid persistence test requires a configured, reachable MongoDB instance.

## Deployment

### Render backend

1. Connect the GitHub repository to Render and create a Blueprint from the root `render.yaml`, or create a Node web service with **Root Directory** `server`, **Build Command** `npm ci`, and **Start Command** `npm start`.
2. Set `MONGODB_URI` to the Atlas connection string. Ensure the Atlas network access rules allow the Render service to connect.
3. Set `CLIENT_URL` to the exact Vercel production origin, such as `https://your-project.vercel.app` (no trailing slash). Multiple trusted origins can be comma-separated.
4. Deploy and verify `https://<render-service>.onrender.com/api/health`. Its response should report `database.configured: true` and `database.connected: true`.

### Vercel frontend

1. Import the GitHub repository into Vercel and set **Root Directory** to `client`.
2. Set the production environment variable `VITE_API_URL` to the Render backend origin, without `/api`.
3. Deploy/redeploy and test the complete inquiry flow against the production API.
4. Set or update the Render `CLIENT_URL` with the deployed Vercel origin and redeploy the backend if needed.

Deployment is not considered complete until both public URLs and a persisted end-to-end inquiry have been verified.

## Security notes

- Keep all `.env` files local or in deployment secret settings; never commit database credentials.
- Store inquiry data only in the configured MongoDB database.
- Review Render and Atlas access settings before handling real customer data.
- The prototype does not implement email delivery or an authenticated inquiry-management dashboard.
