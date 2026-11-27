# Cynbit Smart Inquiry System

## Project purpose

Build a working prototype for the Cynbit Technologies Full Stack Developer Intern assessment. The prototype improves the existing website's contact journey with a structured, multi-step project inquiry; it does not replace the Cynbit website or add another generic contact form.

## Assessment requirements

- Select one of these services: AI Automation, Full-stack Development, Backend Systems, Cloud Infrastructure, or Technical SEO.
- Collect project description, estimated budget, expected timeline, and project/business type.
- Collect full name and email; company is optional.
- Let the visitor review the information before submitting.
- Show success only after the backend confirms that the inquiry was stored.
- Validate on both client and server, prevent duplicate submissions, and provide useful loading/error states.
- Do not expose private inquiries or commit environment secrets.
- Deliver a GitHub repository, a publicly accessible deployment, and a technical report describing the problem, technology choices, implementation, and results.

## Design direction

Match Cynbit's professional, minimalist SaaS style: deep teal (`#00666B`), off-white/light grey (`#F2F6F5`), charcoal (`#171D1D`), and white (`#FFFFFF`). Use responsive layouts, rounded cards, subtle shadows, accessible labels and keyboard navigation, and clear step progress. Avoid unrelated visuals, stock photography, and excessive animation.

## Intended architecture

- **Client:** React, Vite, JavaScript, Tailwind CSS, Axios, and React Hooks. Use React Router only if the final page flow needs it.
- **Server:** Node.js, Express, JavaScript ES modules, REST endpoints, and Mongoose.
- **Database:** MongoDB Atlas, configured via environment variables.
- **Deployment target:** Vercel for the frontend and Render for the backend.
- **API:** `GET /api/health` and `POST /api/inquiries`. The API should validate requests, apply basic rate limiting and security middleware, and never expose stored customer inquiries.
- **Inquiry data:** full name, email, optional company, service, project description, budget, timeline, project type, and creation time.
- **Suggested server organization:** `config/`, `controllers/`, `models/`, `routes/`, `middleware/`, and `server.js`.

## Existing workspace findings

- The Git repository is initialized locally at the project root.
- The `origin` remote is configured as `https://github.com/MohammedQadeer2/cynbit-smart-inquiry`.
- The current `main` branch has no commits. `git ls-remote --heads origin` returned no branch refs, so there is no evidence of an initial commit pushed to GitHub.
- Both `client/` and `server/` exist.
- The client has React 19 and Vite 8 installed, along with a Vite starter application. It has no Tailwind CSS or Axios dependency at this point.
- The server has Express 5, Mongoose 9, CORS, dotenv, and nodemon installed. `server.js` currently exposes only `GET /api/health`; there is no inquiry route, model, or database connection yet.
- The server contains a `.env` file. Its contents are intentionally not recorded or inspected.
- There is no root `.gitignore`; a server-specific `.gitignore` exists. Add a root ignore file before staging so client dependencies, environment files, and build outputs cannot be accidentally committed.
- The Vite and Express development servers have not been started or tested as part of this initial inspection.

## Decisions and constraints

- Keep the requested MERN-oriented stack and avoid unnecessary dependencies or architecture.
- Preserve the existing Git history (currently empty) and never force-push.
- Do not modify the original Cynbit website.
- Do not claim persistence or deployment until those have been implemented and verified.
- Work in small phases and pause for the user's confirmation before starting each subsequent major phase.

## Development progress

### Initial inspection

- Confirmed the repository remote, local branch/commit state, project folders, package manifests, installed dependencies, starter frontend, and current health-only backend.
- No application files have been replaced or modified during this inspection.
- This context document is the first requested project artifact.

### Next steps

1. Add a root `.gitignore` covering all `node_modules`, environment files, and build outputs; confirm Git status without staging secrets.
2. Verify whether the configured GitHub repository is empty and agree on the initial commit/push workflow.
3. Run and verify the existing Vite and Express development servers before application implementation.
4. Proceed with frontend foundation, then backend, integration, quality/deployment, and assessment documentation in separate confirmed phases.
