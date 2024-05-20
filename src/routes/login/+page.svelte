<!-- /src/routes/login/+page.svelte -->

<script lang="ts">
  import type { PageData } from "./$types.js";
  import LoginForm from "./login-form.svelte";
  export let data: PageData;
  import * as Card from "$lib/components/ui/card";

  let { supabase } = data;
  $: ({ supabase } = data);

  let email;
  let password;

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/login/callback`,
      },
    });
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
</script>

<!-- <form on:submit={handleSignUp}>
  <input name="email" bind:value={email} />
  <input type="password" name="password" bind:value={password} />
  <button>Sign up</button>
</form> -->

<!-- <button on:click={handleSignIn}>Sign in</button>
<button on:click={handleSignOut}>Sign out</button> -->

<Card.Root class="w-[380px]">
  <Card.Header>
    <Card.Title class="text-3xl font-bold">Iniciar Sesion</Card.Title>
    <Card.Description>Escribe tu email y contraseña</Card.Description>
  </Card.Header>

  <Card.Content class="grid gap-4">
    <LoginForm data={data.form} />
  </Card.Content>
</Card.Root>
