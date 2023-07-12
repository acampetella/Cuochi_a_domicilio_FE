export const checkCookTowns = (currentTowns, oldTowns) => {
    if (currentTowns.length !== oldTowns.length) {
        return true;
    }
    let isDifferent = false;
    currentTowns.forEach((town) => {
        if (!oldTowns.includes(town)) {
            isDifferent = true;
        }
    });
    return isDifferent;
};