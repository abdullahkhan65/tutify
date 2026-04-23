# Tutify — Future Plan & Feature Roadmap

> Shipping priority order. Each phase builds on the previous. Zero extra spend — all free-tier compatible.

---

## Phase 1 — Sell-Ready (Ship in 1–2 weeks)
*Goal: Make the product sellable to the first 100 paying students.*

### 1.1 FSc Part 2 Curriculum Content
- **File:** `lib/curriculum.ts`
- Add FSc Part 2 Physics, Chemistry, Math, Biology topic trees
- Doubles addressable market overnight
- No new UI needed — topics page picks it up automatically

### 1.2 Matric 9th & 10th Content
- **File:** `lib/curriculum.ts`
- Add Matric subjects for both years
- Opens the largest student segment in Pakistan

### 1.3 Fix Missing Pages (404s)
- `/settings` — profile, language, board/class edit, notification prefs
- `/admin/content` — past paper question management UI
- `/admin/analytics` — real charts from real DB data (replace static demo data)
- `/admin/sessions` — live session viewer
- Sidebar + admin nav links already exist, just need the pages

### 1.4 Mobile Responsiveness Audit
- Full mobile pass on chat, dashboard, exam mode
- Most Pakistani students are on Android phones
- No PWA needed yet — just responsive CSS

---

## Phase 2 — Retention & Depth (Ship in 2–4 weeks)
*Goal: Make students come back daily. Reduce churn.*

### 2.1 Photo Doubt Solver — HIGHEST IMPACT FEATURE
- Student uploads a photo of any question (textbook, handwritten, past paper)
- Gemini Vision reads it, solves it step by step with full explanation
- Gemini 2.0 Flash is already multimodal — just pass the image in the API call
- **New route:** `/api/doubt` or extend `/api/chat` with image support
- **UI addition:** Camera/upload button in ChatInterface
- This alone justifies the Rs. 499/month subscription

### 2.2 Past Paper Mode
- UI for selecting: Board → Subject → Year
- AI walks through each question with BISE-style explanation
- `past_paper_questions` table already exists in schema — needs data + UI
- **New route:** `/past-papers`
- Seed with 3 years of Punjab board papers (Physics, Chemistry, Math, Bio)
- Students actively Google this — SEO win too

### 2.3 Spaced Repetition + Weakness Engine
- After each exam/practice session, log weak topics to a `weak_topics` table
- Nightly cron (or on-login trigger) surfaces: "You haven't practiced Newton's Laws in 5 days and scored 40% last time"
- Dashboard widget: "Today's Review" — 5 questions from your weakest areas
- Turns the app from a chatbot into an actual learning system

### 2.4 Daily Practice Streak Enforcement
- Push notification / email reminder if student hasn't done 5 questions today
- Streak freeze mechanic (1 free freeze/week)
- Use Supabase Edge Functions + pg_cron for scheduling

---

## Phase 3 — AI Intelligence Layer (Ship in 1–2 months)
*Goal: Make the AI feel like it actually knows the student. Drive word-of-mouth.*

### 3.1 AI Study Planner
- Input: exam date + subject mastery scores (already tracked)
- Output: day-by-day study plan for next N days
- "You have 38 days until your FSc exam. Today: Chapter 4 Thermodynamics (weak area). Tomorrow: Past paper 2022 Chemistry."
- Gemini generates the plan, stored in DB, shown on dashboard
- The exam countdown banner is already there — this is the natural upgrade

### 3.2 Predicted Board Score
- Formula: weighted average of topic mastery scores, weighted by BISE chapter weightage
- "You're currently on track for 71% in Physics. To hit 85%, you need 2 more weeks on Waves & Sound."
- Shown on progress page — updated after every practice session
- Makes progress feel real and urgent

### 3.3 AI Answer Grader (Long Questions)
- Student types their answer to a long-form board question (5/8 marks)
- AI grades it exactly like a BISE examiner: checks for key terms, marks allocation, feedback on what to add
- No one else has this for Pakistani students
- **New UI:** grading mode in the exam flow, or a standalone `/grade` page

