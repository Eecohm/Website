import { authenticatedFetch } from "@/Context/Auth/authenticatedFetch";
import { getCookie } from "@/Context/Auth/Cookies";

export const submitStudentInfo = async (formData, baseUrl, login, setToken, studentId = null) => {
  try {
    // it retrieves the user id and access token from browser cookies
    const userId = getCookie("id");
    // token verifies that the request is being made by an authenticated user
    const token = getCookie("accessToken");

    // FormData is often used in web applications to handle form submissions that include file uploads, as it can easily manage both text fields and binary file data.
    const submitData = new FormData();

    // This function checks if a value is present and appends it to the FormData object.
    // append means: To add a new value to an existing key in the FormData object. If the key already exists, the new value is added to the list of values for that key.
    const appendIfPresent = (key, value) => {
      if (value !== undefined && value !== null && value !== "") {
        submitData.append(key, value);
      }
    };

    //required fields
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
      "academicClassId",
      "academicClassName",
      "createdByAdmin",
    ].forEach((field) => appendIfPresent(field, formData[field]));

    //optional fields
    [
      "middleName",
      "pinPoint",
      "tellPhone",
      "alternatePhone",
      "website",
      "contactPerson",
    ].forEach((field) => appendIfPresent(field, formData[field]));

    //file fields
    ["photo", "idCard", "class10Marksheet", "transferCertificate"].forEach(
      (fileField) => appendIfPresent(fileField, formData[fileField])
    );

    // Append user ID: This ensures that the userId is always included in the submission, linking the data to the correct user.
    appendIfPresent("userId", userId);

    //  DEBUG: Log what data is being sent
    console.log("Sending student data to backend:");
    for (let [key, value] of submitData.entries()) {
      console.log(`${key}:`, value);
    }

    //api request: This sends the FormData to the backend server using an authenticated fetch function.
    const response = await authenticatedFetch(
      studentId ? `${baseUrl}/user/students/${studentId}/` : `${baseUrl}/user/students/`,
      {
        // Use PUT for updates, POST for new submissions
        method: studentId ? "PUT" : "POST",
        body: submitData,
      },

      // These parameters are likely used within the authenticatedFetch function to handle authentication and token management.
      baseUrl,
      login,
      setToken
    );

    //handle response
    const data = await response.json().catch(() => ({}));
    if (response.ok) return { success: true, data };

    // If the response is not ok (i.e., the request failed), it returns an error message.
    return {
      success: false,
      error:
        data.message ||
        `HTTP ${response.status}: ${response.statusText} : ${response.statusText}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Network error occurred",
    };
  }
};
