export const getFormDataTypesConsistency = (formData, valuesTypes) => {
    const values = Object.values(formData);
    if (values.length !== valuesTypes.length) {
        return false;
    }
    for(let i = 0; i < values.length; i++) {
        if (typeof values[i] !== valuesTypes[i]) {
            return false;
        }
    }
    return true;
};