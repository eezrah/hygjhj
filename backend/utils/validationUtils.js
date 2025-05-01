export const validateSchoolEmail = (email) => {
  const schoolEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.sti\.edu\.ph$/i;
  return schoolEmailRegex.test(email);
};

export const validatePersonalEmail = (email) => {
  // Accept common personal email domains
  const personalEmailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|ph)$/i;
  // Only allow popular providers (gmail, yahoo, outlook, hotmail, etc.)
  const allowedProviders = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com",
    "aol.com",
    "protonmail.com",
    "zoho.com",
    "mail.com",
    "gmx.com",
    "yahoo.com.ph",
    "ymail.com",
    "live.com",
    "msn.com",
    "rocketmail.com",
  ];
  const domain = email.split("@")[1]?.toLowerCase();
  return personalEmailRegex.test(email) && allowedProviders.includes(domain);
};
// Phone number validation
export const validatePhoneNumber = (phoneNumber) => {
  // Remove any non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, "");

  // Check if the number has a valid length (adjust as needed)
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

// Student ID validation
export const validateStudentId = (id) => {
  // Convert to string and trim
  const idStr = String(id).trim();

  // Check if it's a valid number
  if (isNaN(Number(idStr))) {
    return false;
  }

  // Check length (must be exactly 11 digits)
  if (idStr.length !== 11) {
    return false;
  }

  // Check if it starts with '02000'
  if (!idStr.startsWith("02000")) {
    return false;
  }

  return true;
};
