<script lang="ts">
  export let alertsValues;
  export let newAlert;
  export let selectedSensors;

  export let onSensorChange;

  function handleSensorChange(event) {
    onSensorChange(event.detail);
  }
</script>

<div>
  <!-- Render alert values form fields based on alertsValues -->
  <div>
    {#each alertsValues.fields as field}
      <div>
        <label>{field.label}</label>
        <input type="text" bind:value={newAlert[field.key]} />
      </div>
    {/each}
  </div>

  <!-- Render sensors selection -->
  <div>
    <label>Sensor</label>
    <input
      type="text"
      bind:value={selectedSensors.sensor}
      on:change={handleSensorChange}
    />

    <label>Sensor de Entrada</label>
    <input
      type="text"
      bind:value={selectedSensors.input_sensor}
      on:change={handleSensorChange}
    />

    <label>Sensor de Salida</label>
    <input
      type="text"
      bind:value={selectedSensors.output_sensor}
      on:change={handleSensorChange}
    />
  </div>
</div>
