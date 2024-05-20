// src/app.d.ts
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import { SupabaseClient, Session, User } from '@supabase/supabase-js'
import { Database } from '$lib/index'
declare global {
	namespace App {
		interface Locals {
			// sb: TypedSupabaseClient
			supabase: SupabaseClient<Database>
			session: Session | null
			safeGetSession: () => Promise<Session | null, User | null>
		}
		interface PageData {
			session: Session | null
			user: User | null

		}
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
