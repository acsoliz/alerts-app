// src/routes/+layout.server.ts
export const load = async ({ locals: { safeGetSession } }) => {
    const { session, user } = await safeGetSession()
    console.log('en layout.server con session y user ::::', session, user)
    return {
        session,
        user,
    }
}