// src/routes/+layout.ts
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '../DatabaseDefinitions'
import { key, url } from '$lib/services/db'

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth')
    console.log('')
    const supabase = createSupabaseLoadClient<Database>({
        supabaseUrl: url,
        supabaseKey: key,
        event: { fetch },
        serverSession: data.session,
    })

    /**
     * It's fine to use `getSession` here, because on the client, `getSession` is
     * safe, and on the server, it reads `session` from the `LayoutData`, which
     * safely checked the session using `safeGetSession`.
     */
    const {
        data: { session },
    } = await supabase.auth.getSession()

    return { supabase, session }
}