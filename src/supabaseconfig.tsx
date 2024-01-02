import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_API_URL;
const supabaseKey = process.env.SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl || "", supabaseKey || "");
console.log("Supabase loaded.", supabase);

export default supabase;
