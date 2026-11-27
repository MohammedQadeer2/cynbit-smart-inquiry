# Cynbit Smart Inquiry System — Technical Assessment Report

## 1. Problem statement

Cynbit's existing website already has a contact form, but a general-purpose inquiry can leave important project details unclear. This prototype improves that journey without replacing the Cynbit website: it guides prospective customers through a short sequence that captures their service area, project requirements, contact information, and a final review.

## 2. Proposed solution

The application provides a four-step responsive inquiry:

1. Select one of five Cynbit service areas.
2. Describe the project and choose a budget, timeline, and project type.
3. Enter a name, email, optional company, and industry.
4. Review the submitted details and make edits before sending.

The React client submits to an Express REST API. The API validates the data and stores it in MongoDB through Mongoose. Confirmation is shown only after a successful database write; otherwise, the user receives a clear error.

## 3. Technology choices

- **React and Vite:** lightweight component-based frontend and production bundling, matching the requested stack.
- **Custom CSS:** responsive layout and Cynbit-inspired teal/off-white/charcoal styling without adding a styling dependency for this focused single-page flow.
- **Axios:** centralized API requests with a configurable `VITE_API_URL`.
- **Node.js and Express:** small REST backend with separate routing, validation, controller, and error-handling modules.
- **Mongoose and MongoDB Atlas:** schema-validated persistence; connection uses backend-only `MONGODB_URI`.
- **Helmet, CORS, express-rate-limit:** baseline security headers, exact-origin allowlist, and inquiry request limiting.

No router, Tailwind, email service, or customer inquiry dashboard was added because those are outside the prototype's required journey.

## 4. Implementation

### Frontend

Reusable React components cover branding/navigation, progress, service cards, form fields, requirements, contact details, review, and success. Form state remains in the parent across step changes. Client-side checks provide field-level errors; the submission control prevents duplicate requests and shows loading. API errors are visible, and the success view is reachable only after the backend returns a success response.

The responsive interface uses the requested color direction, keyboard-visible focus, semantic labels, and reduced-motion handling.

### Backend

`GET /api/health` reports API availability and MongoDB configured/connected booleans without exposing connection details. `POST /api/inquiries` validates required fields, email format, allowed values, and description length before checking database readiness and persisting the document.

The API applies Helmet, CORS restrictions, a 10 KB JSON body limit, and a limit of 10 inquiry requests per IP per 15 minutes. There is no public inquiry listing route. If MongoDB is absent or unavailable, valid inquiry requests return HTTP 503; no in-memory or success-shaped fallback is used.

## 5. Verification and results

| Check | Result |
| --- | --- |
| Frontend ESLint | Passed |
| Vite production build | Passed |
| Backend automated tests | 6 passed, 0 failed |
| Backend dependency audit | 0 vulnerabilities |
| Frontend production dependency audit | 0 vulnerabilities |
| Express startup and health endpoint | HTTP 200 |
| Missing required fields | HTTP 400 with field errors |
| Invalid email / short description | HTTP 400 |
| Untrusted CORS origin | HTTP 403 |
| Valid payload without database | HTTP 503; no success or inquiry ID returned |
| Browser flow | Service validation, step navigation, review/edit, and field preservation verified |
| Responsive check | No horizontal overflow at 1440px desktop and 390px mobile viewports |
| Public deployment | Not performed |
| MongoDB persistence | Not verified; no MongoDB URI was configured in the test runtime |

During browser testing, the frontend displayed the backend's explicit “MONGODB_URI is not configured” error and did not display confirmation. The existing local `.env` was not inspected or exposed.

## 6. Limitations and next steps

- Configure a MongoDB Atlas connection string in the backend environment, allow the deployment service through Atlas network access, and verify database connection and a controlled inquiry write/readback.
- Deploy the backend to Render, set the exact Vercel origin in `CLIENT_URL`, deploy the frontend to Vercel with `VITE_API_URL`, then verify a persisted end-to-end inquiry through the public URLs.
- The prototype does not send notification email and has no authenticated inquiry-management interface.

See [`README.md`](./README.md) for environment setup, API details, local commands, and deployment instructions.
