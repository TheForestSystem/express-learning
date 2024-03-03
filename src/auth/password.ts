import bcrypt from 'bcryptjs';

/**
 * Asynchronously hashes the given password.
 * @param {string} password - The password to hash.
 * @returns {Promise<string>} - A promise that resolves with the hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

/**
 * Asynchronously verifies the given password against the hashed password.
 * @param {string} password - The password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the password matches.
 */
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Synchronously hashes the given password.
 * @param {string} password - The password to hash.
 * @returns {string} - The hashed password.
 */
export const hashPasswordSync = (password: string): string => {
  return bcrypt.hashSync(password, 12);
};

/**
 * Synchronously verifies the given password against the hashed password.
 * @param {string} password - The password to verify.
 * @param {string} hashedPassword - The hashed password to compare against.
 * @returns {boolean} - A boolean indicating whether the password matches.
 */
export const verifyPasswordSync = (password: string, hashedPassword: string): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

// Exporting the functions
export default {
  hashPassword,
  verifyPassword,
  hashPasswordSync,
  verifyPasswordSync,
};
