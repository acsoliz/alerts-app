<script lang="ts">
  export let initialTypes;
  export let initialSubtypes;
  export let selectedType;
  export let selectedSubtype;

  export let onTypeChange;
  export let onSubtypeChange;

  function handleTypeChange(event) {
    onTypeChange(event.detail);
  }

  function handleSubtypeChange(event) {
    onSubtypeChange(event.detail);
  }
</script>

<div>
  <select bind:value={selectedType} on:change={handleTypeChange}>
    {#each initialTypes as type}
      <option value={type.value}>{type.label}</option>
    {/each}
  </select>

  <select bind:value={selectedSubtype} on:change={handleSubtypeChange}>
    {#each initialSubtypes as subtype}
      <option value={subtype.value}>{subtype.label}</option>
    {/each}
  </select>
</div>
