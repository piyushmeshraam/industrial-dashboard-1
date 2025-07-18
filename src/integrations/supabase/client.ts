// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://rpjzvzzcsgvsrzvdtsto.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwanp2enpjc2d2c3J6dmR0c3RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1NzExMTIsImV4cCI6MjA2ODE0NzExMn0.OYkyyFB4VEo3FvWu_Y8iqvCdSD7sMGYTWTa3vmSbhMM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});