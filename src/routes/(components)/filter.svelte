<!-- Filter.svelte -->
<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { writable } from "svelte/store";

  export let alerts;
  export let perPage;

  let filterValue = "";
  let filteredData = alerts;
  $: {
    if (filterValue) {
      filteredData = alerts.filter((item) =>
        Object.values(item).some((value) =>
          value.toString().toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    } else {
      filteredData = alerts;
    }
  }
</script>

<Input
  bind:value={filterValue}
  placeholder="Filter alerts..."
  class="h-9 w-1/2 lg:w-1/2 bg-white"
  type="search"
/>
