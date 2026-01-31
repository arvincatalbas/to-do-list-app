import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase URL and Anon Key
const supabaseUrl = 'https://drxfozgiagrvklgjytfg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyeGZvemdpYWdydmtsZ2p5dGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2Mjk4MTksImV4cCI6MjA4NTIwNTgxOX0.RpL-rUHOnM6C2_xDRQKWBIzm_ug0DVyIyNQg29ofgf8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
