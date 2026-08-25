export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          allowed_tabs: string[] | null
          created_at: string | null
          id: string
          name: string | null
          role: string | null
        }
        Insert: {
          allowed_tabs?: string[] | null
          created_at?: string | null
          id: string
          name?: string | null
          role?: string | null
        }
        Update: {
          allowed_tabs?: string[] | null
          created_at?: string | null
          id?: string
          name?: string | null
          role?: string | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          amount_eur: number | null
          created_at: string | null
          id: string
          lead_id: string | null
          mp_external_reference: string | null
          mp_payment_id: string | null
          payer_email: string | null
          payer_name: string | null
          payer_phone: string | null
          payment_method: string | null
          payment_status: string | null
          status: string | null
        }
        Insert: {
          amount_eur?: number | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          mp_external_reference?: string | null
          mp_payment_id?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payer_phone?: string | null
          payment_method?: string | null
          payment_status?: string | null
          status?: string | null
        }
        Update: {
          amount_eur?: number | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          mp_external_reference?: string | null
          mp_payment_id?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payer_phone?: string | null
          payment_method?: string | null
          payment_status?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_logs: {
        Row: {
          created_at: string | null
          history: Json | null
          id: string
          lead_captured: boolean | null
          session_id: string
        }
        Insert: {
          created_at?: string | null
          history?: Json | null
          id?: string
          lead_captured?: boolean | null
          session_id: string
        }
        Update: {
          created_at?: string | null
          history?: Json | null
          id?: string
          lead_captured?: boolean | null
          session_id?: string
        }
        Relationships: []
      }
      companies: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      company_users: {
        Row: {
          company_id: string | null
          created_at: string | null
          expatriate_id: string | null
          id: string
          role: string
          user_id: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          expatriate_id?: string | null
          id?: string
          role: string
          user_id: string
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          expatriate_id?: string | null
          id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_users_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_images: {
        Row: {
          created_at: string | null
          gallery: string
          id: string
          position: number | null
          row_index: number | null
          url: string
        }
        Insert: {
          created_at?: string | null
          gallery: string
          id?: string
          position?: number | null
          row_index?: number | null
          url: string
        }
        Update: {
          created_at?: string | null
          gallery?: string
          id?: string
          position?: number | null
          row_index?: number | null
          url?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          city: string | null
          composition: string | null
          contact_method: string | null
          contact_period: string | null
          country: string | null
          created_at: string | null
          ddi: string | null
          decision_phase: string | null
          description: string | null
          email: string | null
          id: string
          interest: string | null
          message: string | null
          name: string
          notes: string | null
          objective: string | null
          page_history: Json | null
          phone: string | null
          session_id: string | null
          source: string | null
          status: string | null
          temperature: string | null
          timing: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
          whatsapp: string | null
        }
        Insert: {
          city?: string | null
          composition?: string | null
          contact_method?: string | null
          contact_period?: string | null
          country?: string | null
          created_at?: string | null
          ddi?: string | null
          decision_phase?: string | null
          description?: string | null
          email?: string | null
          id?: string
          interest?: string | null
          message?: string | null
          name: string
          notes?: string | null
          objective?: string | null
          page_history?: Json | null
          phone?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          temperature?: string | null
          timing?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          whatsapp?: string | null
        }
        Update: {
          city?: string | null
          composition?: string | null
          contact_method?: string | null
          contact_period?: string | null
          country?: string | null
          created_at?: string | null
          ddi?: string | null
          decision_phase?: string | null
          description?: string | null
          email?: string | null
          id?: string
          interest?: string | null
          message?: string | null
          name?: string
          notes?: string | null
          objective?: string | null
          page_history?: Json | null
          phone?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          temperature?: string | null
          timing?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      legal_pages: {
        Row: {
          content: string | null
          id: string
          slug: string
          title: string
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          slug: string
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          slug?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      maia_knowledge: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          is_active: boolean | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      mandatos: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          lead_id: string | null
          status: string | null
          value_eur: number | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          status?: string | null
          value_eur?: number | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          status?: string | null
          value_eur?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mandatos_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mandatos_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author_id: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean | null
          published_at: string | null
          read_time: number | null
          slug: string
          title: string
          translations: Json | null
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug: string
          title: string
          translations?: Json | null
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          slug?: string
          title?: string
          translations?: Json | null
        }
        Relationships: []
      }
      script_injections: {
        Row: {
          active: boolean | null
          code: string
          created_at: string | null
          environment: string | null
          id: string
          name: string
          placement: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          code: string
          created_at?: string | null
          environment?: string | null
          id?: string
          name: string
          placement?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          code?: string
          created_at?: string | null
          environment?: string | null
          id?: string
          name?: string
          placement?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      site_content: {
        Row: {
          created_at: string | null
          id: string
          key: string
          label: string | null
          section: string | null
          type: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          label?: string | null
          section?: string | null
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          label?: string | null
          section?: string | null
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          id: string
          key: string
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          value?: string | null
        }
        Relationships: []
      }
      sound_tracks: {
        Row: {
          cover_url: string | null
          created_at: string | null
          id: string
          is_enabled: boolean | null
          position: number | null
          source_type: string
          source_url: string
          title: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          position?: number | null
          source_type: string
          source_url: string
          title: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string | null
          id?: string
          is_enabled?: boolean | null
          position?: number | null
          source_type?: string
          source_url?: string
          title?: string
        }
        Relationships: []
      }
      ux_events: {
        Row: {
          created_at: string | null
          device: string | null
          event_type: string
          id: string
          meta: Json | null
          page_path: string | null
          referrer: string | null
          scroll_depth: number | null
          session_id: string
          user_agent: string | null
          viewport_h: number | null
          viewport_w: number | null
          x_pct: number | null
          y_pct: number | null
        }
        Insert: {
          created_at?: string | null
          device?: string | null
          event_type: string
          id?: string
          meta?: Json | null
          page_path?: string | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id: string
          user_agent?: string | null
          viewport_h?: number | null
          viewport_w?: number | null
          x_pct?: number | null
          y_pct?: number | null
        }
        Update: {
          created_at?: string | null
          device?: string | null
          event_type?: string
          id?: string
          meta?: Json | null
          page_path?: string | null
          referrer?: string | null
          scroll_depth?: number | null
          session_id?: string
          user_agent?: string | null
          viewport_h?: number | null
          viewport_w?: number | null
          x_pct?: number | null
          y_pct?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      save_chat_log: {
        Args: {
          p_history?: Json
          p_lead_captured?: boolean
          p_session_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
