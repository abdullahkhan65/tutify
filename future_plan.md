# Tutify — Future Plan & Feature Roadmap

> Shipping priority order. Competitive analysis included. Updated: April 2026.

---

## ✅ Phase 1 — Sell-Ready (COMPLETED)

### ✅ 1.1 FSc Part 2 Curriculum Content
### ✅ 1.2 Matric 9th & 10th Content
### ✅ 1.3 Fix Missing Pages (settings, admin/content, admin/analytics, admin/sessions)
### ✅ 1.4 Mobile Responsiveness (bottom nav, pb-safe, sidebar hidden on mobile)

**Bonus shipped beyond plan:**
- ✅ Topic Hub page (`/topics/[topicId]`) — checklist, stats, recent tests per topic
- ✅ Test history with per-question breakdown (what you got wrong, correct answer, explanation)
- ✅ Switched from Gemini to Groq (Llama 3.3 70B) for reliability
- ✅ Admin analytics with real Recharts (signups, tests, avg score by subject)

---

## 🔥 Phase 2 — Retention & Depth (Next 2–4 weeks)

### 2.1 Photo Doubt Solver — HIGHEST IMPACT
- Student uploads photo of textbook/handwritten question
- Groq Vision (or Gemini) reads + solves step by step
- Extend `/api/chat` with base64 image support
- Camera button in ChatInterface
- **Kills Photomath** — we do all subjects, not just math

### 2.2 Past Paper Mode
- `/past-papers` page: Board → Subject → Year → questions
- AI walks through each with BISE-style explanation
- `past_paper_questions` table exists — needs UI + seed data

### 2.3 MDCAT / ECAT Prep Module — NEW PRIORITY
- 100,000+ students take MDCAT yearly (medical admission)
- ECAT for engineering
- Same AI tutor, different curriculum module
- **Huge underserved market. No good AI product for this.**

### 2.4 Spaced Repetition + Weakness Engine
- After test: log weak topics to `weak_topics`
- "Today's Review" widget on dashboard: 5 Qs from weakest areas
- Turns app from chatbot into actual learning system

### 2.5 Daily Practice Streak Enforcement
- Email reminder if student hasn't done 5 Qs today
- Streak freeze mechanic (1 free/week)
- Supabase Edge Functions + pg_cron

---

## 🤝 Phase 3 — Study Community (1–2 months)
*Goal: Make Tutify a social platform, not just a solo tool. Social = retention + viral growth.*

### 3.1 Study Groups (Circles)
- Students create or join groups by board/class/subject/goal
- Examples: "FSc Physics 2026 Punjab Board", "MDCAT Prep Karachi", "Matric Bio Group Lahore"
- Public groups (browse & join) + Private groups (invite-only)
- Group feed: activity, shared milestones, announcements
- AI-generated weekly group insight: "Your group's weakest area is Waves. Schedule a group session?"
- **DB:** `communities`, `community_members` tables
- **Route:** `/community`

### 3.2 Challenge / Duel Mode ⚔️
- Any student can challenge a friend to a 5-question duel on any topic
- Both answer same AI-generated questions simultaneously
- Live score comparison after each question
- Winner gets XP bonus, loser gets "Revenge?" button
- Challenge notifications via in-app bell
- **DB:** `community_challenges` table (challenger_id, challenged_id, topic, scores, status)
- Most viral feature — students will share results

### 3.3 Focus Rooms (Virtual Co-Study)
- Named rooms with running Pomodoro timer (25/5 or 50/10)
- Students join a room, others see "12 students studying Chemistry right now"
- Cannot chat during focus — accountability only
- At end of session: quick poll "What did you cover?" → logged to progress
- **Supabase Realtime** for live participant count
- **Route:** `/rooms`

### 3.4 Community Q&A Board
- Students post questions, others answer
- AI validates top answers and marks correct ones
- BISE question tags ("Chemistry FSc1 Thermodynamics")
- Upvote system — best explanations surface
- AI can step in if unanswered for 2h
- "This question appeared in BISE Punjab 2022" badge on confirmed past paper Qs
- **Route:** `/community/qa`

