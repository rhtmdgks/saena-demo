export type WaitlistStatus = 'pending' | 'contacted' | 'converted';

export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  status: WaitlistStatus;
  source: string;
  metadata: Record<string, any>;
}

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: WaitlistEntry;
        Insert: Omit<WaitlistEntry, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Omit<WaitlistEntry, 'id' | 'created_at'>>;
      };
    };
  };
}
