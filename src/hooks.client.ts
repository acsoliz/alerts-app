import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://zevdbuhbetchgxwwtkkt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldmRidWhiZXRjaGd4d3d0a2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3NzQzMjAsImV4cCI6MjAzMTM1MDMyMH0.zZz7DN7YrIrs4QYY9L6pQv470vVHqXxdfzoUfMo0xDE")


export const getSession = async () => {
    const { data: { session }, error: err } = await supabase.auth.getSession();
    if (err) {
        return undefined
    } else if (session) {
        return true
    }
}