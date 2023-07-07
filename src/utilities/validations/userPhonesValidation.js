export const checkUserPhones = (currentPhones, oldPhones) => {
    if (currentPhones.length !== oldPhones.length) {
        return true;
    }
    let isDifferent = false;
    currentPhones.forEach((phone) => {
        if (!oldPhones.includes(phone)) {
            isDifferent = true;
        }
    });
    return isDifferent;
};