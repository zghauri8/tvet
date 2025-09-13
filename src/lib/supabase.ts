import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qzgzfcmdoqgwppjzskhs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Z3pmY21kb3Fnd3Bwanpza2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MjI5MzEsImV4cCI6MjA3MzE5ODkzMX0.fvKyWPWPtjhXilG72RpBW0xAaGC8OMwAUTDP_v_cMYU";

export const supabase = createClient(supabaseUrl, supabaseKey);
