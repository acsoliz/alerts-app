<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  import { writable } from "svelte/store";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

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

  const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "next",
      label: "Next.js",
    },
    {
      value: "astro",
      label: "Astro",
    },
    {
      value: "nuxt",
      label: "Nuxt.js",
    },
  ];
  const types = [
    {
      value: "Conductividad",
      name: "Conductividad",
    },
    {
      value: "pH",
      name: "pH",
    },
    {
      value: "Temperatura",
      name: "Temperatura",
    },
  ];

  const subtypes = [
    {
      value: "deviation-max",
      name: "Desviacion Max",
    },
    {
      value: "max-value",
      name: "Valor Max",
    },
    {
      value: "min-value",
      name: "Valor Min",
    },
  ];
</script>

<div class="flex items-center justify-between">
  <div class="flex flex-1 justify-between space-x-2">
    <Input
      bind:value={filterValue}
      placeholder="Filter alerts..."
      class="h-9 w-1/2 lg:w-1/2 bg-white"
      type="search"
    />

    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline" class="text-sm py-0 px-2"
          >Añadir Alerta</Button
        >
      </Dialog.Trigger>
      <Dialog.Content class="sm:max-w-[725px]">
        <Dialog.Header>
          <Dialog.Title>Añadir alerta</Dialog.Title>
          <Dialog.Description>
            Agrega una nueva alerta aquí. Haz clic en guardar cuando termines.
          </Dialog.Description>
        </Dialog.Header>

        <Card.Root class="w-[auto]">
          <Card.Header>
            <Card.Title>Tipo de Alerta</Card.Title>
            <Card.Description>Selecciona el tipo de alaerta.</Card.Description>
          </Card.Header>
          <Card.Content>
            <form>
              <div class="grid grid-cols-2 w-full items-center gap-4">
                <div class="flex flex-col space-y-1.5">
                  <Label for="type">Tipo</Label>
                  <Select.Root>
                    <Select.Trigger id="type">
                      <Select.Value placeholder="Select" />
                    </Select.Trigger>
                    <Select.Content>
                      {#each types as type}
                        <Select.Item value={type.value} label={type.name}
                          >{type.name}</Select.Item
                        >
                      {/each}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div class="flex flex-col space-y-1.5">
                  <Label for="subtype">Subtipo</Label>
                  <Select.Root>
                    <Select.Trigger id="subtype">
                      <Select.Value placeholder="Select" />
                    </Select.Trigger>
                    <Select.Content>
                      {#each subtypes as subtype}
                        <Select.Item value={subtype.value} label={subtype.name}
                          >{subtype.name}</Select.Item
                        >
                      {/each}
                    </Select.Content>
                  </Select.Root>
                </div>
              </div>
            </form>
          </Card.Content>

          <Card.Footer class="">
            <Button class="w-full">Fijar</Button>
          </Card.Footer>
        </Card.Root>
        <!--  -->
        <Card.Root class="w-[auto]">
          <Card.Header>
            <Card.Title>Valores de Alerta</Card.Title>
            <Card.Description
              >Configura los valores para la alerta .</Card.Description
            >
          </Card.Header>
          <Card.Content>
            <form>
              <div class="grid grid-cols-2 w-full items-center gap-4">
                <div class="flex flex-col space-y-1.5">
                  <Label for="type">Sensor de Entrada</Label>
                  <Select.Root>
                    <Select.Trigger id="type">
                      <Select.Value placeholder="Select" />
                    </Select.Trigger>
                    <Select.Content>
                      {#each types as type}
                        <Select.Item value={type.value} label={type.name}
                          >{type.name}</Select.Item
                        >
                      {/each}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div class="flex flex-col space-y-1.5">
                  <Label for="subtype">Sensor de Salida</Label>
                  <Select.Root>
                    <Select.Trigger id="subtype">
                      <Select.Value placeholder="Select" />
                    </Select.Trigger>
                    <Select.Content>
                      {#each subtypes as subtype}
                        <Select.Item value={subtype.value} label={subtype.name}
                          >{subtype.name}</Select.Item
                        >
                      {/each}
                    </Select.Content>
                  </Select.Root>
                </div>
                <div>
                  <Label for="DesviacionMax">Desviacion Maxima</Label>
                  <Input type="text" placeholder="Valor" class="input"></Input>
                </div>
                <div>
                  <Label for="DesviacionMax">Tiempo en ese Estado</Label>
                  <Input type="number" placeholder="Valor" class=""></Input>
                </div>
              </div>
            </form>
          </Card.Content>
        </Card.Root>
        <Dialog.Footer>
          <Button variant="outline" type="reset">Cancelar</Button>
          <Button type="submit">Guardar</Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  </div>
</div>
