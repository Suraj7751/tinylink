# TinyLink

TinyLink — a small URL shortener built to match the TinyLink take-home assignment.

## Demo & assignment PDF

- Assignment PDF (local path included in repo): /mnt/data/Take-Home Assignment_ TinyLink (1) (2).pdf

## Stack

- Next.js (App Router)
- Prisma + Postgres (Neon)
- Tailwind CSS

## Setup (local)

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL`.
2. Install:
   ```bash
   npm install
   ```
3. Generate Prisma client and run migrations:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```
4. Run dev:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000

## Endpoints (autograder expectations)

- `GET /healthz` → 200 with `{ ok: true, version: "1.0" }`
- `POST /api/links` → create new link (409 if code exists)
- `GET /api/links` → list all links
- `GET /api/links/:code` → retrieve link stats
- `DELETE /api/links/:code` → delete link
- `GET /:code` → 302 redirect (increments clicks). After deletion should return 404.

## Notes about deployment (Vercel + Neon)

- Set `DATABASE_URL` and `NEXT_PUBLIC_BASE_URL` in Vercel environment variables.
- Ensure `prisma generate` runs before build; `build` script runs `prisma generate` then `next build`.
- Run `npx prisma migrate deploy` in your deployment step or CI to apply migrations on production.

## Video & LLM transcript

- Include a short 2–3 minute walkthrough video in repo (link here).
- If you used ChatGPT to help, include transcript file or link.

## Extra

- The assignment PDF path included above is the uploaded file path from the environment: /mnt/data/Take-Home Assignment_ TinyLink (1) (2).pdf
