/**
 * Format a relative date string.
 * Currently handles pre-defined labels like "Today", "Yesterday", etc.
 * @param {string} dateLabel - Relative date label
 * @returns {string} Formatted date string
 */
export const formatDate = (dateLabel) => {
  return dateLabel;
};

/**
 * Format a date for display in transaction lists.
 * @param {string} dateGroup - Group label like "Today", "This Week", etc.
 * @param {string} date - Specific date label
 * @returns {string} Combined display string
 */
export const formatTransactionDate = (dateGroup, date) => {
  return `${dateGroup} · ${date}`;
};
