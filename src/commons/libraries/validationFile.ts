export const checkValidationImage = (file?: File) => {
  if (!file?.size) {
    alert("no file");
    return false;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("file size is bigger than 5Mb");
    return false;
  }

  if (!file.type.includes("jpeg") && !file.type.includes("png")) {
    alert("please upload only jpeg and png files");
    return false;
  }

  return true;
};
