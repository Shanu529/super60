# Super 60 Community — Website

This project extends the original React/Vite site with a much larger
homepage, several new pages (Faculty, Projects, Gallery, Contact,
Announcements), and a full Node/Express/MongoDB backend with an admin
panel — while keeping every existing page, section and the original
dark/orange design system untouched.

```
.
├── frontend/   React + Vite site (public pages + /admin panel)
└── backend/    Express + MongoDB + Mongoose REST API
```

## Important: the frontend works without the backend

Every page fetches from the API first and **silently falls back to
bundled static content** (`frontend/src/data/fallback.js`) if the
request fails. That means:

- You can run `npm run dev` in `frontend/` right now and the whole
  site — including Faculty, Projects, Gallery — will render fully
  populated, even with no backend running at all.
- Once you start the backend and seed the database, the site
  automatically switches to live, admin-managed data — no code
  changes needed.

## 1. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. Optionally copy `.env.example` to
`.env` if your backend runs somewhere other than
`http://localhost:5000/api`.

## 2. Run the backend

Requires Node.js 18+ and a MongoDB instance (local `mongod`, or a
free MongoDB Atlas cluster).

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET, and your admin email/password
npm run seed     # creates the admin account + populates initial content
npm run dev      # starts the API on http://localhost:5000
```

## 3. Log into the admin panel

Go to `http://localhost:5173/admin/login` and sign in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in `backend/.env` (defaults
are `admin@super60.org` / `ChangeMe123!` — **change these before
deploying**). From there you can manage:

- Faculty members, HOD, Mentor, Academic Teacher
- Projects (with categories, tech, features, timeline, team, status)
- Events, Gallery, Announcements
- Homepage content (vision/mission, why-choose-us, highlights,
  stats, contact info)

All content is dynamic — nothing is hardcoded once the backend is
connected and seeded.

## Notes & next steps

- **Animations**: the site now uses Framer Motion (scroll reveals, staggered
  grids, page transitions, the event-details shared-element modal, navbar
  micro-interactions) and GSAP + ScrollTrigger (the hero's entrance timeline
  and scroll-linked parallax glow). Both respect `prefers-reduced-motion` —
  motion is automatically minimized/skipped for users who have that OS
  setting enabled. Shared timing/easing lives in `frontend/src/lib/motion.js`
  so new sections can reuse the same "premium" feel instead of inventing new
  numbers. Run `npm install` in `frontend/` to pull in `framer-motion` and
  `gsap` before starting the dev server.
- **Event details**: clicking any event card (Home or the Events page) opens
  an animated details view with the full description, date, time, location,
  category and organizer. This pulls from the same `/api/events` data the
  admin panel manages — add `time`/`category`/`organizer` when creating or
  editing an event to have them show up there.

- **Images**: every faculty member, HOD/Mentor/Teacher card, project,
  event and gallery item shows an on-brand placeholder graphic
  (`frontend/public/placeholders/`) until an admin uploads a real
  photo from the admin panel — upload a file in any "Photo" /
  "Cover Image" field, save, and it's stored under `backend/uploads/`
  and immediately shown on the live site (served at `/uploads/...`).
  If an uploaded image URL ever fails to load, the page quietly falls
  back to the placeholder instead of showing a broken image icon.
  For production, swap local disk storage for a cloud bucket (S3,
  Cloudinary, etc.) if you expect heavy traffic — local disk storage
  doesn't scale across multiple server instances.
- **Security**: change `JWT_SECRET` and the seeded admin password
  before deploying. Consider adding rate limiting to `/api/auth/login`
  and `/api/contact`.
- **Validation**: the backend relies on Mongoose schema validation.
  For stricter input validation (e.g. email format, string length
  limits) consider adding a library like `zod` or `joi` on top of
  the existing controllers.
- This codebase was built and syntax-validated in a sandboxed
  environment without network access, so `npm install` has not been
  run end-to-end against a live MongoDB instance. The code follows
  standard, well-tested patterns (Express + Mongoose + JWT), but do
  a local smoke test after installing dependencies.
