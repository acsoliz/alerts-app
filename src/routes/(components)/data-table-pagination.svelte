<!-- src/routes/(components)/data-table-pagination.svelte -->
<script lang="ts">
  import Label from "$lib/components/ui/label/label.svelte";
  import * as Pagination from "$lib/components/ui/pagination";
  import { writable } from "svelte/store";

  export let alerts;
  export let count;
  export let perPage;
  export let page = writable(1);

  function updateValues(newPageNumber) {
    let startIndex = (newPageNumber - 1) * perPage;
    let endIndex = startIndex + perPage;

    page.set(alerts.slice(startIndex, endIndex));
  }
</script>

<div class="flex flex-1 justify-between space-x-2">
  <Label class="flex items-center justify-center text-gray-800 text-xs"
    >{perPage} de {count} alerta(s)</Label
  >
  <Pagination.Root
    {count}
    {perPage}
    onPageChange={(newPageNumber) => {
      updateValues(newPageNumber);
    }}
    let:pages
    let:currentPage={$page}
    class="w-[auto] "
  >
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton class="bg-white">Anterior</Pagination.PrevButton>
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton class="bg-white">Siguiente</Pagination.NextButton
        >
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
</div>
