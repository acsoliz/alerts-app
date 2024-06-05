<script lang="ts">
  import { onMount } from "svelte";
  import Button from "$lib/components/ui/button/button.svelte";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import TypeSubtypeForm from "./type-subtype-form.svelte";
  import AlertValuesForm from "./alert-values-form.svelte";
  import { supabase } from "../../hooks.client";
  import { sensorsData, subtypesData, typesData } from "../../data-dummy";
  import { findSubtypeByIdOrValue, transformAlertValues } from "../../helpers";

  let initialTypes = [];
  let initialSubtypes = [];
  let initialSensors = [];

  export let alert;

  let selectedType = alert.type || "";
  let selectedSubtype = alert.subtype || "";
  let alertsValues = { ...alert };
  let newAlert = {
    type: alert.type || "",
    subtype: alert.subtype || "",
    max_deviation: alert.max_deviation || "",
    time_in_state: alert.time_in_state || "",
    status: alert.status || "Activa",
  };
  let selectedSensors = {
    sensor: alert.sensor || "",
    input_sensor: alert.input_sensor || "",
    output_sensor: alert.output_sensor || "",
  };

  onMount(async () => {
    try {
      initialTypes = typesData;
      initialSubtypes = subtypesData;
      initialSensors = sensorsData;
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  });

  function getSelectedType({ value }) {
    selectedType = value;
  }

  function getSelectedSubtype({ value }) {
    selectedSubtype = value;
  }

  function setAlertValues() {
    let selectedValues = findSubtypeByIdOrValue(
      initialSubtypes,
      selectedSubtype,
    );
    alertsValues = transformAlertValues(selectedValues);
  }

  async function setNewAlert() {
    newAlert.type = selectedType;
    newAlert.subtype = selectedSubtype;
    newAlert.sensor = selectedSensors.sensor;
    newAlert.input_sensor = selectedSensors.input_sensor;
    newAlert.output_sensor = selectedSensors.output_sensor;

    const { data, error } = await supabase
      .from("alerts")
      .update(newAlert)
      .eq("id", alert.id)
      .select();
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
    <Button variant="outline" class="text-sm py-0 px-2 border border-gray-100"
      >Editar</Button
    >
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[725px]">
    <Dialog.Header>
      <Dialog.Title>Editar alerta</Dialog.Title>
      <Dialog.Description
        >Edita la alerta aquí. Haz clic en guardar cuando termines.</Dialog.Description
      >
    </Dialog.Header>

    <form on:submit|preventDefault={setAlertValues}>
      <Card.Root class="w-[auto]">
        <Card.Header>
          <Card.Title>Tipo de Alerta</Card.Title>
          <Card.Description>Selecciona el tipo de alerta.</Card.Description>
        </Card.Header>
        <Card.Content>
          <TypeSubtypeForm
            {initialTypes}
            {initialSubtypes}
            {selectedType}
            {selectedSubtype}
            onTypeChange={getSelectedType}
            onSubtypeChange={getSelectedSubtype}
          />
        </Card.Content>
        <Card.Footer class="">
          <Button on:click={setAlertValues} type="submit" class="w-full"
            >Fijar</Button
          >
        </Card.Footer>
      </Card.Root>
    </form>

    {#if alertsValues?.fields}
      <Card.Root class="w-[auto]">
        <Card.Header>
          <Card.Title>Valores de Alerta</Card.Title>
          <Card.Description
            >Configura los valores para la alerta.</Card.Description
          >
        </Card.Header>
        <Card.Content>
          <AlertValuesForm
            {alertsValues}
            {newAlert}
            {selectedSensors}
            onSensorChange={getSelectedSensor}
          />
        </Card.Content>
      </Card.Root>
    {/if}

    <Dialog.Footer>
      <Dialog.Close
        ><Button variant="outline" type="reset">Cancelar</Button></Dialog.Close
      >
      <Button on:click={setNewAlert} type="button">Guardar</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
