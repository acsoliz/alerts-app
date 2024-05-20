// src/routes/login/+page.server.ts
import type { PageServerLoad } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
// import { Session, SupabaseClient } from '@supabase/supabase-js';
import { supabase } from "$lib/index";



export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(formSchema)),
    };
};

const handleSignIn = async (email: string, password: string) => {
    await supabase.auth.signInWithPassword({
        email,
        password,
    });
};

// export const actions: Actions = {
export const actions = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        };
        console.log('Formulario enviado:::.', form);
        // TODO. Aqui Deberia ejecutarse el handleSignIn ?'
        await handleSignIn(form.data.email, form.data.password);

        return {
            form,
        };
    },
};