import { Toast } from "../notifications/toast";

export const imageUpload = async (file, endpoint, fieldName, token) => {
    const fileData = new FormData();
    fileData.append(fieldName, file);

    try {
      const data = await fetch(endpoint, {
        method: "POST",
        body: fileData,
        headers: {
            "Auth": token
          }
      });
      const response = await data.json();
      return response;
    } catch (error) {
      const myToast = new Toast(error.toString());
      myToast.notifyError();
    }
  };