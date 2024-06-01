<script lang="ts">
  import { staticState } from "$lib";
  import { onMount } from "svelte";
  // import Login from "./login.svelte";
  import Register from "../login/register.svelte";
  import Login from "../login/login.svelte";
  // import Register from "./register.svelte";

  import { getSession } from "../../hooks.client";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const session = await getSession();
    console.log("Delete to deploy. Session:", session);
    if (session) {
      goto("/");
    }
  });
  console.log("Register:: ", Register);
  console.log("Login:: ", Login);
  console.log("staticState:: ", staticState);
</script>

{#await getSession()}
  <p>Firewall checking</p>
{:then ditoYun}
  {#if ditoYun}
    <p>nice try hackers</p>
  {:else}
    <main>
      <!-- {#if $staticState.showReg} -->
      <!-- <Register /> -->
      <!-- {:else} -->
      <Login />
      <!-- {/if} -->
    </main>
  {/if}
{/await}
