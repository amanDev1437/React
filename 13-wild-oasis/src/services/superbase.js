import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://lpqpfahriyupcusmzpvv.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwcXBmYWhyaXl1cGN1c216cHZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMTM0MTgsImV4cCI6MjA2Mjc4OTQxOH0.mf8QFw8UxmKrbvmdvZIFaELXQrREnwyNt3RJZ7b1cYk";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
