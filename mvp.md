# Tutify — From MVP to Production-Ready Product

> "Your personal AI professor who knows your board syllabus, remembers your weak topics, and won't let you fail."

---

## The Brutal Honest Question (Answered)

**Why would a student use this instead of free ChatGPT?**

| ChatGPT | Tutify |
|---|---|
| Generic world knowledge | Pakistani board syllabus (FSc, Matric, O/A Levels) |
| No memory between chats | Remembers every session, every mistake |
| No structure | Guided topic paths, not open-ended |
| Can't render math properly | KaTeX whiteboard, step-by-step equations |
| No exam simulation | BISE-style MCQs, past paper mode |
| No progress | XP, streaks, score prediction |
| English only | Urdu + English bilingual explanations |
| No accountability | Weekly reports to student (and parent) |
| No curriculum context | Knows FSc Part 1, Part 2, Matric chapter-by-chapter |

**Positioning:**
> ❌ Not: "An AI tutor"
> ✅ Yes: "Score 85%+ on your BISE board exam — or your money back"

---

## Target Users

**Primary:** FSc (Part 1 & 2) students — Physics, Chemistry, Math, Biology
**Secondary:** Matric students (9th & 10th grade)
**Tertiary:** O/A Level students
**Paying party:** Parents (they control the wallet)

**Student pain points:**
- Academy fees are expensive (Rs. 3,000–8,000/month per subject)
- Teachers move too fast in class
- Embarrassed to ask "dumb" questions in front of peers
- Past papers are scattered everywhere
- No one tracks their weak areas consistently
- Study sessions feel unproductive

---

## The Product: "Tutify"

A curriculum-aligned AI professor with memory, visual learning tools, exam simulation, and progress coaching — built specifically for Pakistani students.

---

## Full Feature Set

### TIER 1 — Core MVP (Month 1–2)

#### 1. AI Professor Chat
- Streaming responses (feels alive, not loading)
- Curriculum-aware system prompt (knows FSc/Matric syllabus chapter by chapter)
- Explains concepts step-by-step automatically
- Detects confusion from follow-up questions and auto-simplifies
- "Explain like I'm 10" one-click mode
- Three personalities: Friendly, Strict, Exam-Coach
- Bilingual toggle: explains in English → switches to Urdu on request

#### 2. Smart Whiteboard (RIGHT SIDE PANEL — this is the WOW)
- AI responses automatically rendered with:
  - **KaTeX** for all math equations (not plain text — proper formatted math)
  - **Mermaid.js** for diagrams (circuit diagrams, flowcharts, biology processes)
  - **Highlighted key terms** (clickable — instant definition/deeper explanation)
  - **Step-by-step breakdowns** in numbered collapsible sections
- User can click any equation: "Show me how this was derived"
- User can click any diagram node: "Explain this part more"
- Whiteboard auto-saves per session

#### 3. Topic Navigator
- Subjects: Physics, Chemistry, Math, Biology, English, Urdu, Pakistan Studies, Islamiat
- Organized by: Board → Class → Chapter → Topic
- Each topic has: estimated learning time, difficulty level, prerequisite topics
- Progress indicator per topic (not started / in progress / mastered)
- "Continue where you left off" on dashboard

#### 4. Auth & Onboarding
- Sign up with email or Google
- Onboarding: select board (Punjab/Sindh/KPK/Federal/O Level/A Level), class, subjects
- Set exam date → app auto-generates a study plan
- Profile: name, class, target score

---

### TIER 2 — Exam Engine (Month 2–3)

#### 5. Exam Mode (THIS IS WHAT SELLS)
- After any explanation: "Test yourself now?"
- AI generates:
  - MCQs (BISE-style, 4 options)
  - Short answer questions
  - Numerical problems with step-by-step solution checker
- Timer mode (exam simulation)
- Instant feedback per question with explanation
- Score + detailed breakdown after each test
- Tracks accuracy and time per topic over history

#### 6. Past Papers Mode
- Curated BISE past paper questions (2015–2024) organized by topic
- Student practices a question → AI grades and explains
- "This question appeared 4 times in the last 5 years" tag
- Predicted hot topics for next exam (based on frequency analysis)

