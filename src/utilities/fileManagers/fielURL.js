
export const getFileURL = (file) => {
    const url = URL.createObjectURL(file);
    return url;
};