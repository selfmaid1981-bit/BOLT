# Deployment Recommendations

This project is a Vite + React + TypeScript single-page app with Tailwind CSS and a Supabase-backed quote form. Use the guidance below to deploy it safely.

## Prerequisites
- Node.js 18+ and npm installed locally (Vite 5 requires Node 18 or newer).
- A Supabase project with a `quote_requests` table if you want live quote submissions.
- Two environment variables available to the runtime:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## Quick Local Verification
Run these commands before deploying:

```bash
npm install
npm run lint
npm run build
```

`npm run preview` lets you smoke-test the production build locally.

## Deploying to Vercel (recommended)
Vercel handles Vite builds well and keeps environment secrets in sync with previews.

1) Import the repo into Vercel.
2) Set build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3) Add environment variables in **Settings → Environment Variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4) Deploy. Vercel will run the build and host the static output from `dist/`.

## Deploying to Netlify
Netlify’s static hosting also works well for this app.

1) Create a new Netlify site from your Git repo.
2) Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3) Add environment variables in **Site settings → Environment variables**:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4) Deploy. Optional: enable Netlify Forms or Functions if you replace Supabase in the future.

## Deploying to GitHub Pages
If you do not need Supabase-backed submissions, GitHub Pages can host the static bundle.

1) Update the `base` option in `vite.config.ts` if deploying to a subpath (e.g., `/your-repo/`).
2) Run `npm run build`; the static site will be under `dist/`.
3) Publish `dist/` via GitHub Actions or `npm run deploy` if you add a gh-pages script.

## Supabase Setup (optional but recommended)
Create a `quote_requests` table matching `src/lib/supabase.ts` expectations:

```sql
create table quote_requests (
  id uuid primary key default gen_random_uuid(),
  service_type text not null,
  property_size text not null,
  bedrooms int not null,
  bathrooms int not null,
  frequency text not null,
  extras text[] not null default '{}',
  estimated_price numeric not null,
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  status text default 'pending',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

Set Row Level Security policies to allow inserts from your frontend (e.g., with an authenticated service role or appropriate policies), and rotate the anon key if needed.

## Production Hardening Checklist
- Configure a custom domain and HTTPS.
- Add analytics (e.g., Vercel Analytics) and error monitoring (e.g., Sentry) if desired.
- Keep `VITE_SUPABASE_ANON_KEY` scoped to minimal privileges via RLS.
- Consider adding a spam-prevention step (honeypot, rate limits, or CAPTCHA) around the quote form if abuse is a concern.
