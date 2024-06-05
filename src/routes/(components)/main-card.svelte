<!-- src/routes/(components)/main-card-svelte -->
<script lang="ts">
  import { writable } from "svelte/store";
  import { AlertsTable, DataTableToolbar, Pagination } from "./index";

  export let data;
  let perPage = 5;
  let page = writable(data.slice(0, perPage)); // page es ahora un writable

  let count = data.length;
</script>

<div class="grid gap-4 border-2 w-[70%]">
  <DataTableToolbar {page} alerts={data} {perPage} />
  <AlertsTable {page} />
  <Pagination {count} {perPage} {page} alerts={data} />
</div>
