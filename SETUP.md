# Tutify — Setup Guide

## 3 things you need to get running (all free)

---

## Step 1: Google Gemini API Key (2 minutes)

1. Go to https://aistudio.google.com/apikey
2. Click **Create API Key**
3. Copy the key
4. Add to `.env.local`: `GEMINI_API_KEY=your-key-here`

**Free tier:** 15 requests/minute, 1 million tokens/day — enough for hundreds of student sessions.

---

## Step 2: Supabase (5 minutes)

1. Go to https://supabase.com → **New Project**
2. Pick a region close to Pakistan (e.g., Singapore)
3. Wait for project to start (~2 min)
4. Go to **Settings → API**
5. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`
6. Go to **SQL Editor** → paste the entire contents of `supabase/schema.sql` → **Run**
7. Go to **Authentication → Providers → Google** → enable it (optional, for Google login)

**Free tier:** 500MB database, 50k monthly active users, 50MB storage

---

## Step 3: Fill in .env.local

```bash
cp .env.local.example .env.local
# Then edit .env.local with your keys
```

---

## Step 4: Make yourself admin

After creating your account on the app, go to Supabase SQL Editor and run:

```sql
UPDATE profiles
SET is_admin = true
WHERE email = 'abdullah@oscar.ai';
```

Then visit `http://localhost:3000/admin` — you'll have full access.

---

## Running locally

```bash
npm run dev
# Open http://localhost:3000
```

---

## Deploying to Vercel (free)

```bash
npm install -g vercel
vercel
# Follow prompts, add environment variables when asked
```

Or connect your GitHub repo to Vercel dashboard at https://vercel.com

---

## What's built

| Route | Description |
|---|---|
| `/` | Landing page |
| `/signup` | Create account |
| `/login` | Sign in |
| `/onboarding` | Board/class/subject setup |
| `/dashboard` | Topic navigator, stats, recent sessions |
| `/chat` | AI Professor + Smart Whiteboard |
| `/topics` | Full topic library |
| `/progress` | Mastery scores, test history, badges |
| `/admin` | Admin overview (you only) |
| `/admin/users` | All users table |
| `/admin/flags` | Feature flags toggle |
| `/api/chat` | Gemini streaming endpoint |

---

## Adding content (past paper questions)

In Supabase dashboard → **Table Editor** → `past_paper_questions`:
- Add questions with: topic_id, year, board, question_text, options (JSON), correct_answer
- These appear in the "Past Papers" section

---

## Curriculum data

Curriculum is in `lib/curriculum.ts` — FSc Part 1 Physics, Chemistry, Math, Biology are seeded.
Add more subjects/chapters directly in that file — it's the single source of truth.
