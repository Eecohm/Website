export const isValidTelephone = (phone) => {
  // Only allow digits, +, and -
  return /^[\d+-]+$/.test(phone);
};

export const isValidPhone = (phone) => {
  const pattern = /^(98|97|91)\d{8}$/;
  return pattern.test(phone);

  //length of numbers
};

export const validateFile = (
  file,
  allowPngOnly = false,
  photoType = "general"
) => {
  // basic file check
  if (!file) return { valid: false, message: "No file selected" };

  //set size limit based on photo type
  let maxSize;
  if (photoType === "passport") {
    maxSize = 1 * 1024 * 1024; // 1MB for passport photos
  } else {
    maxSize = 3 * 1024 * 1024; // 3MB for general photos
  }

  //file type validation
  const validTypes = allowPngOnly
    ? ["image/png"]
    : ["image/jpeg", "image/jpg", "image/png"];

  if (file.size > maxSize) {
    const sizeLimit = photoType === "passport" ? "1MB" : "3MB";
    return { valid: false, message: `File must be under ${sizeLimit}` };
  }

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      message: allowPngOnly
        ? "Only PNG files are allowed"
        : "Only JPG, JPEG, or PNG files are allowed",
    };
  }

  //dimension check for passport photos
  if (photoType === "passport") {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const aspectRatio = width / height;

        // Passport requirements
        if (width < 400 || height < 500) {
          resolve({
            valid: false,
            message: "Passport photo must be at least 400x500 pixels",
          });
          return;
        }

        if (aspectRatio < 0.6 || aspectRatio > 0.9) {
          resolve({
            valid: false,
            message: "Passport photo must be portrait orientation",
          });
          return;
        }

        resolve({ valid: true, message: "Photo meets passport requirements" });
      };
      img.src = URL.createObjectURL(file);
    });
  }

  return { valid: true }; //for non pp photos
};