#### 7. Weak Area Engine
- Auto-detects topics where accuracy < 60% or time is too slow
- Proactive: "You've been struggling with Newton's 3rd Law. Want to revise?"
- "Rescue Plan" — auto-generates a focused revision session for weak areas
- Weekly digest email: "Your top 3 weak areas this week"

---

### TIER 3 — Retention & Engagement (Month 3–4)

#### 8. Gamification System
- **XP** earned per: topic studied, test completed, streak maintained, correct answer
- **Level system**: Beginner → Scholar → Genius → Professor
- **Daily streaks** with motivational messages (Urdu + English)
- **Badges**: "First 100 XP", "7-day streak", "Full marks in Chemistry MCQ", etc.
- **Leaderboard** (optional, school/class-based)

#### 9. Study Planner
- Input: exam date, subjects, available hours/day
- Output: daily study schedule broken into 25-min focused sessions
- Calendar view with topic assignments per day
- AI adjusts the plan if student falls behind
- "Catch-up mode" if 3+ days missed

#### 10. Voice Interaction
- Voice input: student speaks the question (Web Speech API — free, browser-built-in)
- Voice output: AI professor reads the explanation (Web Speech Synthesis — free)
- Optional upgrade: ElevenLabs TTS (premium voice, 10k chars/month free)

#### 11. Session History & Notes
- Every session auto-saved with topic, questions asked, whiteboard state
- Auto-generated "session summary" (3-5 key points learned)
- Student can add personal notes per topic
- "Study Journal" view — calendar of all sessions

---

### TIER 4 — Social & Virality (Month 4–5)

#### 12. Study Groups (Free viral growth engine)
- Create or join a study group (class/school-based)
- Shared leaderboard within group
- "Challenge a friend" — same test, compare scores
- Group chat with AI moderation
- Share achievements/badges to WhatsApp (huge for Pakistan)

#### 13. Score Predictor (PARENT-FACING KILLER FEATURE)
- Based on test performance over time
- "Based on your current pace, you are on track for 72% in Physics"
- "To reach 85%, you need to improve in: Thermodynamics, Optics"
- Sends weekly PDF report to parent email
- This is literally what academies charge Rs. 5,000/month for

#### 14. Parent Dashboard
- Separate login for parents
- Weekly activity report: sessions, topics, test scores
- Score prediction
- "Your child hasn't studied in 3 days" alert
- Direct insight without intrusion

---

### Admin Panel (Runs Parallel to All Tiers)

Full admin dashboard at `/admin` — protected route, your login only.

#### Overview Dashboard
- Total users (today / this week / all time)
- Active sessions (real-time)
- Subject breakdown (most used topics)
- API usage and cost tracking (Gemini tokens used)
- Error rate monitor

#### User Management
- Full user list with: name, email, board, class, last active, plan
- Search and filter
- View individual user's full activity (sessions, tests, scores)
- Manually upgrade/downgrade plan
- Ban/suspend account

#### Content Management
- Add/edit/delete subjects, chapters, topics
- Upload past paper questions (with answer key)
- Tag questions by: year, board, topic, difficulty
- Manage badge/achievement definitions
- Edit system prompts per subject (tune AI behavior)

#### Analytics
- Retention curves (Day 1, Day 7, Day 30)
- Most studied topics (heatmap)
- Exam mode completion rates
- Average session length
- Funnel: signup → first session → exam mode → paid

#### Revenue
- Active subscribers (Free / Basic / Pro)
- Monthly Recurring Revenue (MRR)
- Churn rate
- Failed payments

#### Feature Flags
- Toggle any feature on/off without deployment
- A/B test descriptions/prompts
- Enable/disable new features per user group
- Maintenance mode

---

## Tech Stack — 100% Free to Run

### Frontend
| Tool | Purpose | Cost |
|---|---|---|
| Next.js 14 (App Router) | Framework | Free |
| TypeScript | Type safety | Free |
| Tailwind CSS | Styling | Free |
| shadcn/ui | Component library (beautiful) | Free |
| Framer Motion | Animations | Free |
| KaTeX | Math equation rendering | Free |
| Mermaid.js | Auto-generated diagrams | Free |
| React Flow | Concept map visualization | Free |
| Recharts | Progress charts/analytics | Free |
| Zustand | State management | Free |

