/**
 * Truncates a string if it exceeds a specified maximum length and appends an ellipsis.
 * * @param {string} txt - The input string to be sliced.
 * @param {number} [max=50] - The maximum character limit before truncation occurs.
 * @returns {string} The original string if within limits, or a truncated version with "..." appended.
 * * @example
 * // Returns "Hello Wor..."
 * textSlicer("Hello World", 9);
 * * @example
 * // Returns the original string if it's shorter than max
 * textSlicer("Short", 50);
 */

export function textSlicer(txt: string, max: number = 50) {
  if (txt.length > max) {
    return `${txt.slice(0, max)}...`;
  }
  return txt;
}
