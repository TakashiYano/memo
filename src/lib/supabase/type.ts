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
