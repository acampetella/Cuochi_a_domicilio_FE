import { getFormDataTypesConsistency } from "./typesConsistency";
import { getFormDataValuesConsistency } from "./valuesConsistency";

export const getFormDataValidation = (formData, valuesTypes) => {
    let error = null;
    if (!getFormDataValuesConsistency(formData)) {
        error = 'Form data values inconsistent';
    }
    if (!getFormDataTypesConsistency(formData, valuesTypes)) {
        error = 'Form data types inconsistent';
    }
    if (error !== null) {
        return error;
    }
    return true;

};