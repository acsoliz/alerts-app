<script lang="ts">
  import { supabase } from "../../hooks.client";
  import { staticState, userTokenStore } from "$lib";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Label from "$lib/components/ui/label/label.svelte";
  import { goto } from "$app/navigation";

  const dsComp = {
    loader: false,
    domMsg: "",
    email: "",
    password: "",
  };

  const loginHandler = async () => {
    dsComp.loader = true;
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email: dsComp.email,
      password: dsComp.password,
    });
    if (err) {
      dsComp.domMsg = `Error at ${err.status} ${err.message}`;
      dsComp.loader = false;
    } else {
      dsComp.loader = false;
      goto("/");
      $userTokenStore = data.session?.access_token;
    }
  };
</script>

<Card.Root class="w-[380px]">
  <Card.Header>
    <Card.Title class="text-3xl font-bold">Iniciar Sesion</Card.Title>
    <Card.Description>Escribe tu email y contraseña</Card.Description>
  </Card.Header>

  <Card.Content class="grid gap-4">
    <p class="">
      {dsComp.domMsg}
    </p>

    <Label for="email">Email</Label>
    <Input
      type="email"
      placeholder="m@ejemplo.com"
      class="input"
      bind:value={dsComp.email}
    />
    <Label for="password">Contraseña</Label>
    <Input type="password" class="input" bind:value={dsComp.password} />
    <Button
      class="text-white"
      loader={dsComp.loader}
      loader_title="Logging"
      on:click={loginHandler}>Iniciar sesión</Button
    >
  </Card.Content>
  <div class="">
    <p>Don't have an account yet?</p>
    <button class="" on:click={() => ($staticState.showReg = true)}
      >Register here</button
    >
  </div>
</Card.Root>
