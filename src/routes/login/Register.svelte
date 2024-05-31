<script lang="ts">
  import { supabase } from "../../hooks.client";
  import { staticState, userTokenStore } from "$lib";
  import { goto } from "$app/navigation";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Label from "$lib/components/ui/label/label.svelte";

  const dsComp = {
    loader: false,
    domMsg: "",
    email: "",
    password: "",
  };

  const registerHandler = async () => {
    dsComp.loader = true;
    const {
      data: { session },
      error: err,
    } = await supabase.auth.signUp({
      email: dsComp.email,
      password: dsComp.password,
    });
    if (err) {
      dsComp.domMsg = `Error at ${err.status} ${err.message}`;
      dsComp.loader = false;
    } else {
      goto("/");
      $userTokenStore = session?.access_token;
      dsComp.loader = false;
    }
  };
</script>

<Card.Root class="w-[380px]">
  <Card.Header>
    <Card.Title class="text-3xl font-bold">Registrar</Card.Title>
    <Card.Description
      >Escribe tu email y una contraseña, te enviaremos un correo para validar</Card.Description
    >
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
    <Label for="password-confirmation">Confirma tu Contraseña</Label>
    <Input type="password" class="input" bind:value={dsComp.password} />
    <Button
      loader={dsComp.loader}
      loader_title="Registering"
      on:click={registerHandler}>Enviar email de validacion</Button
    >
  </Card.Content>
  <div class="">
    <p>tienes una cuenta?</p>
    <button class="" on:click={() => ($staticState.showReg = false)}
      >Inicia sesion</button
    >
  </div>
</Card.Root>
