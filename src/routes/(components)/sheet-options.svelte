<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet";
  import Button from "$lib/components/ui/button/button.svelte";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Link } from "$lib/components/ui/pagination";
  import { goto } from "$app/navigation";
  import { supabase } from "../../hooks.client";

  const logoutHandler = async () => {
    const { error: err } = await supabase.auth.signOut();
    console.log(`Error al cerrar sesión: ${err}`);
    goto("/login");
  };

  async function redirectToGuacamole() {
    console.log("en redirectToGuacamole::::");
    try {
      const response = await fetch("/api/generate-token");
      if (!response.ok) {
        throw new Error("Error generando el token");
      }
      const { token } = await response.json();
      console.log("token:::", token);
      window.location.href = `https://217.71.204.218:8443/#/?data=${encodeURIComponent(token)}`;
    } catch (error) {
      console.error("Error al redirigir a Guacamole:", error);
    }
  }
</script>

<div class="">
  <Sheet.Header>
    <Sheet.Title>Opciones</Sheet.Title>
    <Separator class="my-4" />
    <Sheet.Description class="p-2">
      Conéctate a tu escritorio remoto.
    </Sheet.Description>
  </Sheet.Header>

  <Sheet.Footer>
    <Sheet.Close asChild let:builder>
      <!-- Este es el botón que se debe usar -->
      <Button
        on:click={redirectToGuacamole}
        builders={[builder]}
        class="w-[70%]"
        type="button">Acceder</Button
      >
    </Sheet.Close>
  </Sheet.Footer>
  <Separator class="my-4" />
  <Button on:click={logoutHandler} variant="link">Cerrar Sesión</Button>
</div>
