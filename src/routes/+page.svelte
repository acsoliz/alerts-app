<!-- /src/routes/+page.svelte -->

<script lang="ts">
  import { onMount } from "svelte";
  import { MainAlertCard } from "./(components)/index";
  import { loadInitialData, loadUserAlerts } from "../hooks.client";
  import { alerts, types, subtypes, sensors } from "../stores/alertStore";

  onMount(async () => {
    await loadUserAlerts();
    await loadInitialData();
  });
</script>

{#if $alerts.length === 0}
  <p>Firewall checking</p>
{:else}
  <MainAlertCard data={$alerts} />
  <!--  este es la pantalla principal de la aplicacion dentro de este componente se renderiza un boton que abre el editar y el de agregar que son los que te mostre anteriormente-->
{/if}
