// src/helpers.ts
import { sensorsData, subtypesData, typesData } from "./data-dummy";

/*
retorna un objeto subtipo de un array de subtipos y toma como input una clave id o el value
*/
export function findSubtypeByIdOrValue(subtypes, key) {
    console.log('en findSubtypeByIdOrValue', { subtypes, key })
    return subtypes.find(
        (subtype) => subtype.id === key || subtype.value === key
    );
}
/*
* Retorna un objeto con dos arrays para mapear uno con los selects y otro con inputs normales
*/
export function transformAlertValues(alertValues) {
    const selectFields = [];
    const inputFields = [];

    if (alertValues?.fields) {
        alertValues.fields.forEach((field) => {
            if (field.type === "select") {
                selectFields.push(field);
            } else {
                inputFields.push(field);
            }
        });
    }

    return {
        ...alertValues,
        selectFields,
        inputFields,
    };
}

export async function loadData() {
    return {
        types: typesData,
        subtypes: subtypesData,
        sensors: sensorsData
    };
}