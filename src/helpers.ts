// src/helpers.ts

export function findSubtypeByIdOrValue(subtypes, key) {
    return subtypes.find(
        (subtype) => subtype.id === key || subtype.value === key
    );
}

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
