<!-- /src/routes/+page.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import { MainAlertCard, UserOptions } from "./(components)/index";
  import { loadInitialData, loadUserAlerts } from "../hooks.client";
  import { alerts } from "../stores/alertStore";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import Navbar from "./(components)/navbar.svelte";
  onMount(async () => {
    await loadUserAlerts();
    await loadInitialData();
  });
</script>

{#if !$alerts.length}
  <p>Firewall checking</p>
{:else}
  <!-- <div class="w-[70%] flex border-solid border-red-500"> -->
  <!-- <div class="w-[100%] flex border-solid border-2 border-red-500">
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} variant="link" class="p-1 m-1">
          <svg
            width="32px"
            height="32px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="inline-block"
          >
            <path
              d="M4 6H20M4 12H20M4 18H20"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <UserOptions />
      </Sheet.Content>
    </Sheet.Root>
  </div> -->
  <Navbar />
  <MainAlertCard data={$alerts} />
{/if}
