import { format, isToday, isYesterday } from 'date-fns';

export const formatDate = date => {
  return format(date, 'dd MMM yyyy');
};

export const formatTransactionDate = date => {
  if (isToday(date)) {
    return 'Today';
  }

  if (isYesterday(date)) {
    return 'Yesterday';
  }

  return format(date, 'dd MMM yyyy');
};

export const formatTransactionDateTime = date => {
  return format(date, 'dd MMM yyyy · hh:mm a');
};