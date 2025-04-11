/**
 * Generates a random integer between `min` and `max` (inclusive).
 * @param {number} min - Minimum value.
 * @param {number} max - Maximum value.
 * @returns {number} A random integer.
 */
export const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };