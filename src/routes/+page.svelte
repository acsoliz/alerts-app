<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  // import { AlertsTable } from "./(components)/index";
  import type { PageData } from "./$types.js";
  export let data: PageData;
  // import * as Card from "$lib/components/ui/card";
  import { MainAlertCard } from "./(components)/index";
  let alertsArray = [
    {
      id: 1,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "20%",
      status: "Activa",
    },
    {
      id: 2,
      type: "pH",
      subtype: "Valor Max",
      value: "10",
      status: "Activa",
    },
    {
      id: 3,
      type: "Conductividad",
      subtype: "Valor Min",
      value: "2",
      status: "Activa",
    },
    {
      id: 4,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "3",
      status: "Activa",
    },
    {
      id: 5,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "20%",
      status: "Activa",
    },
    {
      id: 6,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "10",
      status: "Activa",
    },
  ];
</script>

<!-- <Card.Root class="w-[auto]">
  <Card.Content class="grid gap-4">
    <AlertsTable data={alertsArray} />
  </Card.Content>
</Card.Root> -->
<MainAlertCard data={alertsArray} />
