export const checkCookLinks = (currentLinks, oldLinks) => {
    if (currentLinks.length !== oldLinks.length) {
        return true;
    }
    let isDifferent = false;
    let checkName = false;
    let checkSource = false;
    for (let current of currentLinks) {
        for (let old of oldLinks) {
            if (current.linkName === old.linkName) {
                checkName = true;
            }
            if (current.linkSource === old.linkSource) {
                checkSource = true;
            }
        }
        if (!checkName || !checkSource) {
            isDifferent = true;
        }
    }
    return isDifferent;
};