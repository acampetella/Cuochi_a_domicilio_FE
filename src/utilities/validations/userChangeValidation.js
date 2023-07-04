export const checkUserChange = (actualUser, initialUser) => {
    if (actualUser.firstName !== initialUser.firstName) {
      return true;
    }
    if (actualUser.lastName !== initialUser.lastName) {
        return true;
    }
    if (actualUser.birthDate !== initialUser.birthDate) {
        return true;
    }
    if (actualUser.email !== initialUser.email) {
        return true;
    }
    if (actualUser.avatar !== initialUser.avatar) {
        return true;
    }
    if (actualUser.cover !== initialUser.cover) {
        return true;
    }
    if (actualUser.phones !== initialUser.phones) {
        return true;
    }
    return false;
  }