### Backend / Infrastructure
| Tool | Purpose | Cost |
|---|---|---|
| Next.js API Routes | Backend (serverless) | Free |
| Supabase | PostgreSQL DB + Auth + Storage + Realtime | Free (500MB) |
| Vercel | Hosting + deployment + edge | Free |
| Resend | Transactional emails | Free (3k/month) |

### AI / Intelligence
| Tool | Purpose | Cost |
|---|---|---|
| Google Gemini 1.5 Flash | Main AI brain (streaming) | FREE — 15 RPM, 1M tokens/day |
| Gemini 1.5 Pro | Complex reasoning (fallback) | FREE tier available |
| Web Speech API | Voice input (browser built-in) | Free |
| Web Speech Synthesis | Voice output (browser built-in) | Free |
| ElevenLabs | Premium AI voice (upgrade path) | Free tier: 10k chars/month |

**Why Gemini over OpenAI?**
- Gemini 1.5 Flash: 1 million tokens per day FREE — that's thousands of student sessions
- OpenAI GPT-4: costs money from day 1
- Gemini handles Urdu very well
- 1M context window = can include full syllabus in system prompt

### Why This Stack Wins
- Zero hosting cost until significant scale (Vercel free = 100GB bandwidth/month)
- Supabase free tier = enough for first 500–1000 users
- Gemini free tier = enough to grow to paying users before spending a rupee
- All open source, no vendor lock-in

---

## Database Schema (Simplified)

```
users                    — id, email, name, board, class, plan, created_at
subjects                 — id, name, board, class
chapters                 — id, subject_id, title, order
topics                   — id, chapter_id, title, difficulty, estimated_minutes
sessions                 — id, user_id, topic_id, started_at, ended_at, summary
messages                 — id, session_id, role, content, whiteboard_data, created_at
tests                    — id, user_id, topic_id, score, time_taken, created_at
test_questions           — id, test_id, question, correct_answer, user_answer, explanation
user_progress            — id, user_id, topic_id, mastery_score, last_studied, attempts
past_paper_questions     — id, topic_id, year, board, question, answer, frequency_count
badges                   — id, name, description, xp_reward, condition
user_badges              — id, user_id, badge_id, earned_at
study_plans              — id, user_id, exam_date, generated_plan (JSON), updated_at
study_groups             — id, name, created_by, invite_code
group_members            — id, group_id, user_id, joined_at
subscriptions            — id, user_id, plan, status, started_at, expires_at
```

---

## UI/UX Design Vision

### Design Language
- **Dark mode first** (students study at night — this is non-negotiable)
- **Accent color**: Electric purple `#7C3AED` + Teal `#0D9488` — premium, modern, not childish
- **Typography**: Inter (clean) + JetBrains Mono (for equations/code)
- **Motion**: Subtle, purposeful — Framer Motion spring animations
- **Feel**: "Notion meets Duolingo meets a premium EdTech app"

