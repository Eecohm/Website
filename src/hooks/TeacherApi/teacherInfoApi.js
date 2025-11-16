import { authenticatedFetch } from "@/Context/Auth/authenticatedFetch";
// used to get stored user id
import { getCookie } from "@/Context/Auth/Cookies";

export const submitTeacherInfo = async (
  formData, //toSend
  baseUrl,
  login,
  setToken,
  method = "POST" // default to POST
) => {
  try {
    const userId = getCookie("id");
    const token = getCookie("accessToken");

    // Initialize FormData
    const submitData = new FormData(); //toSend

    // Helper function to safely append fields
    // what does append do: FormData.append() adds a new value to an existing key inside a FormData object, or adds a new key/value pair if it doesn't already exist.
    const appendIfPresent = (key, value) => {
      if (value !== undefined && value !== null && value !== "")
        submitData.append(key, value);
    };

    // --- Required fields (excluding user for now) ---
    [
      "firstName",
      "lastName",
      "dateOfBirth",
      "gender",
      "country",
      "province",
      "municipality",
      "ward",
      "tole",
      "phone",
      "userId",
      // "userEmail",
      "academicQualification",
      "academicClassId",
      "academicClassName",
      "subjectIds",
      "subjectNames",
    ].forEach((field) => appendIfPresent(field, formData[field]));

    // --- Optional fields ---
    [
      "middleName",
      "tellPhone",
      "alternatePhone",
      "website",
      "contactPerson",
      "pinPoint",
    ].forEach((field) => appendIfPresent(field, formData[field]));

    // --- File fields ---
    [
      "photo",
      "nagariktaPhoto",
      "panPhoto",
      "jobApplication",
      "hiringLetter",
      "resumeCv",
      "skillCertifications",
    ].forEach((fileField) => appendIfPresent(fileField, formData[fileField]));

    //
    //
    //

    // --- Append user logic based on method ---
    if (["PUT", "PATCH"].includes(method.toUpperCase())) {
      appendIfPresent("user", formData.user);

      // for updates, allow provided userId or cookie fallback
      if (
        formData.userId !== undefined &&
        formData.userId !== null &&
        formData.userId !== ""
      ) {
        submitData.append("userId", formData.userId);
      } else if (userId) {
        submitData.append("userId", userId);
      }
    } else {
      // create: follow owner pattern and send empty user marker
      submitData.append("user", "");

      // Honor explicit null from UI: if formData.userId === null => append empty string as null marker
      if (formData.userId === null) {
        submitData.append("userId", ""); // explicit null marker in multipart
      } else if (formData.userId) {
        // if caller provided some ID, use it
        submitData.append("userId", formData.userId);
      } else if (userId) {
        // fallback: append cookie id only if caller didn't explicitly set null or empty
        submitData.append("userId", userId);
      }
    }
    // --- Append userId (for backend reference) ---
    appendIfPresent("userId", userId);

    // --- API Request ---
    const response = await authenticatedFetch(
      `${baseUrl}/user/teachers/`,
      { method, body: submitData },
      baseUrl,
      login,
      setToken
    );

    // --- Handle response ---
    const data = await response.json().catch(() => ({}));

    if (response.ok) return { success: true, data };

    return {
      success: false,
      error: data.message || `HTTP ${response.status}: ${response.statusText}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error occurred",
    };
  }
};
