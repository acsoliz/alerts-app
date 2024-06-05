<!-- /src/routes/+page.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import { MainAlertCard, UserOptions } from "./(components)/index";
  import { loadInitialData, loadUserAlerts } from "../hooks.client";
  import { alerts, types, subtypes, sensors } from "../stores/alertStore";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import Button from "$lib/components/ui/button/button.svelte";
  import { FaBars } from "svelte-icons/fa"; // Importar el ícono de hamburguesa

  onMount(async () => {
    await loadUserAlerts();
    await loadInitialData();
  });
</script>

{#if $alerts.length === 0}
  <p>Firewall checking</p>
{:else}
  <!-- <div class="w-[70%] flex border-solid border-red-500"> -->
  <div class="w-[70%] flex">
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button builders={[builder]} variant="link" class="p-1 m-1">
          <FaBars
          /><!-- TODO. debe estar mas pegado a la izquierda no debe hacer margen izquierdo ni padding, el tamaño debe ser un pooc mas grande  -->
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <UserOptions />
      </Sheet.Content>
    </Sheet.Root>
  </div>
  <MainAlertCard data={$alerts} />
{/if}
