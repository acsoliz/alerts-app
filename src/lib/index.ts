import { createClient } from '@supabase/supabase-js'
const key: string = import.meta.env.VITE_SUPABASE_ANON_KEY as string;
const url: string = import.meta.env.VITE_SUPABASE_URL as string;

console.log('URL:::::', url);
console.log('Key:::::', key);


// export { key, url };
// place files you want to import through the `$lib` alias in this folder.
// export { url, key } from './services/db';
export type { Database } from "$lib/supabase"


export const supabase = createClient<Database>(url, key)