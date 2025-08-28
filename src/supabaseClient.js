import { createClient } from "@supabase/supabase-js";


const supabaseUrl ="https://etneeknrzsvbxubkmkru.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0bmVla25yenN2Ynh1Ymtta3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyOTQ4NDksImV4cCI6MjA3MTg3MDg0OX0.g4pjYwlocmVoZvSv9nc_HuG_8QCncLnc_SYkPVL6QOI";

export const supabase = createClient(supabaseUrl,supabaseAnonKey);