### Core Layout (Desktop)
```
┌─────────────────────────────────────────────────────────────┐
│  Logo    Topic Navigator    [Streak 🔥7]  [XP 1240]  Avatar  │
├──────────────────┬──────────────────────────────────────────┤
│                  │                                          │
│   AI PROFESSOR   │         SMART WHITEBOARD                 │
│   (avatar +      │  ┌─────────────────────────────────────┐ │
│    streaming      │  │  Auto-rendered math, diagrams,      │ │
│    text)          │  │  key terms, step-by-step            │ │
│                  │  │  breakdowns                          │ │
│                  │  └─────────────────────────────────────┘ │
├──────────────────┴──────────────────────────────────────────┤
│  [🎤 Voice]  Type your question...          [Send] [Exam Mode]│
├─────────────────────────────────────────────────────────────┤
│  Progress  │  Topics  │  Tests  │  Plan  │  Leaderboard     │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout
- Bottom nav: Home / Chat / Tests / Progress / Profile
- Full-screen chat view
- Swipe right for whiteboard
- Swipe left for topic navigator
- Floating voice button

### Key UX Moments
1. **First login**: Beautiful onboarding — 4 screens, pick board/class/subjects/exam date
2. **First session**: AI says "Assalam o Alaikum! I'm your Tutify professor. What should we learn today?"
3. **First test**: Celebratory confetti animation on score
4. **Streak milestone**: Full-screen 🔥 animation
5. **Weak area detected**: Subtle red dot on topic in navigator, proactive suggestion
6. **Score prediction**: Progress bar toward target with motivational message

---

## Build Timeline

### Month 1 — Foundation (The Sellable Demo)
**Week 1:**
- [ ] Project setup: Next.js + Supabase + Vercel
- [ ] Auth: email + Google OAuth
- [ ] Onboarding flow (board/class/subject/exam date)
- [ ] Basic database schema

**Week 2:**
- [ ] AI chat with Gemini (streaming)
- [ ] Curriculum-aware system prompts for Physics, Chemistry, Math
- [ ] Smart whiteboard (KaTeX + Mermaid auto-detection)
- [ ] Topic navigator (FSc Part 1 & 2 content structure)

**Week 3:**
- [ ] Session save + history
- [ ] Basic progress tracking (topics studied)
- [ ] Whiteboard clickable interactions
- [ ] Bilingual toggle (Urdu mode)

**Week 4:**
- [ ] UI polish — full dark mode design system
- [ ] Mobile responsive
- [ ] Admin panel: user list + session monitor
- [ ] Deploy + test with 5 real students

**End of Month 1 Goal:** Working product you can demo and get first 20 users

---

### Month 2 — Exam Engine (The Revenue Engine)
- [ ] Exam mode: MCQ + short answer generation
- [ ] BISE-style question formatting
- [ ] Score + detailed breakdown UI
- [ ] Weak area detection algorithm
- [ ] Past paper questions database (upload 200+ questions manually)
- [ ] "Rescue Plan" feature
- [ ] Admin panel: content management, question upload
- [ ] Basic gamification: XP + daily streak

**End of Month 2 Goal:** First paying users — launch Basic plan at Rs. 500/month

---

### Month 3 — Retention (The Habit Loop)
- [ ] Full gamification (XP, levels, badges)
- [ ] Study planner with AI-generated schedule
- [ ] Voice input/output
- [ ] Session summary auto-generation
- [ ] Study journal / notes
- [ ] Weekly email digest (Resend)
- [ ] Parent dashboard (view-only, email reports)
- [ ] Admin panel: analytics, retention charts, feature flags

**End of Month 3 Goal:** 20%+ Day-30 retention, 50+ paying users

---

### Month 4 — Growth (The Viral Loop)
- [ ] Study groups + invite codes
- [ ] "Challenge a friend" exam duels
- [ ] WhatsApp share cards (badge achievements, score improvements)
- [ ] Score predictor with PDF report
- [ ] Leaderboard (school/class-based)
- [ ] Pro plan launch: Rs. 1,500/month

**End of Month 4 Goal:** 200+ users, 80+ paying, first Rs. 50,000 MRR

---

### Month 5 — Scale
- [ ] O/A Level content addition
- [ ] More subjects: Biology, English, Urdu, Pak Studies
- [ ] School/academy B2B plan (bulk licenses)
- [ ] Mobile PWA optimization
- [ ] Performance optimization for 1000+ concurrent users
- [ ] Migrate to paid Supabase if needed

---

## Monetization

### Pricing (PKR — realistic for Pakistani students)

| Plan | Price | Features |
|---|---|---|
| **Free** | Rs. 0 | 5 sessions/day, 2 subjects, no exam mode |
| **Basic** | Rs. 499/month | Unlimited sessions, all subjects, exam mode |
| **Pro** | Rs. 1,499/month | Everything + voice, study planner, parent dashboard, score predictor |
| **School** | Rs. 15,000/month | 50 student licenses, teacher dashboard, bulk reporting |

### Why This Pricing Works
- Academy tutor: Rs. 3,000–8,000/month PER subject
- Tutify Basic: Rs. 499 for ALL subjects + 24/7 availability
- Parents see this as 10x cheaper than academy
- Pro plan adds the features parents actually want (tracking, reporting)

### Revenue Milestones
- 100 Basic users = Rs. 49,900/month
- 50 Pro users = Rs. 74,950/month
- 1 School = Rs. 15,000/month
- **Target month 4:** Rs. 50,000–75,000 MRR (realistic)

---

## What Makes This Actually Sellable

### The 5 Objections & Answers

**"ChatGPT is free"**
→ ChatGPT doesn't know BISE Punjab 2024 exam patterns. Tutify does.

**"It's just another chatbot"**
→ It has your exam date, knows your weak areas, tracks your scores, and sends your parents weekly reports. A chatbot doesn't care if you fail.

**"My child won't use it"**
→ Streaks, XP, leaderboards, friend challenges — the same reason they play games every day. But for studying.

**"Academy works for us"**
→ Academy: Rs. 5,000/month, fixed schedule, passive listening, embarrassing to ask questions. Tutify: Rs. 499, 2am availability, active testing, zero judgment.

**"Internet is required"**
→ Fair. We'll add offline mode for downloaded topics in Month 5.

---

## The Admin Panel — Your Control Center

URL: `yourdomain.com/admin` (requires 2FA login)

### What You See Every Day
1. **Real-time session counter** — who's online right now
2. **Daily new signups** — growth chart
3. **AI token usage** — so you never get surprised by a bill
4. **Top topics today** — what students are studying
5. **Failed payments** — so you can follow up

### What You Control
- **Feature flags**: turn any feature on/off instantly
- **Free tier limits**: change how many sessions free users get
- **System prompts**: tune how the AI professor behaves per subject
- **Content**: add past paper questions, mark topics, adjust difficulty
- **Users**: view any student's full session history, upgrade/downgrade plans
- **Announcements**: push a banner message to all users

---

## Risk Mitigation

| Risk | Mitigation |
|---|---|
| Gemini free tier runs out | Rate limiting per user (5 sessions/day free), upgrade prompt |
| Supabase 500MB limit | Efficient schema, archive old sessions, upgrade at 400MB |
| Students share one account | Device fingerprinting + concurrent session limit |
| Content quality | Human-reviewed system prompts, admin can edit/override any response |
| Slow Gemini response | Streaming so student sees output immediately, skeleton loaders |
| Students don't return | Streak system + weekly email + parent accountability |

---

## Launch Strategy (Zero Budget)

### Week 1 After Launch
1. Post in Facebook groups: "FSc students Pakistan", "Matric Wale", "Punjab University Aspirants"
2. DM 20 students on Twitter/X who tweet about FSc struggles
3. WhatsApp forward: "Free AI professor for your board exams" with demo video
4. Post demo video on TikTok (Pakistani students are heavy TikTok users)

### Week 2–4
- Offer 30-day free Pro trial to first 50 users in exchange for honest feedback
- Ask each user: "Who else is studying for boards?" → referral invite codes
- Submit to Pakistani tech communities (Startup Pakistan, PakLaunch)

### Month 2+
- Partner with academy teachers: "Use this alongside your academy"
- School demo days — one school = 500 potential users
- Facebook/Instagram ads (Rs. 2,000 test budget = ~5,000 impressions)

---

## Success Metrics

| Metric | Target (Month 1) | Target (Month 3) |
|---|---|---|
| Signups | 50 | 500 |
| DAU/MAU ratio | 20% | 35% |
| Avg session length | 8 min | 15 min |
| Exam mode completion | — | 40% of users |
| Day-7 retention | 25% | 40% |
| Paying users | 5 | 80 |
| MRR | Rs. 2,500 | Rs. 50,000 |

---

## The North Star

A student opens Tutify at 11pm before their Physics board exam.
The AI professor knows they've been struggling with Optics for 3 weeks.
It runs them through 10 targeted MCQs, explains every wrong answer step-by-step on the whiteboard, and tells them:
**"You're now ready for Optics. Get some sleep — you're going to do great tomorrow."**

That's what we're building.

---

*Last updated: April 2026*
*Built by Abdullah Khan*
