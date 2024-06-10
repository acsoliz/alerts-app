<!-- src/components/AlertValuesForm.svelte -->
<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  /*recibe alertsValues con la propiedad [selectFields] */
  export let alertsValues = {};
  export let newAlert;
  export let selectedSensors;
  export let onSensorChange;
  let currentSelectValues = {
    output_sensor:
      newAlert["output_sensor"] == "" ? null : newAlert["output_sensor"],
    input_sensor:
      newAlert["input_sensor"] == "" ? null : newAlert["input_sensor"],
    sensor: newAlert["sensor"] == "" ? null : newAlert["sensor"],
  };

  console.log("currentSelectValues::::", currentSelectValues);

  console.log("newAlert::", newAlert);
  console.log("alertsValues.selectFields::", alertsValues?.selectFields);
</script>

<div class="flex flex-col w-full items-center gap-4">
  <!-- fila de selects, puede varia de acuerdo al tipy/subtype seleccionado -->
  <!-- {console.log("newAlert[field.label]:::", newAlert[newAlert.label])} -->

  <div class="flex justify-between w-full gap-4">
    {#each alertsValues?.selectFields as field}
      <!-- {console.log("field::::", field)} -->
      <div class="w-full">
        <!-- select title -->
        <Label for={field.label}>{field.label}</Label>
        <Select.Root onSelectedChange={onSensorChange}>
          <Select.Trigger id={field.label}>
            <Select.Value placeholder={newAlert[field.name]} />
          </Select.Trigger>

          <Select.Content>
            {#each field.options as option}
              <Select.Item bind:value={field} label={option}>
                {option}
              </Select.Item>
            {/each}
          </Select.Content>
        </Select.Root>
      </div>
    {/each}
  </div>
  <!--  -->
  <div class="flex justify-between w-full gap-4">
    <div class="w-full">
      <Label for={newAlert.max_deviation}>Desviación Máxima</Label>
      <Input
        bind:value={newAlert.max_deviation}
        type="text"
        placeholder="Valor"
        class="input"
      />
    </div>
    <div class="w-full">
      <Label for={newAlert.time_in_state}>Tiempo en ese Estado</Label>
      <Input
        type="text"
        placeholder="Valor"
        class={newAlert.time_in_state ?? "value"}
        bind:value={newAlert.time_in_state}
      />
    </div>
  </div>
</div>
