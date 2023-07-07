import { checkUserPhones } from "./userPhonesValidation";

export const checkUserChange = (currentUser, initialUser) => {
    if (currentUser.firstName !== initialUser.firstName) {
      return true;
    }
    if (currentUser.lastName !== initialUser.lastName) {
        return true;
    }
    if (currentUser.birthDate !== initialUser.birthDate) {
        return true;
    }
    if (currentUser.email !== initialUser.email) {
        return true;
    }
    if (currentUser.avatar !== initialUser.avatar) {
        return true;
    }
    if (currentUser.cover !== initialUser.cover) {
        return true;
    }
    if (checkUserPhones(currentUser.phones, initialUser.phones)) {
        return true;
    }

    return false;
  }