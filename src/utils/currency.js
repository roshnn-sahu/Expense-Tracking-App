/**
 * Format a number as currency (USD).
 * @param {number} amount
 * @param {boolean} showSymbol - Whether to include the $ symbol
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, showSymbol = true) => {
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return showSymbol ? `$${formatted}` : formatted;
};

/**
 * Format amount with sign for display.
 * Returns e.g. "+$4,500.00" or "-$5.50"
 * @param {number} amount
 * @returns {string}
 */
export const formatAmountWithSign = (amount) => {
  const prefix = amount > 0 ? '+' : '';
  return `${prefix}${formatCurrency(amount)}`;
};

/**
 * Get the display color for an amount (green for positive, red for negative).
 * Uses colors from style.js.
 * @param {number} amount
 * @param {object} colors - The colors object from style.js
 * @returns {string} Color hex string
 */
export const getAmountColor = (amount, colors) => {
  return amount > 0 ? colors.green : colors.red;
};
