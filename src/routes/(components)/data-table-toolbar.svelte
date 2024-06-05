<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  import { writable } from "svelte/store";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import AddAlertDialog from "./add-alert-dialog.svelte";

  export let alerts;
  export let perPage;

  export let page = writable(1);

  let filterValue = "";
  let filteredData = alerts;
  $: {
    if (filterValue) {
      filteredData = alerts.filter((item) =>
        Object.values(item).some(
          (value) =>
            value &&
            value.toString().toLowerCase().includes(filterValue.toLowerCase())
        )
      );

      page.set(filteredData.slice(0, perPage));
    } else {
      filteredData = alerts;
    }
  }
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 justify-between space-x-2">
    <Input
      bind:value={filterValue}
      placeholder="Filter alerts..."
      class="h-9 w-1/2 lg:w-1/2 bg-white"
      type="search"
    />

    <AddAlertDialog />
  </div>
</div>
