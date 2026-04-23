export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          board: string | null;
          class_level: string | null;
          subjects: string[] | null;
          exam_date: string | null;
          target_score: number;
          language_pref: string;
          professor_personality: string;
          plan: string;
          xp: number;
          level: number;
          streak_count: number;
          last_active_date: string | null;
          onboarding_complete: boolean;
          is_admin: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      subjects: {
        Row: {
          id: string;
          slug: string;
          name: string;
          icon: string | null;
          color: string | null;
          board: string | null;
          class_level: string | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["subjects"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["subjects"]["Insert"]>;
      };
      chapters: {
        Row: {
          id: string;
          subject_id: string;
          title: string;
          order_index: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["chapters"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["chapters"]["Insert"]>;
      };
      topics: {
        Row: {
          id: string;
          chapter_id: string;
          title: string;
          description: string | null;
          difficulty: string;
          estimated_minutes: number;
          key_concepts: string[] | null;
          order_index: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["topics"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["topics"]["Insert"]>;
      };
      sessions: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string | null;
          topic_name: string | null;
          subject_slug: string | null;
          started_at: string;
          ended_at: string | null;
          duration_seconds: number | null;
          message_count: number;
          summary: string | null;
          key_points: string[] | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["sessions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["sessions"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          session_id: string;
          user_id: string;
          role: string;
          content: string;
          whiteboard_data: Json | null;
          tokens_used: number | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["messages"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string;
          subject_slug: string | null;
          mastery_score: number;
          sessions_count: number;
          last_studied_at: string | null;
          status: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_progress"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["user_progress"]["Insert"]>;
      };
      tests: {
        Row: {
          id: string;
          user_id: string;
          topic_id: string | null;
          topic_name: string | null;
          subject_slug: string | null;
          score: number | null;
          total_questions: number | null;
          correct_answers: number | null;
          time_taken_seconds: number | null;
          mode: string;
          completed_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["tests"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["tests"]["Insert"]>;
      };
      test_questions: {
        Row: {
          id: string;
          test_id: string;
          question_text: string;
          options: Json | null;
          correct_answer: string | null;
          user_answer: string | null;
          is_correct: boolean | null;
          explanation: string | null;
          time_taken_seconds: number | null;
          order_index: number | null;
        };
        Insert: Omit<Database["public"]["Tables"]["test_questions"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["test_questions"]["Insert"]>;
      };
      past_paper_questions: {
        Row: {
          id: string;
          topic_id: string | null;
          subject_slug: string | null;
          year: number | null;
          board: string | null;
          question_text: string;
          question_type: string | null;
          options: Json | null;
          correct_answer: string | null;
          answer_explanation: string | null;
          marks: number;
          frequency_count: number;
          is_verified: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["past_paper_questions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["past_paper_questions"]["Insert"]>;
      };
      badges: {
        Row: {
          id: string;
          slug: string | null;
          name: string;
          description: string | null;
          icon: string | null;
          xp_reward: number;
          condition_type: string | null;
          condition_value: number | null;
          is_active: boolean;
        };
        Insert: Omit<Database["public"]["Tables"]["badges"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["badges"]["Insert"]>;
      };
      user_badges: {
        Row: {
          id: string;
          user_id: string;
          badge_id: string;
          earned_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["user_badges"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["user_badges"]["Insert"]>;
      };
      study_plans: {
        Row: {
          id: string;
          user_id: string;
          exam_date: string | null;
          daily_hours: number;
          plan_data: Json | null;
          generated_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["study_plans"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["study_plans"]["Insert"]>;
      };
      feature_flags: {
        Row: {
          id: string;
          key: string;
          name: string | null;
          description: string | null;
          is_enabled: boolean;
          config: Json | null;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["feature_flags"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["feature_flags"]["Insert"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Subject = Database["public"]["Tables"]["subjects"]["Row"];
export type Chapter = Database["public"]["Tables"]["chapters"]["Row"];
export type Topic = Database["public"]["Tables"]["topics"]["Row"];
export type Session = Database["public"]["Tables"]["sessions"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];
export type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
export type Test = Database["public"]["Tables"]["tests"]["Row"];
export type Badge = Database["public"]["Tables"]["badges"]["Row"];
export type FeatureFlag = Database["public"]["Tables"]["feature_flags"]["Row"];
