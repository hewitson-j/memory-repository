import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bhuffuqcjdrxpeuqkdhw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJodWZmdXFjamRyeHBldXFrZGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMTg1NzIsImV4cCI6MjAxOTc5NDU3Mn0.SkWp48u_KkoI9lP3d8IIByNCGvxxsr8NHF-O9hVSrzc";

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

export default supabase;
