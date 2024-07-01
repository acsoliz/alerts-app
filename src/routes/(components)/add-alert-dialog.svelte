<!-- add-alert-dialog.svelte -->
<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { loadUserAlerts, supabase } from "../../hooks.client";
  import { sensorsData, subtypesData, typesData } from "../../data-dummy";
  import { onMount } from "svelte";

  let initialTypes = [];
  let initialSubtypes = [];
  let initialSensors = [];
  let userEmail = "";

  let selectedType = "";
  let selectedSubtype = "";
  let alertsValues = {};
  let newAlert = initializeNewAlert();
  let selectedSensors = initializeSelectedSensors();

  function initializeNewAlert() {
    return {
      type: "",
      subtype: "",
      max_deviation: "",
      time_in_state: "",
      status: "Activa",
      email: "",
    };
  }

  function initializeSelectedSensors() {
    return {
      sensor: "",
      input_sensor: "",
      output_sensor: "",
    };
  }

  function restoreDefaultValues() {
    selectedType = "";
    selectedSubtype = "";
    alertsValues = {};
    newAlert = initializeNewAlert();
    selectedSensors = initializeSelectedSensors();
  }

  onMount(async () => {
    try {
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

  function handleSelectedType({ value }) {
    selectedType = value;
  }

  function handleSelectedSubtype({ value }) {
    selectedSubtype = value;
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

  function setAlertValues() {
    const selectedValues = findSubtypeByIdOrValue(selectedSubtype);
    if (!selectedValues) {
      return { message: "No subtype selected" };
    }
    alertsValues = transformAlertValues(selectedValues);
    return alertsValues;
  }

  async function setNewAlert() {
    Object.assign(newAlert, {
      type: selectedType,
      subtype: selectedSubtype,
      sensor: selectedSensors.sensor,
      input_sensor: selectedSensors.input_sensor,
      output_sensor: selectedSensors.output_sensor,
      email: userEmail,
    });

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

  function handleSelectedSensor(data) {
    const {
      value: { label },
      label: sensorLabel,
    } = data;
    if (label === "Sensor de Salida") {
      selectedSensors.output_sensor = sensorLabel;
    } else if (label === "Sensor de Entrada") {
      selectedSensors.input_sensor = sensorLabel;
    } else if (label === "Sensor") {
      selectedSensors.sensor = sensorLabel;
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
              <Select.Root onSelectedChange={handleSelectedType}>
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
              <Select.Root onSelectedChange={handleSelectedSubtype}>
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
                    <Select.Root onSelectedChange={handleSelectedSensor}>
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
      <Dialog.Close>
        <Button on:click={restoreDefaultValues} variant="outline" type="reset">
          Cancelar
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button on:click={setNewAlert} type="button">Guardar</Button>
      </Dialog.Close>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
