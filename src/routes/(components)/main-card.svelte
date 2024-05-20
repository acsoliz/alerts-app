<!-- src/routes/(components)/main-card-svelte -->
<script lang="ts">
  import { writable } from "svelte/store";
  import { AlertsTable, DataTableToolbar, Pagination } from "./index";

  let dataAlert = [
    {
      id: 1,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "20%-1",
      status: "Activa",
    },
    {
      id: 2,
      type: "pH",
      subtype: "Valor Max",
      value: "10-2",
      status: "Activa",
    },
    {
      id: 3,
      type: "Conductividad",
      subtype: "Valor Min",
      value: "2-3",
      status: "Activa",
    },
    {
      id: 4,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "3-4",
      status: "Activa",
    },
    {
      id: 5,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "20%-5",
      status: "Activa",
    },
    {
      id: 6,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "10-6",
      status: "Activa",
    },
    {
      id: 7,
      type: "Conductividad",
      subtype: "Valor Min",
      value: "2-7",
      status: "Activa",
    },
    {
      id: 8,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "3-8",
      status: "Activa",
    },
    {
      id: 9,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "20%-9",
      status: "Activa",
    },
    {
      id: 10,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "10-10",
      status: "Activa",
    },
    {
      id: 11,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "20%-11",
      status: "Activa",
    },
    {
      id: 12,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "10-12",
      status: "Activa",
    },
    {
      id: 13,
      type: "Conductividad",
      subtype: "Valor Min",
      value: "2-13",
      status: "Activa",
    },
    {
      id: 14,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "3-14",
      status: "Activa",
    },
    {
      id: 15,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "20%-15",
      status: "Activa",
    },
    {
      id: 16,
      type: "Conductividad",
      subtype: "Desviacion Max",
      value: "10-16",
      status: "Activa",
    },
  ];
  let data = dataAlert;
  let perPage = 5;
  let page = writable(data.slice(0, perPage)); // page es ahora un writable

  let count = data.length;
</script>

<div class="grid gap-4 border-2 w-[70%]">
  <DataTableToolbar {page} {data} {perPage} />
  <AlertsTable {page} />
  <Pagination {count} {perPage} {page} {data} />
</div>
