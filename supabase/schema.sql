-- =============================================
-- TUTIFY DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES (extends Supabase auth.users)
-- =============================================
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  name text,
  avatar_url text,
  board text,          -- 'punjab' | 'sindh' | 'kpk' | 'federal' | 'o_level' | 'a_level'
  class_level text,    -- 'matric_9' | 'matric_10' | 'fsc_1' | 'fsc_2' | 'o_level' | 'a_level'
  subjects text[],     -- ['physics', 'chemistry', 'math', 'biology', ...]
  exam_date date,
  target_score integer default 80,
  language_pref text default 'english',  -- 'english' | 'urdu'
  professor_personality text default 'friendly', -- 'friendly' | 'strict' | 'exam_coach'
  plan text default 'free',              -- 'free' | 'basic' | 'pro'
  xp integer default 0,
  level integer default 1,
  streak_count integer default 0,
  last_active_date date,
  onboarding_complete boolean default false,
  is_admin boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================
-- SUBJECTS, CHAPTERS, TOPICS (content tree)
-- =============================================
create table public.subjects (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,             -- 'physics', 'chemistry', 'math'
  name text not null,
  icon text,
  color text,
  board text,
  class_level text,
  order_index integer default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.chapters (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid references public.subjects(id) on delete cascade,
  title text not null,
  order_index integer not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table public.topics (
  id uuid primary key default uuid_generate_v4(),
  chapter_id uuid references public.chapters(id) on delete cascade,
  title text not null,
  description text,
  difficulty text default 'medium',  -- 'easy' | 'medium' | 'hard'
  estimated_minutes integer default 20,
  key_concepts text[],
  order_index integer not null,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- =============================================
-- SESSIONS (study sessions)
-- =============================================
create table public.sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  topic_id uuid references public.topics(id),
  topic_name text,
  subject_slug text,
  started_at timestamptz default now(),
  ended_at timestamptz,
  duration_seconds integer,
  message_count integer default 0,
  summary text,
  key_points text[],
  created_at timestamptz default now()
);

-- =============================================
-- MESSAGES (chat history)
-- =============================================
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid references public.sessions(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  role text not null,  -- 'user' | 'assistant'
  content text not null,
  whiteboard_data jsonb,   -- extracted math + diagrams
  tokens_used integer,
  created_at timestamptz default now()
);

-- =============================================
-- USER PROGRESS (per topic)
-- =============================================
create table public.user_progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete cascade,
  subject_slug text,
  mastery_score integer default 0,  -- 0-100
  sessions_count integer default 0,
  last_studied_at timestamptz,
  status text default 'not_started',  -- 'not_started' | 'in_progress' | 'mastered'
  unique(user_id, topic_id)
);

-- =============================================
-- TESTS (exam sessions)
-- =============================================
create table public.tests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  topic_id uuid references public.topics(id),
  topic_name text,
  subject_slug text,
  score integer,               -- percentage 0-100
  total_questions integer,
  correct_answers integer,
  time_taken_seconds integer,
  mode text default 'practice', -- 'practice' | 'timed' | 'past_paper'
  completed_at timestamptz default now()
);

create table public.test_questions (
  id uuid primary key default uuid_generate_v4(),
  test_id uuid references public.tests(id) on delete cascade,
  question_text text not null,
  options jsonb,               -- [{id: 'a', text: '...'}, ...]
  correct_answer text,
  user_answer text,
  is_correct boolean,
  explanation text,
  time_taken_seconds integer,
  order_index integer
);

-- =============================================
-- PAST PAPER QUESTIONS
-- =============================================
create table public.past_paper_questions (
  id uuid primary key default uuid_generate_v4(),
  topic_id uuid references public.topics(id),
  subject_slug text,
  year integer,
  board text,
  question_text text not null,
  question_type text,  -- 'mcq' | 'short' | 'long' | 'numerical'
  options jsonb,
  correct_answer text,
  answer_explanation text,
  marks integer default 1,
  frequency_count integer default 1,
  is_verified boolean default false,
  created_at timestamptz default now()
);

-- =============================================
-- BADGES & ACHIEVEMENTS
-- =============================================
create table public.badges (
  id uuid primary key default uuid_generate_v4(),
  slug text unique,
  name text not null,
  description text,
  icon text,
  xp_reward integer default 50,
  condition_type text,   -- 'streak' | 'xp' | 'test_score' | 'sessions' | 'subject_mastery'
  condition_value integer,
  is_active boolean default true
);

