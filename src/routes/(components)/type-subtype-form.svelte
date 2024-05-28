<!-- src/components/TypeSubtypeForm.svelte -->
<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";
  import { Label } from "$lib/components/ui/label/index.js";

  export let initialTypes = [];
  export let initialSubtypes = [];
  export let selectedType;
  export let selectedSubtype;
  export let onTypeChange;
  export let onSubtypeChange;
</script>

<div class="grid grid-cols-2 w-full items-center gap-4">
  <div class="flex flex-col space-y-1.5">
    <Label for="type">Tipo</Label>
    <Select.Root onSelectedChange={onTypeChange}>
      <Select.Trigger id="type">
        <Select.Value placeholder={selectedType} />
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
    <Select.Root onSelectedChange={onSubtypeChange}>
      <Select.Trigger id="subtype">
        <Select.Value placeholder={selectedSubtype} />
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
