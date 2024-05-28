export const typesData = [
    {
        id: 1,
        value: "Conductividad",
        label: "Conductividad",
    },
    {
        id: 2,
        value: "pH",
        label: "pH",
    },
    {
        id: 3,
        value: "Temperatura",
        label: "Temperatura",
    },
];

export const sensorsData = ["sensor 1", "sensor 2", "sensor 3", "sensor 4", "sensor 5"];

export const subtypesData = [
    {
        id: 1,
        label: "Desviacion Max",
        value: "Desviacion Max",
        fields: [
            {
                label: "Sensor de Entrada",
                type: "select",
                options: sensorsData,
            },
            {
                label: "Sensor de Salida",
                type: "select",
                options: sensorsData,
            },
            {
                label: "Desviacion Max",
                type: "input",
            },
            {
                label: "Tiempo en ese Estado",
                type: "input",
            },
        ],
    },
    {
        id: 2,
        label: "Valor Max",
        value: "Valor Max",
        fields: [
            {
                label: "Sensor",
                type: "select",
                options: sensorsData,
            },
            {
                label: "Desviacion Max",
                type: "input",
            },
            {
                label: "Tiempo en ese Estado",
                type: "input",
            },
        ],
    },
    {
        id: 3,
        label: "Valor Min",
        value: "Valor Min",
        fields: [
            {
                label: "Sensor",
                type: "select",
                options: sensorsData,
            },
            {
                label: "Desviacion Max",
                type: "input",
            },
            {
                label: "Tiempo en ese Estado",
                type: "input",
            },
        ],
    },
];