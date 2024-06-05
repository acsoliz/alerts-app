<!-- /src/routes/+layout.svelte -->
<script lang="ts">
  import "../app.css";

  import { userTokenStore } from "$lib";
  import { supabase } from "../hooks.client";
  import type { AuthChangeEvent, Session } from "@supabase/supabase-js";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  supabase.auth.onAuthStateChange(
    (event: AuthChangeEvent, session: Session | null) => {
      $userTokenStore = session?.access_token;
    },
  );
  onMount(() => {
    // Check if user is logged in
    if (!$userTokenStore && $page.url.pathname !== "/login") {
      goto("/login");
    }
  });
</script>

{#if $userTokenStore || $page.url.pathname === "/login"}
  <!-- <main class="w-[100%]"> -->
  <!-- <main class=""> -->
  <!-- <a href="/">Main View</a>
  <a href="/login" class="transition-all active:scale-95 hover:opacity-60 p-2"
    >Login</a
  > -->
  <slot />
  <!-- </main> -->
{/if}
