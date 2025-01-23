import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY as string;

const supabase = createClient(
    "https://dioketiuedohqlaegzhm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpb2tldGl1ZWRvaHFsYWVnemhtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NDI4NTksImV4cCI6MjA1MzExODg1OX0.aOl2aPqWDCvzc1eCenT2cqkSPw87zDc36WB9x1dyxs4"
);

export default supabase;
