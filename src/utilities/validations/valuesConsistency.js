export const getFormDataValuesConsistency = (formData) => {
    const values = Object.values(formData);
    let result = true;
    values.forEach((value) => {
        if (value === undefined || value === null || value === '') {
            result = false;
        }
    });
    return result;
};