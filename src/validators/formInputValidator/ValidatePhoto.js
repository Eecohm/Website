export const validatePhoto = (file, photoType = "general") => {
  return new Promise((resolve) => {
    if (!file) return resolve({ valid: false, message: "Photo is required" });

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      return resolve({
        valid: false,
        message: "Only JPG, JPEG, or PNG files are allowed",
      });
    }

    const sizeLimits = {
      passport: 1 * 1024 * 1024,
      profile: 2 * 1024 * 1024,
      document: 3 * 1024 * 1024,
      general: 5 * 1024 * 1024,
    };

    const maxSize = sizeLimits[photoType] || sizeLimits.general;
    const sizeLabel =
      {
        passport: "1MB",
        profile: "2MB",
        document: "3MB",
        general: "5MB",
      }[photoType] || "5MB";

    if (file.size > maxSize) {
      return resolve({
        valid: false,
        message: `${photoType} photo must be under ${sizeLabel}`,
      });
    }

    if (photoType === "passport") {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        const aspectRatio = width / height;

        if (width < 400 || height < 500) {
          return resolve({
            valid: false,
            message: "Passport photo must be at least 400x500 pixels",
          });
        }

        if (aspectRatio < 0.6 || aspectRatio > 0.9) {
          return resolve({
            valid: false,
            message: "Passport photo must have a portrait ratio (~3:4)",
          });
        }

        resolve({ valid: true, message: "Passport photo is valid" });
      };

      img.onerror = () =>
        resolve({ valid: false, message: "Cannot read image dimensions" });

      img.src = URL.createObjectURL(file);
    } else {
      resolve({ valid: true, message: "Photo is valid" });
    }
  });
};
