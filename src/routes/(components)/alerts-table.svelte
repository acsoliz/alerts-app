<!-- src/routes/(components)/alerts-table.svelte -->
<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Table from "$lib/components/ui/table";
  import * as Card from "$lib/components/ui/card";
  import { writable } from "svelte/store";

  export let page = writable([]);
</script>

<Card.Root class="w-[auto] h-[305px]">
  <Card.Content class="grid gap-4">
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head>Tipo</Table.Head>
          <Table.Head>Subtipo</Table.Head>
          <Table.Head>Valor</Table.Head>
          <Table.Head>Estado</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each $page as alert}
          <Table.Row>
            <Table.Cell>{alert.type}</Table.Cell>
            <Table.Cell>{alert.subtype}</Table.Cell>
            <Table.Cell>{alert.value}</Table.Cell>
            <Table.Cell>{alert.status}</Table.Cell>
            <Table.Cell
              ><Button variant="outline" class="text-sm py-0 px-2"
                >Editar</Button
              ></Table.Cell
            >
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>
