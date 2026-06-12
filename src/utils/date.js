
export const formatCurrency = (amount, showSymbol = true) => {
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return showSymbol ? `$${formatted}` : formatted;
};

export const formatAmountWithSign = (amount) => {
  const prefix = amount > 0 ? '+' : '';
  return `${prefix}${formatCurrency(amount)}`;
};

export const getAmountColor = (amount, colors) => {
  return amount > 0 ? colors.green : colors.red;
};
