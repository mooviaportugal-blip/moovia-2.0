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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      ab_tests: {
        Row: {
          active: boolean | null
          created_at: string | null
          id: string
          key: string
          traffic_split: number | null
          updated_at: string | null
          variant_a: string | null
          variant_b: string | null
          winner: string | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          key: string
          traffic_split?: number | null
          updated_at?: string | null
          variant_a?: string | null
          variant_b?: string | null
          winner?: string | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          id?: string
          key?: string
          traffic_split?: number | null
          updated_at?: string | null
          variant_a?: string | null
          variant_b?: string | null
          winner?: string | null
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          allowed_tabs: string[]
          created_at: string | null
          id: string
          name: string | null
          role: string
          updated_at: string | null
        }
        Insert: {
          allowed_tabs?: string[]
          created_at?: string | null
          id: string
          name?: string | null
          role?: string
          updated_at?: string | null
        }
        Update: {
          allowed_tabs?: string[]
          created_at?: string | null
          id?: string
          name?: string | null
          role?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      assessments: {
        Row: {
          amount_eur: number | null
          completed_at: string | null
          converted_to_mandato: boolean | null
          created_at: string | null
          id: string
          lead_id: string | null
          mp_external_reference: string | null
          mp_payment_id: string | null
          notes: string | null
          payer_email: string | null
          payer_name: string | null
          payer_phone: string | null
          payment_method: string | null
          payment_status: string | null
          report_url: string | null
          scheduled_at: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount_eur?: number | null
          completed_at?: string | null
          converted_to_mandato?: boolean | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          mp_external_reference?: string | null
          mp_payment_id?: string | null
          notes?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payer_phone?: string | null
          payment_method?: string | null
          payment_status?: string | null
          report_url?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_eur?: number | null
          completed_at?: string | null
          converted_to_mandato?: boolean | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          mp_external_reference?: string | null
          mp_payment_id?: string | null
          notes?: string | null
          payer_email?: string | null
          payer_name?: string | null
          payer_phone?: string | null
          payment_method?: string | null
          payment_status?: string | null
          report_url?: string | null
          scheduled_at?: string | null
          status?: string | null
          updated_at?: string | null
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
          duration_secs: number | null
          id: string
          lead_captured: boolean | null
          lead_id: string | null
          messages: Json | null
          page_url: string | null
          session_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          duration_secs?: number | null
          id?: string
          lead_captured?: boolean | null
          lead_id?: string | null
          messages?: Json | null
          page_url?: string | null
          session_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          duration_secs?: number | null
          id?: string
          lead_captured?: boolean | null
          lead_id?: string | null
          messages?: Json | null
          page_url?: string | null
          session_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_logs_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          },
        ]
      }
      funnel_events: {
        Row: {
          city: string | null
          country: string | null
          created_at: string | null
          device: string | null
          event: string
          id: string
          page: string | null
          referrer: string | null
          session_id: string | null
          utm_campaign: string | null
          utm_medium: string | null
          utm_source: string | null
        }
        Insert: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          device?: string | null
          event: string
          id?: string
          page?: string | null
          referrer?: string | null
          session_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Update: {
          city?: string | null
          country?: string | null
          created_at?: string | null
          device?: string | null
          event?: string
          id?: string
          page?: string | null
          referrer?: string | null
          session_id?: string | null
          utm_campaign?: string | null
          utm_medium?: string | null
          utm_source?: string | null
        }
        Relationships: []
      }
      gallery_images: {
        Row: {
          alt: string | null
          created_at: string
          gallery: string
          id: string
          position: number
          row_index: number
          updated_at: string
          url: string
        }
        Insert: {
          alt?: string | null
          created_at?: string
          gallery?: string
          id?: string
          position?: number
          row_index?: number
          updated_at?: string
          url: string
        }
        Update: {
          alt?: string | null
          created_at?: string
          gallery?: string
          id?: string
          position?: number
          row_index?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          cargo_responsavel: string | null
          city: string | null
          colaboradores_12m: string | null
          composition: string | null
          contact_method: string | null
          contact_period: string | null
          country: string | null
          created_at: string | null
          ddi: string | null
          decision_phase: string | null
          desafio_principal: string | null
          device: string | null
          email: string | null
          id: string
          interest: string | null
          ip_hash: string | null
          last_activity: string | null
          message: string | null
          name: string | null
          nome_empresa: string | null
          notes: string | null
          objective: string | null
          page_history: Json | null
          paises_origem_destino: string | null
          programa_existente: string | null
          referrer: string | null
          session_id: string | null
          source: string | null
          status: string | null
          temperature: string | null
          timing: string | null
          tipo: string | null
          updated_at: string | null
          utm_campaign: string | null
          utm_content: string | null
          utm_medium: string | null
          utm_source: string | null
          whatsapp: string | null
        }
        Insert: {
          cargo_responsavel?: string | null
          city?: string | null
          colaboradores_12m?: string | null
          composition?: string | null
          contact_method?: string | null
          contact_period?: string | null
          country?: string | null
          created_at?: string | null
          ddi?: string | null
          decision_phase?: string | null
          desafio_principal?: string | null
          device?: string | null
          email?: string | null
          id?: string
          interest?: string | null
          ip_hash?: string | null
          last_activity?: string | null
          message?: string | null
          name?: string | null
          nome_empresa?: string | null
          notes?: string | null
          objective?: string | null
          page_history?: Json | null
          paises_origem_destino?: string | null
          programa_existente?: string | null
          referrer?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          temperature?: string | null
          timing?: string | null
          tipo?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          whatsapp?: string | null
        }
        Update: {
          cargo_responsavel?: string | null
          city?: string | null
          colaboradores_12m?: string | null
          composition?: string | null
          contact_method?: string | null
          contact_period?: string | null
          country?: string | null
          created_at?: string | null
          ddi?: string | null
          decision_phase?: string | null
          desafio_principal?: string | null
          device?: string | null
          email?: string | null
          id?: string
          interest?: string | null
          ip_hash?: string | null
          last_activity?: string | null
          message?: string | null
          name?: string | null
          nome_empresa?: string | null
          notes?: string | null
          objective?: string | null
          page_history?: Json | null
          paises_origem_destino?: string | null
          programa_existente?: string | null
          referrer?: string | null
          session_id?: string | null
          source?: string | null
          status?: string | null
          temperature?: string | null
          timing?: string | null
          tipo?: string | null
          updated_at?: string | null
          utm_campaign?: string | null
          utm_content?: string | null
          utm_medium?: string | null
          utm_source?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      legal_pages: {
        Row: {
          content: string
          created_at: string
          id: string
          slug: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          slug: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          slug?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      maia_chunks: {
        Row: {
          chunk_index: number
          content: string
          created_at: string
          document_id: string
          embedding: string | null
          id: string
          metadata: Json
          tokens: number | null
        }
        Insert: {
          chunk_index: number
          content: string
          created_at?: string
          document_id: string
          embedding?: string | null
          id?: string
          metadata?: Json
          tokens?: number | null
        }
        Update: {
          chunk_index?: number
          content?: string
          created_at?: string
          document_id?: string
          embedding?: string | null
          id?: string
          metadata?: Json
          tokens?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "maia_chunks_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "maia_documents"
            referencedColumns: ["id"]
          },
        ]
      }
      maia_documents: {
        Row: {
          chunk_count: number
          created_at: string
          error: string | null
          file_size: number | null
          file_type: string
          filename: string
          id: string
          status: string
          storage_path: string
          tags: string[]
          title: string
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          chunk_count?: number
          created_at?: string
          error?: string | null
          file_size?: number | null
          file_type: string
          filename: string
          id?: string
          status?: string
          storage_path: string
          tags?: string[]
          title: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          chunk_count?: number
          created_at?: string
          error?: string | null
          file_size?: number | null
          file_type?: string
          filename?: string
          id?: string
          status?: string
          storage_path?: string
          tags?: string[]
          title?: string
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      maia_knowledge: {
        Row: {
          created_at: string
          examples: Json
          faqs: Json
          id: string
          is_active: boolean
          label: string
          persona: string | null
          rules: Json
          system_prompt: string
          updated_at: string
          vocabulary: Json
        }
        Insert: {
          created_at?: string
          examples?: Json
          faqs?: Json
          id?: string
          is_active?: boolean
          label?: string
          persona?: string | null
          rules?: Json
          system_prompt?: string
          updated_at?: string
          vocabulary?: Json
        }
        Update: {
          created_at?: string
          examples?: Json
          faqs?: Json
          id?: string
          is_active?: boolean
          label?: string
          persona?: string | null
          rules?: Json
          system_prompt?: string
          updated_at?: string
          vocabulary?: Json
        }
        Relationships: []
      }
      mandatos: {
        Row: {
          assessment_id: string | null
          commission_eur: number | null
          completed_at: string | null
          created_at: string | null
          id: string
          lead_id: string | null
          notes: string | null
          pilares: Json | null
          started_at: string | null
          status: string | null
          updated_at: string | null
          value_eur: number | null
        }
        Insert: {
          assessment_id?: string | null
          commission_eur?: number | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          pilares?: Json | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          value_eur?: number | null
        }
        Update: {
          assessment_id?: string | null
          commission_eur?: number | null
          completed_at?: string | null
          created_at?: string | null
          id?: string
          lead_id?: string | null
          notes?: string | null
          pilares?: Json | null
          started_at?: string | null
          status?: string | null
          updated_at?: string | null
          value_eur?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "mandatos_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
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
          auto_translated_at: string | null
          banner_image: string | null
          category: string | null
          content: string | null
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          focus_keyword: string | null
          id: string
          meta_description: string | null
          meta_title: string | null
          og_image: string | null
          published: boolean | null
          published_at: string | null
          read_time: number | null
          schema_json: Json | null
          slug: string
          tags: string[] | null
          title: string
          translations: Json
          updated_at: string | null
        }
        Insert: {
          auto_translated_at?: string | null
          banner_image?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          schema_json?: Json | null
          slug: string
          tags?: string[] | null
          title: string
          translations?: Json
          updated_at?: string | null
        }
        Update: {
          auto_translated_at?: string | null
          banner_image?: string | null
          category?: string | null
          content?: string | null
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          focus_keyword?: string | null
          id?: string
          meta_description?: string | null
          meta_title?: string | null
          og_image?: string | null
          published?: boolean | null
          published_at?: string | null
          read_time?: number | null
          schema_json?: Json | null
          slug?: string
          tags?: string[] | null
          title?: string
          translations?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      script_injections: {
        Row: {
          active: boolean | null
          code: string | null
          created_at: string | null
          environment: string | null
          id: string
          name: string
          placement: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          code?: string | null
          created_at?: string | null
          environment?: string | null
          id?: string
          name: string
          placement?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          code?: string | null
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
          key: string
          label: string | null
          section: string | null
          type: string | null
          updated_at: string | null
          updated_by: string | null
          value: string | null
        }
        Insert: {
          key: string
          label?: string | null
          section?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          label?: string | null
          section?: string | null
          type?: string | null
          updated_at?: string | null
          updated_by?: string | null
          value?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_content_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "admin_users"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          key: string
          type: string | null
          updated_at: string | null
          value: string | null
        }
        Insert: {
          key: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          key?: string
          type?: string | null
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      sound_tracks: {
        Row: {
          cover_url: string | null
          created_at: string
          id: string
          is_enabled: boolean
          position: number | null
          source_type: string
          source_url: string
          title: string
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          position?: number | null
          source_type?: string
          source_url: string
          title: string
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          id?: string
          is_enabled?: boolean
          position?: number | null
          source_type?: string
          source_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ux_events: {
        Row: {
          created_at: string
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
          created_at?: string
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
          created_at?: string
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
      calculate_lead_score: {
        Args: { lead_record: Database["public"]["Tables"]["leads"]["Row"] }
        Returns: string
      }
      cleanup_old_chat_logs: { Args: never; Returns: number }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      match_maia_chunks: {
        Args: {
          match_count?: number
          query_embedding: string
          similarity_threshold?: number
        }
        Returns: {
          content: string
          document_id: string
          document_title: string
          id: string
          metadata: Json
          similarity: number
        }[]
      }
      whoami: { Args: never; Returns: Json }
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
