<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  import { writable } from "svelte/store";
  export let data;
  export let perPage;

  export let page = writable(1);

  let filterValue = "";
  let filteredData = data;
  $: {
    if (filterValue) {
      filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(filterValue.toLowerCase())
        )
      );

      page.set(filteredData.slice(0, perPage));
      console.log("filteredData:::", filteredData);
    } else {
      filteredData = data;
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

    <Button variant="outline" class="text-sm py-0 px-2">Añadir Alerta</Button>
  </div>
</div>
