<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Table from "$lib/components/ui/table";
  import * as Card from "$lib/components/ui/card";
  import { writable } from "svelte/store";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

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
            <Table.Cell>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button
                    variant="outline"
                    class="text-sm py-0 px-2 border border-gray-100"
                    >Editar</Button
                  >
                </Dialog.Trigger>
                <Dialog.Content class="sm:max-w-[425px]">
                  <Dialog.Header>
                    <Dialog.Title>Edit profile</Dialog.Title>
                    <Dialog.Description>
                      Make changes to your profile here. Click save when you're
                      done.
                    </Dialog.Description>
                  </Dialog.Header>
                  <div class="grid gap-4 py-4">
                    <div class="grid grid-cols-4 items-center gap-4">
                      <Label for="name" class="text-right">Name</Label>
                      <Input
                        id="name"
                        value="Pedro Duarte"
                        class="col-span-3"
                      />
                    </div>
                    <div class="grid grid-cols-4 items-center gap-4">
                      <Label for="username" class="text-right">Username</Label>
                      <Input
                        id="username"
                        value="@peduarte"
                        class="col-span-3"
                      />
                    </div>
                  </div>
                  <Dialog.Footer>
                    <Button type="submit">Save changes</Button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Root>
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
</Card.Root>