create table public.user_badges (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  badge_id uuid references public.badges(id),
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

-- =============================================
-- STUDY PLANS
-- =============================================
create table public.study_plans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade unique,
  exam_date date,
  daily_hours integer default 2,
  plan_data jsonb,    -- {date: '2026-04-01', topics: [{topic_id, title, duration_min}]}[]
  generated_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================
-- FEATURE FLAGS (admin controlled)
-- =============================================
create table public.feature_flags (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  name text,
  description text,
  is_enabled boolean default true,
  config jsonb,
  updated_at timestamptz default now(),
  updated_by uuid references public.profiles(id)
);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================
alter table public.profiles enable row level security;
alter table public.sessions enable row level security;
alter table public.messages enable row level security;
alter table public.user_progress enable row level security;
alter table public.tests enable row level security;
alter table public.test_questions enable row level security;
alter table public.user_badges enable row level security;
alter table public.study_plans enable row level security;

-- Users can only read/write their own data
create policy "Users own their profile" on public.profiles
  for all using (auth.uid() = id);

create policy "Users own their sessions" on public.sessions
  for all using (auth.uid() = user_id);

create policy "Users own their messages" on public.messages
  for all using (auth.uid() = user_id);

create policy "Users own their progress" on public.user_progress
  for all using (auth.uid() = user_id);

create policy "Users own their tests" on public.tests
  for all using (auth.uid() = user_id);

create policy "Users own test questions" on public.test_questions
  for all using (
    auth.uid() = (select user_id from public.tests where id = test_id)
  );

create policy "Users own their badges" on public.user_badges
  for all using (auth.uid() = user_id);

create policy "Users own their study plan" on public.study_plans
  for all using (auth.uid() = user_id);

-- Public read for curriculum content
create policy "Anyone can read subjects" on public.subjects
  for select using (true);

create policy "Anyone can read chapters" on public.chapters
  for select using (true);

create policy "Anyone can read topics" on public.topics
  for select using (true);

create policy "Anyone can read past papers" on public.past_paper_questions
  for select using (true);

create policy "Anyone can read badges" on public.badges
  for select using (true);

create policy "Anyone can read feature flags" on public.feature_flags
  for select using (true);

-- Admin full access (check is_admin on profile)
create policy "Admins have full access to all profiles" on public.profiles
  for all using (
    auth.uid() = id or
    exists(select 1 from public.profiles where id = auth.uid() and is_admin = true)
  );

-- =============================================
-- AUTO-CREATE PROFILE ON SIGNUP (trigger)
-- =============================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- =============================================
-- UPDATED_AT TRIGGER
-- =============================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- =============================================
-- SEED: DEFAULT FEATURE FLAGS
-- =============================================
insert into public.feature_flags (key, name, description, is_enabled) values
  ('voice_input', 'Voice Input', 'Allow students to speak their questions', true),
  ('voice_output', 'Voice Output', 'AI professor speaks responses', true),
  ('exam_mode', 'Exam Mode', 'MCQ test generation after lessons', true),
  ('study_planner', 'Study Planner', 'AI-generated study schedules', true),
  ('past_papers', 'Past Papers', 'BISE past paper question bank', true),
  ('leaderboard', 'Leaderboard', 'Class/school leaderboards', false),
  ('urdu_mode', 'Urdu Mode', 'Bilingual Urdu/English explanations', true),
  ('free_daily_limit', 'Free Tier Daily Limit', 'Sessions per day for free users', true);

-- =============================================
-- SEED: DEFAULT BADGES
-- =============================================
insert into public.badges (slug, name, description, icon, xp_reward, condition_type, condition_value) values
  ('first_session', 'First Step', 'Completed your first study session', '🎓', 50, 'sessions', 1),
  ('streak_3', 'On Fire', '3-day study streak', '🔥', 100, 'streak', 3),
  ('streak_7', 'Week Warrior', '7-day study streak', '⚡', 250, 'streak', 7),
  ('streak_30', 'Unstoppable', '30-day study streak', '🏆', 1000, 'streak', 30),
  ('first_test', 'Test Taker', 'Completed your first exam', '📝', 75, 'test_score', 1),
  ('perfect_score', 'Perfect!', 'Got 100% on a test', '💯', 500, 'test_score', 100),
  ('xp_500', 'Scholar', 'Earned 500 XP', '⭐', 100, 'xp', 500),
  ('xp_2000', 'Expert', 'Earned 2000 XP', '💫', 300, 'xp', 2000),
  ('xp_5000', 'Master', 'Earned 5000 XP', '👑', 500, 'xp', 5000);
