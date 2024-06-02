<!-- **`src/routes/login/+page.svelte`**: -->

<!-- ```svelte -->
<script lang="ts">
  import { staticState } from "$lib";
  import { onMount } from "svelte";
  import { getSession } from "../../hooks.client";
  import { goto } from "$app/navigation";

  onMount(async () => {
    const session = await getSession();
    if (session) {
      goto("/");
    }
  });
</script>

{#await getSession()}
  <!-- <p>Firewall checking</p> -->
  <p></p>
{:then ditoYun}
  {#if ditoYun}
    <!-- <p>nice try hackers</p> -->
    <p></p>
  {:else}
    <main>
      <slot />
    </main>
  {/if}
{/await}
<!-- ``` -->
