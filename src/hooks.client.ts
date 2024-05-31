import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://zevdbuhbetchgxwwtkkt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpldmRidWhiZXRjaGd4d3d0a2t0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU3NzQzMjAsImV4cCI6MjAzMTM1MDMyMH0.zZz7DN7YrIrs4QYY9L6pQv470vVHqXxdfzoUfMo0xDE")
import { types, subtypes, sensors, alerts } from './stores/alertStore';
import { sensorsData, subtypesData, typesData } from "./data-dummy";
import { get } from "svelte/store";


export const getSession = async () => {
    const { data: { session }, error: err } = await supabase.auth.getSession();
    if (err) {
        return undefined
    } else if (session) {
        return true
    }
}

export async function loadUserAlerts() {
    let { data, error } = await supabase.from("alerts").select('*');
    // console.log('data::.', data)
    alerts.set(data);
    let dataalerts = get(alerts)
    console.log('in load user Alerrts, alerts::', dataalerts)


}

export async function loadInitialData() {
    // const { data: typesData } = await supabase.from('types').select('*');
    types.set(typesData);

    // const { data: subtypesData } = await supabase.from('subtypes').select('*');
    subtypes.set(subtypesData);

    // const { data: sensorsData } = await supabase.from('sensors').select('*');
    sensors.set(sensorsData);
}
export function handleError({ error, event }) {
    // tu manejo de errores aquí
    console.error('en handleError, error::', error);
}