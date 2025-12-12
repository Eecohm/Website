//for user id validation (EMIS Code)
export const validateUserId = (userId) => {
  if (!userId || userId.trim() === "") {
    return "Use ID (EMIS Code) is required";
  }

  // numeric format only
  const userIdPattern = /^\d+$/;
  if (!userIdPattern.test(userId)) {
    return "EMIS Code must contain only numbers";
  }

  //length
  if (userId.length < 1 || userId.length > 20) {
    return "EMIS Code must be between 1-20 digits long";
  }
  return null; //valid
};

//validate class id
export const validateAcademicClassId = (classId) => {
  if (!classId || classId.trim() === "") {
    return "Class Id is required";
  }

  //class id format
  const classIdPattern = /^CLS\d{4}-\d{2}$/;
  if (!classIdPattern.test(classId.toUpperCase())) {
    return "Class ID must follow the pattern CLSYYYY-XX (e.g., CLS2024-01)";
  }
  return null;
};

//validate class name
export const validateAcademicClassName = (className) => {
  if (!className || className.trim() === "") {
    return "Academic class Name is required";
  }
  //length
  if (className.length < 3 || className.length > 50) {
    return "Class Name must be between 3-50 characters long";
  }

  //class name format
  const classNamePattern = /^[A-Za-z0-9\s\-]+$/;
  if (!classNamePattern.test(className)) {
    return "Class Name can contain letters, numbers, hyphens";
  }
  return null;
};

export const validateCreatedByAdmin = (adminId) => {
  if (!adminId || adminId.trim() === "") {
    return "Admin ID is required";
  }

  // Format: ADM followed by numbers
  const adminPattern = /^ADM\d{3,6}$/;
  if (!adminPattern.test(adminId.toUpperCase())) {
    return "Admin ID must follow format: ADM001";
  }

  return null;
};

// File validation functions
export const validateIdCardFile = (file) => {
  if (!file) {
    return { valid: false, message: "ID Card is required" };
  }
  // Check file type
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "ID Card must be an image (JPG, PNG, WEBP)",
    };
  }

  // Check file size (2MB)
  const maxSize = 2 * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, message: "ID Card file size must be less than 2MB" };
  }

  return { valid: true, message: "" };
};

// Update validateTransferCertificate function
export const validateTransferCertificate = (
  file,
  isTransferStudent = false
) => {
  if (isTransferStudent && !file) {
    return {
      valid: false,
      message: "Transfer Certificate is required for transfer students",
    };
  }

  if (!file) return { valid: true, message: "" }; // Optional for non-transfer students

  // Check file type
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: "Transfer Certificate must be PDF or image",
    };
  }

  // Check file size (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      message: "Transfer Certificate file size must be less than 5MB",
    };
  }

  return { valid: true, message: "" };
};

// Update validateClass10Marksheet function
export const validateClass10Marksheet = (file, studentGrade = 10) => {
  if (studentGrade > 10 && !file) {
    return {
      valid: false,
      message: "Class 10 Marksheet is required for students above Grade 10",
    };
  }

  if (!file) return { valid: true, message: "" }; // Optional for Grade 10 and below

  // Check file type
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, message: "Class 10 Marksheet must be PDF or image" };
  }

  // Check file size (5MB)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return {
      valid: false,
      message: "Class 10 Marksheet file size must be less than 5MB",
    };
  }

  return { valid: true, message: "" };
};

// Cross-validation function
export const validateClassIdAndName = (classId, className) => {
  if (!classId || !className) return null;

  // Extract class info from ID and check if it matches name
  const idMatch = classId.match(/CLS\d{4}-(\d{2})$/);
  if (idMatch) {
    const classNumber = idMatch[1];
    if (!className.toLowerCase().includes(classNumber)) {
      return "Class ID and Class Name don't match";
    }
  }

  return null;
};
