// src/routes/auth/callback/server.ts
import { redirect } from '@sveltejs/kit'

export const GET = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get('code')

    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }

    redirect(303, '/')
}