### 3.5 Shared Milestones & Group To-Dos
- Group admin creates milestones: "Complete Chapter 5 by May 10"
- Members mark personal completion — group progress bar fills up
- "Ahmad ✅ Fatima ✅ Zainab ⏳" visible to group
- Group to-do list: shared tasks with due dates and assignees
- AI suggests milestones based on exam date + current mastery gaps
- **DB:** `community_milestones`, `community_todos` tables

### 3.6 Social Leaderboard
- Weekly XP leaderboard: within friend group, school, city, board, national
- Subject-specific: "Top Physics scorer in Punjab this week"
- Opt-in privacy-respecting (show first name + last initial)
- Streak-based badges visible on profile
- Seasonal trophies: "Pre-Board Sprint Champion April 2026"
- Lives on `/community` and `/progress` pages

### 3.7 Student Profiles (Public)
- Public profile at `/u/username`: photo, board/class, subjects, mastery heatmap, badges earned
- "Study with me" button → sends challenge or focus room invite
- Parents can share child's profile as proof of progress
- Privacy toggle: public / friends only / private

---

## 🧠 Phase 4 — AI Intelligence Layer (2–3 months)

### 3.1 AI Study Planner
- Input: exam date + topic mastery
- Output: day-by-day plan for next N days
- "You have 38 days. Today: Thermodynamics (weak). Tomorrow: Past Paper Chemistry 2022."

### 3.2 Predicted Board Score
- Weighted average of mastery × BISE chapter weightage
- "Currently on track for 71%. To hit 85%, need 2 more weeks on Waves."

### 3.3 AI Answer Grader (Long Questions)
- Student types handwritten-style answer to a board long question
- AI grades exactly like BISE: key terms, marks, feedback
- **No one has this for Pakistani students**

### 3.4 Exam Countdown Sprint Mode — NEW
- 30 days before board exams: app switches to sprint mode
- Daily mock tests, focus only on weak areas, countdown banner
- Urgency drives engagement through exam season

### 3.5 AI Revision Notes Generator — NEW
- Student pastes a chapter, AI generates:
  - Dense revision notes (1-pager)
  - Definition list
  - Likely board exam questions
  - Mnemonic devices
- **Kills the printed notes market**

### 3.6 Socratic Mode
- AI never directly answers — asks leading questions
- Toggle in ChatInterface

### 3.7 Concept Map
- After covering topic, AI generates visual knowledge graph (Mermaid)
- Node color = mastery level. Click node → opens that topic.

---

## 👨‍👩‍👧 Phase 5 — Growth & Monetization (2–3 months)

### 4.1 Parent Dashboard — CRITICAL FOR RETENTION
- Separate login linked to student
- Weekly AI summary email: hours studied, mastery trends, predicted score
- "Ahmad studied 6h this week. Chemistry +12%. Needs work on Integration."
- **Parents are paying — give them visibility, they'll renew subscriptions**
- `/parent` route with read-only student view

### 4.2 WhatsApp Bot — NEW, HIGH IMPACT
- Students live on WhatsApp in Pakistan
- Bot that answers BISE questions in WhatsApp
- No app install required — massive top-of-funnel
- Twilio WhatsApp API + Groq = works on free tier

### 4.3 School & Academy Portal — B2B
- Bulk accounts: Rs. 15,000/month for 50 students
- Teacher assigns topics, views class progress, sets homework
- `/school` admin dashboard

### 4.4 Collaborative Study Rooms
- 2–5 students in shared AI session
- Supabase Realtime already in stack
- Viral: students invite friends, friends sign up
- `/rooms`

### 4.5 Textbook Chapter Summarizer
- Upload chapter → AI generates notes, mind map, flashcards, likely questions
- `/summarize`

### 4.6 Flashcard System with Spaced Repetition
- Auto-generated from sessions + summaries
- Spaced repetition scheduling
- `/flashcards`

### 4.7 Leaderboard
- Weekly XP leaderboard by school/city/board
- Opt-in. Drives competition.

---

## 🚀 Phase 6 — Platform Play (3–6 months)

### 5.1 Voice-First Tutor Mode
- Two-way voice: student speaks, AI responds with voice
- Web Speech API already wired in
- Killer for students commuting

### 5.2 AI-Generated Video Explanations
- Text-to-speech + auto slides per concept
- 2–3 min video, hosted on Supabase Storage

