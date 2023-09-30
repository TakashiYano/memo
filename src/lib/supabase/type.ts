export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    CompositeTypes: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Tables: {
      memo_notes: {
        Insert: {
          content?: string | null;
          created_at?: string;
          id?: string;
          updated_at?: string | null;
          user_id: string;
        };
        Relationships: [
          {
            columns: ["user_id"];
            foreignKeyName: "memo_notes_user_id_fkey";
            referencedColumns: ["id"];
            referencedRelation: "users";
          }
        ];
        Row: {
          content: string | null;
          created_at: string;
          id: string;
          updated_at: string | null;
          user_id: string;
        };
        Update: {
          content?: string | null;
          created_at?: string;
          id?: string;
          updated_at?: string | null;
          user_id?: string;
        };
      };
      profiles: {
        Insert: {
          avatar_url?: string | null;
          id: string;
          user_name: string;
        };
        Relationships: [
          {
            columns: ["id"];
            foreignKeyName: "profiles_id_fkey";
            referencedColumns: ["id"];
            referencedRelation: "users";
          }
        ];
        Row: {
          avatar_url: string | null;
          id: string;
          user_name: string;
        };
        Update: {
          avatar_url?: string | null;
          id?: string;
          user_name?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
  };
}
