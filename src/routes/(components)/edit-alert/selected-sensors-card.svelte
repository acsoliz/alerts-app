<Card.Root class="w-[auto]">
  <Card.Header>
    <Card.Title>Valores de Alerta</Card.Title>
    <Card.Description>Configura los valores para la alerta.</Card.Description>
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
