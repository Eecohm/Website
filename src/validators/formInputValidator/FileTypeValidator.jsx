export const isPNGFile = (file) => {
  if (!file) return false;
  return file.type === "image/png";
};

export const isJPGFile = (file) => {
  if (!file) return false;
  return file.type === "image/jpeg" || file.type === "image/jpg";
};

export const isFileBelow3MB = (file) => {
  if (!file) return false;
  const maxSize = 3 * 1024 * 1024; // 3 MB in bytes
  return file.size <= maxSize;
};
