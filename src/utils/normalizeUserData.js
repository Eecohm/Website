/**
 * normalizeUserData.js
 * Transforms api response fields to match component expectations,
 * Handles different field name conventions from various apis responses
 */

export const normalizeUserData = (user) => {
  if (!user) return null;

  //list of normalized fields that components expect
  const normalized = {
    id: user.id || "",
    userId: user.userId || user.user_id || "",
    firstName: user.firstName || user.first_name || "",
    middleName: user.middleName || user.middle_name || "",
    lastName: user.lastName || user.last_name || "",
    userName: user.userEmail || user.user_email || user.username || "",
    email: user.userEmail || user.user_email || user.email || "",
    phone: user.phone || user.tellPhone || user.tel_phone || "",
    alternatePhone: user.alternatePhone || user.alternate_phone || "",
    contactPerson: user.contactPerson || user.contact_person || "",
    photo: user.photo || user.profileImage || "",
    dateOfBirth: user.dateOfBirth || "",
    gender: user.gender || "",
    country: user.country || "",
    province: user.province || user.state || "",
    municipality: user.municipality || user.city || "",
    ward: user.ward || "",
    tole: user.tole || user.street || "",
    pinPoint: user.pinPoint || user.pin_point || "",
    nagariktaNo: user.nagariktaNo || user.nagarikta_no || "",
    panNo: user.panNo || user.pan_no || "",
    nagariktaPhoto: user.nagariktaPhoto || user.nagarikta_photo || "",
    panPhoto: user.panPhoto || user.pan_photo || "",
    resumeCv: user.resumeCv || "",
    jobApplication: user.jobApplication || "",
    hiringLetter: user.hiringLetter || "",
    academicQualification: user.academicQualification || "",
  };

  // Check if kyc documents are preesent
  const hasKycDocs = normalized.nagariktaPhoto || normalized.panPhoto;
  normalized.kycStatus =
    user.kycStatus || (hasKycDocs ? "verified" : "unverified");

  return normalized;
};
