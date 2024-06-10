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
        name: "max_deviation",
        label: "Desviacion Max",
        value: "Desviacion Max",
        fields: [
            {
                name: "input_sensor",
                label: "Sensor de Entrada",
                type: "select",
                options: sensorsData,
            },
            {
                name: "output_sensor",
                label: "Sensor de Salida",
                type: "select",
                options: sensorsData,
            },
            {

                name: "max_deviation",
                label: "Desviacion Max",
                type: "input",
            },
            {

                name: "time_in_state",
                label: "Tiempo en ese Estado",
                type: "input",
            },
        ],
    },
    {
        id: 2,
        name: "max_value",
        label: "Valor Max",
        value: "Valor Max",
        fields: [
            {
                name: "sensor",
                label: "Sensor",
                type: "select",
                options: sensorsData,
            },
            {
                name: "max_deviation",
                label: "Desviacion Max",
                type: "input",
            },
            {
                name: "time_in_state",
                label: "Tiempo en ese Estado",
                type: "input",
            },
        ],
    },
    {
        id: 3,
        name: "min_value",
        label: "Valor Min",
        value: "Valor Min",
        fields: [
            {
                name: "sensor",
                label: "Sensor",
                type: "select",
                options: sensorsData,
            },
            {
                name: "max_deviation",
                label: "Desviacion Max",
                type: "input",
            },
            {
                name: "time_in_state",
                label: "Tiempo en ese Estado",
                type: "input",
            },
        ],
    },
];