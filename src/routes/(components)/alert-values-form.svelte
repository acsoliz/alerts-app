<!-- src/components/AlertValuesForm.svelte -->
<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  export let alertsValues = {};
  export let newAlert;
  export let selectedSensors;
  export let onSensorChange;
</script>

<form>
  <div class="flex flex-col w-full items-center gap-4">
    <div class="flex justify-between w-full gap-4">
      {#each alertsValues?.selectFields as field}
        <div class="w-full">
          <Label for={field.label}>{field.label}</Label>
          <Select.Root onSelectedChange={onSensorChange}>
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
          class="input"
          bind:value={newAlert.time_in_state}
        />
      </div>
    </div>
  </div>
</form>
