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
    console.log(`err to logout: err::: ${err}`);
    goto("/login");
  };
</script>

<div class="">
  <Sheet.Header>
    <Sheet.Title>Opciones</Sheet.Title>
    <Separator class="my-4" />
    <Sheet.Description class="p-2"
      >Conectate a tu escritorio remoto.</Sheet.Description
    >
  </Sheet.Header>

  <Sheet.Footer>
    <Sheet.Close asChild let:builder>
      <Button builders={[builder]} class="w-[70%]" type="submit">Acceder</Button
      >
      <!-- TODO. este boton se esta renderizando al lado derecho, debe estar al centro -->
    </Sheet.Close>
  </Sheet.Footer>
  <Separator class="my-4" />
  <Button on:click={logoutHandler} variant="link">Cerrar Sesion</Button>
</div>
