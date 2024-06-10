<!-- **`src/routes/login/+layout.svelte`**: -->

<!-- ```svelte -->
<script lang="ts">
  import { getSession, supabase } from "../../hooks.client";
  import { staticState, userTokenStore } from "$lib";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Label from "$lib/components/ui/label/label.svelte";
  import { goto } from "$app/navigation";
  import { writable } from "svelte/store";
  import { onMount } from "svelte";

  const dsComp = writable({
    loader: false,
    domMsg: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  onMount(async () => {
    const session = await getSession();
    if (session) {
      goto("/");
    }
  });

  $: showRegisterForm = $staticState.showReg;

  const loginHandler = async () => {
    dsComp.update((state) => ({ ...state, loader: true }));
    const { data, error } = await supabase.auth.signInWithPassword({
      email: $dsComp.email,
      password: $dsComp.password,
    });
    // console.log("en signInWithPassword, data:::", data);
    if (error) {
      dsComp.update((state) => ({
        ...state,
        domMsg: `${error.message}`,
        loader: false,
      }));
      // console.log(
      //   "error in loginhandler",
      //   `Error at ${error.status} ${error.message}`,
      // );
    } else {
      dsComp.update((state) => ({ ...state, loader: false }));
      goto("/");
      $userTokenStore = data.session?.access_token;
    }
  };

  const registerHandler = async () => {
    dsComp.update((state) => ({ ...state, loader: true }));
    // Verificar si las contraseñas coinciden
    if ($dsComp.password !== $dsComp.confirmPassword) {
      dsComp.update((state) => ({
        ...state,
        domMsg: "Las contraseñas no coinciden",
        loader: false,
      }));
      return;
    }
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: $dsComp.email,
      password: $dsComp.password,
    });
    if (error) {
      dsComp.update((state) => ({
        ...state,
        domMsg: `${error.message}`,
        loader: false,
      }));
      // console.log(`Error at ${error.status} ${error.message}`);
    } else {
      dsComp.update((state) => ({ ...state, loader: false }));
      goto("/");
      $userTokenStore = session?.access_token;
    }
  };
</script>

{#await getSession()}
  <p>Loading</p>
{:then ditoYun}
  {#if ditoYun}
    <!-- <p>nice try hackers</p> -->
    <p></p>
  {:else if showRegisterForm}
    <Card.Root class="w-[380px]">
      <Card.Header>
        <Card.Title class="text-3xl font-bold">Registrar</Card.Title>
        <Card.Description
          >Escribe tu email y una contraseña, te enviaremos un correo para
          validar</Card.Description
        >
      </Card.Header>
      <Card.Content class="grid gap-4">
        <p class="text-red-500">
          {$dsComp?.domMsg ?? ""}
        </p>
        <Label for="email">Email</Label>
        <Input
          type="email"
          placeholder="m@ejemplo.com"
          class="input"
          bind:value={$dsComp.email}
        />

        <Label for="password">Contraseña</Label>
        <Input type="password" class="input" bind:value={$dsComp.password} />
        <Label for="password-confirmation">Confirma tu Contraseña</Label>
        <Input
          type="password"
          class="input"
          bind:value={$dsComp.confirmPassword}
        />

        <Button
          loader={$dsComp.loader}
          loader_title="Registering"
          on:click={registerHandler}>Enviar email de validacion</Button
        >
      </Card.Content>
    </Card.Root>
    <div class="w-[380px] p-4 flex justify-between">
      <Label class=" text-center py-2">¿Tienes una cuenta?</Label>
      <Button
        class=""
        variant="link"
        on:click={() => ($staticState.showReg = false)}>Inicia sesión</Button
      >
    </div>
  {:else}
    <Card.Root class="w-[380px]">
      <Card.Header>
        <Card.Title class="text-3xl font-bold">Iniciar Sesion</Card.Title>
        <Card.Description>Escribe tu email y contraseña</Card.Description>
      </Card.Header>
      <Card.Content class="grid gap-4">
        <p class="text-red-500">
          {$dsComp?.domMsg ?? ""}
        </p>

        <Label for="email">Email</Label>
        <Input
          type="email"
          placeholder="m@ejemplo.com"
          class="input"
          bind:value={$dsComp.email}
        />
        <Label for="password">Contraseña</Label>
        <Input type="password" class="input" bind:value={$dsComp.password} />
        <Button
          class="text-white"
          loader={$dsComp.loader}
          loader_title="Logging"
          on:click={loginHandler}>Iniciar sesión</Button
        >
      </Card.Content>
    </Card.Root>
    <div class="w-[380px] p-4 flex justify-between border-solid">
      <Label class=" text-center py-2">¿No tienes una cuenta?</Label>
      <!-- class=" text-center py-2 px-2 border-solid border-2 border-red-500" -->
      <Button
        class=" border-solid border-2"
        variant="link"
        on:click={() => ($staticState.showReg = true)}>Regístrate aquí</Button
      >
    </div>
  {/if}
{/await}

<!-- ** -->
