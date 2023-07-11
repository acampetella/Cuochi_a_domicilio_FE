import { checkCookTowns } from "./cookTownsValidation";
import { checkCookLinks } from "./cookLinksValidation";

export const checkCookChange = (currentCook, initialCook) => {
    if (currentCook.description !== initialCook.description) {
      return true;
    }
    if (currentCook.available !== initialCook.available) {
        return true;
    }
    if (checkCookTowns(currentCook.towns, initialCook.towns)) {
        return true;
    }
    if (checkCookLinks(currentCook.personalLinks, initialCook.personalLinks)) {
        return true;
    }

    return false;
  }