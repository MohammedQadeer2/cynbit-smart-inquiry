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
- The initial `main` branch was empty locally and remotely. The requested initial commit has now been created and pushed; see development progress below.
- Both `client/` and `server/` exist.
- The client has React 19 and Vite 8 installed, along with a Vite starter application. It has no Tailwind CSS or Axios dependency at this point.
- The server has Express 5, Mongoose 9, CORS, dotenv, and nodemon installed. `server.js` currently exposes only `GET /api/health`; there is no inquiry route, model, or database connection yet.
- The server contains a `.env` file. Its contents are intentionally not recorded or inspected.
- A root `.gitignore` now excludes dependency folders, environment files, build output, logs, and common editor files. Existing client and server ignore files were preserved.
- The Vite and Express development servers have both passed HTTP smoke tests. The Vite production build also succeeds.

## Decisions and constraints

- Keep the requested MERN-oriented stack and avoid unnecessary dependencies or architecture.
- Preserve the existing Git history and never force-push.
- Do not modify the original Cynbit website.
- Do not claim persistence or deployment until those have been implemented and verified.
- Work in small phases and pause for the user's confirmation before starting each subsequent major phase.

## Development progress

### Initial inspection

- Confirmed the repository remote, local branch/commit state, project folders, package manifests, installed dependencies, starter frontend, and current health-only backend.
- Added this context document; no application files were replaced or modified during inspection.

### Phase 1 foundation

- Added the root `.gitignore` and confirmed dependencies, `.env`, build outputs, and local configuration are ignored.
- Confirmed the configured GitHub remote had no branch refs before the first push. No remote history was overwritten.
- Staged only the allowlisted source, package manifests/lockfiles, ignore files, and documentation. No `.env` or `node_modules` paths were staged.
- Created and pushed initial commit `10f1c4935a868f1db8a0c1626047eb53789fde49` (`chore: initialize Cynbit Smart Inquiry project`) to `origin/main`.
- Verified the Vite development page returned HTTP 200 and contained the application root.
- Verified `GET /api/health` returned HTTP 200 with `{"success":true,"message":"Cynbit Smart Inquiry API is running!"}`.
- Verified `npm --prefix client run build` succeeds. Temporary smoke-test server processes were stopped.

### Next steps

- Wait for confirmation before beginning frontend UI development.
- Future phases: frontend UI, backend inquiry persistence and validation, integration, quality/deployment, and assessment documentation.
