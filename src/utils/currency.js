export const formatCurrency = (
  amount,
  showSymbol = true,
  symbol = '$',
) => {
  const number = Number(amount || 0);

  const formatted =
    number.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return showSymbol
    ? `${symbol}${formatted}`
    : formatted;
};

export const formatAmountWithSign =
  amount => {
    const number = Number(amount || 0);

    const prefix =
      number > 0 ? '+' : '';

    return `${prefix}${formatCurrency(
      number,
    )}`;
  };

export const getAmountColor = (
  amount,
  colors,
) => {
  return amount > 0
    ? colors.green
    : colors.red;
};