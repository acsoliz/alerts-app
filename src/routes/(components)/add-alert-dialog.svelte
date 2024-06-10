<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { loadUserAlerts, supabase } from "../../hooks.client";
  import { get } from "svelte/store";
  import { sensorsData, subtypesData, typesData } from "../../data-dummy";
  import { onMount } from "svelte";
  let initialTypes = [];
  let initialSubtypes = [];
  let initialSensors = [];
  let userEmail = "";

  const restoreDefaultValues = (data) => {
    console.log("on restoreDefaultValues, data:::", data);
    // initialTypes = [];
    // initialSubtypes = [];
    // initialSensors = [];
    selectedType = "";
    selectedSubtype = "";
    alertsValues = {};
    newAlert = {
      type: "",
      subtype: "",
      max_deviation: "",
      time_in_state: "",
      status: "Activa",
      email: "",
    };
    selectedSensors = {
      sensor: "",
      input_sensor: "",
      output_sensor: "",
    };
  };

  onMount(async () => {
    try {
      // TODO. implementar los datos en la base de datos de supabase
      // const { data: typesData, error: typesError } = await supabase
      //   .from("types")
      //   .select("*");
      // if (typesError) throw typesError;
      initialTypes = typesData;
      initialSubtypes = subtypesData;
      initialSensors = sensorsData;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session && session.user) {
        userEmail = session.user.email;
      }
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  });

  let selectedType = "";
  let selectedSubtype = "";
  let alertsValues = {};
  let newAlert = {
    type: "",
    subtype: "",
    max_deviation: "",
    time_in_state: "",
    status: "Activa",
    email: "",
  };
  let selectedSensors = {
    sensor: "",
    input_sensor: "",
    output_sensor: "",
  };

  function getSelectedType({ value }) {
    selectedType = value;
  }

  function getSelectedSubtype({ value }) {
    selectedSubtype = value;
  }

  function setAlertValues() {
    let selectedValues = findSubtypeByIdOrValue(selectedSubtype);
    alertsValues = transformAlertValues(selectedValues);
    // if
    // console.log("en Fijar, selectedSubtype:::", selectedSubtype);
    // console.log("en Fijar, selectedValues:::", selectedValues);
    if (!selectedValues) {
      return { message: "No subtype selected" };
      // Aqui agregar un error
    } else {
      return alertsValues;
    }
  }

  function findSubtypeByIdOrValue(key) {
    return initialSubtypes.find(
      (subtype) => subtype.id === key || subtype.value === key,
    );
  }

  function transformAlertValues(alertValues) {
    const selectFields = [];
    const inputFields = [];

    if (alertValues?.fields) {
      alertValues.fields.forEach((field) => {
        if (field.type === "select") {
          selectFields.push(field);
        } else {
          inputFields.push(field);
        }
      });
    }

    return {
      ...alertValues,
      selectFields,
      inputFields,
    };
  }

  async function setNewAlert() {
    newAlert.type = selectedType;
    newAlert.subtype = selectedSubtype;
    newAlert.sensor = selectedSensors.sensor;
    newAlert.input_sensor = selectedSensors.input_sensor;
    newAlert.output_sensor = selectedSensors.output_sensor;
    newAlert.email = userEmail;

    console.log("newAlert::::", newAlert);

    const { data, error } = await supabase
      .from("alerts")
      .insert([newAlert])
      .select();
    if (error) {
      console.error("Error inserting new alert:", error);
      return;
    }
    await loadUserAlerts();
    restoreDefaultValues();
  }

  function getSelectedSensor(data) {
    if (data.value.label === "Sensor de Salida") {
      selectedSensors.output_sensor = data.label;
    } else if (data.value.label === "Sensor de Entrada") {
      selectedSensors.input_sensor = data.label;
    } else if (data.value.label === "Sensor") {
      selectedSensors.sensor = data.label;
    }
  }
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button variant="outline" class="text-sm py-0 px-2">Añadir Alerta</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[725px]">
    <Dialog.Header>
      <Dialog.Title>Añadir alerta</Dialog.Title>
      <Dialog.Description>
        Agrega una nueva alerta aquí. Haz clic en guardar cuando termines.
      </Dialog.Description>
    </Dialog.Header>

    <form on:submit={setAlertValues}>
      <Card.Root class="w-[auto]">
        <Card.Header>
          <Card.Title>Tipo de Alerta</Card.Title>
          <Card.Description>Selecciona el tipo de alerta.</Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid grid-cols-2 w-full items-center gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="type">Tipo</Label>
              <Select.Root onSelectedChange={getSelectedType}>
                <Select.Trigger id="type">
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  {#each initialTypes as type}
                    <Select.Item value={type.value} label={type.label}>
                      {type.label}
                    </Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="subtype">Subtipo</Label>
              <Select.Root onSelectedChange={getSelectedSubtype}>
                <Select.Trigger id="subtype">
                  <Select.Value placeholder="Select" />
                </Select.Trigger>
                <Select.Content>
                  {#each initialSubtypes as subtype}
                    <Select.Item value={subtype.value} label={subtype.label}>
                      {subtype.label}
                    </Select.Item>
                  {/each}
                </Select.Content>
              </Select.Root>
            </div>
          </div>
        </Card.Content>

        <Card.Footer class="">
          <Button on:click={setAlertValues} type="submit" class="w-full">
            Fijar
          </Button>
        </Card.Footer>
      </Card.Root>
    </form>

    {#if alertsValues?.fields}
      <Card.Root class="w-[auto]">
        <Card.Header>
          <Card.Title>Valores de Alerta</Card.Title>
          <Card.Description>
            Configura los valores para la alerta.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <form>
            <div class="flex flex-col w-full items-center gap-4">
              <div class="flex justify-between w-full gap-4">
                {#each alertsValues?.selectFields as field}
                  <div class="w-full">
                    <Label for={field.label}>{field.label}</Label>
                    <Select.Root onSelectedChange={getSelectedSensor}>
                      <Select.Trigger id={field.label}>
                        <Select.Value placeholder="Select" />
                      </Select.Trigger>
                      <Select.Content>
                        {#each field.options as option}
                          <Select.Item value={field} label={option}>
                            {option}
                          </Select.Item>
                        {/each}
                      </Select.Content>
                    </Select.Root>
                  </div>
                {/each}
              </div>
              <div class="flex justify-between w-full gap-4">
                <div class="w-full">
                  <Label for={newAlert.max_deviation}>Desviacion Máxima</Label>
                  <Input
                    bind:value={newAlert.max_deviation}
                    type="text"
                    placeholder="Valor"
                    class="input"
                  />
                </div>
                <div class="w-full">
                  <Label for={newAlert.time_in_state}
                    >Tiempo en ese Estado</Label
                  >
                  <Input
                    type="text"
                    placeholder="Valor"
                    class="input"
                    bind:value={newAlert.time_in_state}
                  />
                </div>
              </div>
            </div>
          </form>
        </Card.Content>
      </Card.Root>
    {/if}

    <Dialog.Footer>
      <Dialog.Close
        ><Button on:click={restoreDefaultValues} variant="outline" type="reset"
          >Cancelar</Button
        ></Dialog.Close
      >
      <Dialog.Close>
        <Button on:click={setNewAlert} type="button">Guardar</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
