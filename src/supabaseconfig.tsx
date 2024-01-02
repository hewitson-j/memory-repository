import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "";
const supabaseKey = "";

const supabase = createClient(supabaseUrl, supabaseKey);
console.log("Supabase loaded.");

export default supabase;
