import { Toast } from "../notifications/toast";

export const fileUpload = async (file, endpoint, fieldName) => {
    const fileData = new FormData();
    fileData.append(fieldName, file);

    try {
      const data = await fetch(endpoint, {
        method: "POST",
        body: fileData
      });
      const response = await data.json();
      return response;
    } catch (error) {
      const myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };