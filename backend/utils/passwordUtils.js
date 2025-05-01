import bcrypt from "bcrypt";

// Sanitize password (remove leading/trailing whitespace)
export const sanitizePassword = (password) => {
  return typeof password === "string" ? password.trim() : "";
};

// Validate password strength
export const validatePasswordStrength = (password) => {
  const errors = [];
  const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!PASSWORD_REGEX.test(password)) {
    errors.push(
      "Password must be at least 8 characters long and contain at least one letter and one number"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Hash password using bcrypt
export const hashPassword = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Compare password with hash
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
