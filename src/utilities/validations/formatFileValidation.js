export const getFormatFileValidation = (fileName, allowedFormats) => {
    let result = null;
    const format = fileName.split('.')[1];
    if (allowedFormats.includes(format)) {
        result = true;
    } else {
        result = 'File format error';
    }
    return result;
};