### 3.4 Socratic Mode
- New personality mode alongside Friendly / Strict / Exam Coach
- AI never directly answers — asks leading questions until student arrives at the answer
- "What do you think happens to acceleration if mass doubles, keeping force constant?"
- Toggle in ChatInterface alongside existing personality selector

### 3.5 Concept Map
- After covering a topic, AI generates a visual knowledge graph (nodes + edges)
- Mermaid flowchart already renders in the whiteboard — use that
- Node color = mastery level (red/yellow/green)
- Clicking a node opens chat pre-loaded with that topic

---

## Phase 4 — Growth & Monetization (Ship in 2–3 months)
*Goal: Get parents paying. Get schools buying. Go viral.*

### 4.1 Parent Dashboard
- Separate login flow for parents linked to student account
- Weekly AI-generated summary email: study hours, mastery trends, predicted score, recommended focus
- "Ahmad studied 6 hours this week. He improved in Chemistry (+12%) but needs work on Integration."
- Parents are often the ones paying — give them visibility, they'll renew
- **New route:** `/parent` with read-only view of student's progress

### 4.2 Collaborative Study Rooms
- 2–5 students join a shared chat session
- AI professor answers questions for the whole group
- Students can see each other's questions in real-time (Supabase Realtime already in stack)
- Viral mechanic — students invite friends, friends sign up
- **New route:** `/rooms`

### 4.3 Textbook Chapter Summarizer
- Student pastes or uploads a chapter
- AI generates: key points, definitions list, mind map (Mermaid), likely board exam questions, flashcard set
- **New route:** `/summarize`
- Massive time-saver before exams

### 4.4 Flashcard System
- AI auto-generates flashcards from chat sessions and chapter summaries
- Spaced repetition scheduling (show card again in 1/3/7/14 days based on difficulty)
- Student can also create manual cards
- **New route:** `/flashcards`

### 4.5 Leaderboard
- Weekly XP leaderboard by school / city / board
- Opt-in — privacy-respecting
- Drives competition and daily engagement
- Add to progress page

---

## Phase 5 — Platform Play (3–6 months)
*Goal: Become the operating system for Pakistani exam prep.*

### 5.1 Voice-First Tutor Mode
- Full two-way voice: student speaks → AI responds with voice
- Web Speech API already wired in for input + output
- Make it feel like a phone call with a tutor
- Killer feature for students who study while commuting

### 5.2 School & Academy Portal
- Bulk accounts for schools (Rs. 15,000/month plan already in pricing)
- Teacher dashboard: assign topics, view class-wide progress, set homework
- Admin can create school-scoped accounts from `/admin`

### 5.3 AI-Generated Video Explanations
- Text-to-speech + auto-generated slides from AI explanation
- Short 2–3 min video per concept
- Hosted on Supabase Storage (free 1GB)

### 5.4 Offline Mode (PWA)
- Cache curriculum, flashcards, study plan offline
- Critical for students with unreliable internet
- Service worker + Next.js PWA plugin

### 5.5 Vernacular Urdu UI
- Full Urdu interface (RTL layout) alongside English
- Bilingual toggle already exists for AI responses — extend to the whole UI
- Massive trust signal for non-English-comfortable students and parents

---

## Revenue Unlock Per Phase

| Phase | Feature | Revenue Impact |
|-------|---------|---------------|
| 1 | Full curriculum (Part 1+2+Matric) | Opens 4x market |
| 2 | Photo Doubt Solver | Primary reason to subscribe |
| 2 | Past Papers | SEO traffic + subscription driver |
| 3 | Study Planner + Predicted Score | Reduces churn significantly |
| 4 | Parent Dashboard | Parents renew subscriptions |
| 4 | Study Rooms | Viral growth mechanic |
| 5 | School Portal | Rs. 15k/month B2B deals |

---

## What NOT to build (yet)

- **Native iOS/Android app** — Next.js PWA is good enough until 1,000 users
- **Custom AI model** — Gemini free tier handles everything at this scale
- **Payment gateway** — wait until you have 50 paying users manually, then integrate JazzCash/EasyPaisa
- **Video content library** — too expensive to produce, AI-generated is the play

---

## Next Immediate Action

Start with **Phase 1** fully, then **Photo Doubt Solver** (2.1) as the first Phase 2 feature.

Those two moves alone make this a product you can actively sell.