### 5.3 O/A Level Module — NEW
- Cambridge curriculum module
- Higher purchasing power students
- Opens Pakistan's top 5% schools

### 5.4 NTS/CSS Prep — NEW
- Government job entrance exams
- Completely underserved by AI products
- Different user segment (graduates)

### 5.5 Offline Mode (PWA)
- Cache curriculum, flashcards, study plan offline
- Critical for unreliable internet areas

### 5.6 Vernacular Urdu UI
- Full RTL Urdu interface
- Massive trust signal for non-English-comfortable families

---

## Competitive Analysis

### Why Chegg ($500M revenue) won't win in Pakistan:
- US-only curriculum, no BISE content
- $15.95/month (Rs. 4,400) — 9x our price
- Expert Q&A is slow (hours, not seconds)
- No real-time AI conversation
- **Our edge: Pakistan curriculum + instant AI + 1/9th the price**

### Why Khan Academy (Free) won't replace us:
- Passive video, not conversation
- US curriculum, not BISE/FSc
- No exam simulation for board papers
- No progress prediction
- No Urdu AI tutoring
- **Our edge: 2-way AI that knows exactly what BISE examiners want**

### Why Byju's (Rs. 30,000–50,000/year) is vulnerable:
- India-focused (slightly different curriculum)
- Video-heavy, not interactive
- Massive sales pressure, high churn
- Severe financial troubles
- No AI conversation layer
- **Our edge: Interactive AI + Pakistan-specific + 10x cheaper**

### Why Photomath can't compete:
- Math only, no other subjects
- No curriculum alignment
- No past papers, no board exam context
- **Our edge: All subjects, BISE-specific, depth of explanation**

### Unique moats we're building:
1. Pakistan BISE curriculum database (defensible, competitors won't build this)
2. Past paper bank (years of board papers = rare dataset)
3. Student performance data (trains better weak-area detection over time)
4. Parent engagement (retention moat — parents who see progress don't cancel)
5. School partnerships (sticky B2B contracts)

---

## Revenue Unlock Per Phase

| Phase | Feature | Revenue Impact |
|-------|---------|---------------|
| 1 ✅ | Full curriculum (Part 1+2+Matric) | 4x addressable market |
| 2 | Photo Doubt Solver | Primary subscription justification |
| 2 | MDCAT/ECAT Module | New 100k student market |
| 2 | Past Papers | SEO + subscription driver |
| 3 | Study Groups & Challenges | Viral growth — students invite friends |
| 3 | Challenge/Duel Mode | Most shareable feature — social virality |
| 3 | Focus Rooms | Daily retention — students return to study with friends |
| 4 | Study Planner + Predicted Score | Reduces churn significantly |
| 4 | Exam Countdown Sprint | Spikes engagement pre-exam |
| 5 | Parent Dashboard | Parents renew subscriptions |
| 5 | WhatsApp Bot | Top-of-funnel, zero install friction |
| 5 | School Portal | Rs. 15k/month B2B contracts |
| 6 | O/A Level | Higher ARPU segment |
| 6 | NTS/CSS | Graduate market expansion |

---

## What NOT to Build Yet
- Native iOS/Android app — Next.js PWA until 1,000+ users
- Custom AI model — Groq/Gemini handles everything at this scale
- Payment gateway — wait for 50 manual paying students, then JazzCash/EasyPaisa
- Video content library — AI-generated is the play, human production too expensive

---

## Realistic Timeline

| Month | Milestone |
|-------|-----------|
| May 2026 | Photo Doubt Solver + Past Paper Mode live |
| May 2026 | MDCAT module launched |
| Jun 2026 | Study Groups + Challenge/Duel Mode live |
| Jun 2026 | First 100 paying students |
| Jul 2026 | Focus Rooms + Community Q&A + Leaderboard |
| Jul 2026 | AI Study Planner + Score Predictor |
| Aug 2026 | Parent Dashboard (critical before new school year) |
| Aug 2026 | Student public profiles + social sharing |
| Sep 2026 | WhatsApp bot + School portal pilot |
| Oct 2026 | Exam Countdown Sprint (board exams season) |
| Dec 2026 | 1,000 paying students — raise seed round |
