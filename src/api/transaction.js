import { isThisWeek, isToday, isYesterday, parseISO, subDays } from 'date-fns';
import apiClient from '@/config/axios';

const getResponseRows = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data?.aRow)) return data.data.aRow;
  return [];
};

const getDateGroup = (dateValue) => {
  if (!dateValue) return 'Other';

  const date = parseISO(dateValue);
  if (Number.isNaN(date.getTime())) return 'Other';

  if (isToday(date)) return 'Today';
  if (isYesterday(date)) return 'Yesterday';
  if (isThisWeek(date)) return 'This Week';
  if (date >= subDays(new Date(), 7)) return 'Last Week';

  return 'Other';
};

const mapApiResponseToTransactions = (data) => {
  const rows = getResponseRows(data);

  return rows.map((item, index) => {
    const rawAmount = parseFloat(item.amount ?? item.value ?? 0);
    const amount = Number.isNaN(rawAmount) ? 0 : rawAmount;
    const isIncome = item.type === 'Income';

    return {
      id: item.transaction_id ?? item.id ?? index + 1,
      name: item.name ?? item.title ?? item.description ?? 'Untitled',
      category: item.category ?? 'Other',
      amount: isIncome ? Math.abs(amount) : -Math.abs(amount),
      date: item.date ?? item.created_at ?? '',
      dateGroup: getDateGroup(item.date ?? item.entry_date ?? item.created_at),
      icon: item.icon ?? 'MoreHorizontal',
      color: isIncome ? '#10B981' : '#EF4444',
      type: isIncome ? 'Income' : 'Expense',
      description: item.description ?? '',
      mode: item.mode ?? '',
      billNo: item.bill_no ?? '',
    };
  });
};

export const getTransactions = async (filter = 'All') => {
  try {
    const response = await apiClient.get('/transaction/list/All/', {
      params: { pagination_limit: 100 },
    });
    const transactions = mapApiResponseToTransactions(response.data);

    if (filter === 'Income') return transactions.filter(t => t.amount > 0);
    if (filter === 'Expense') return transactions.filter(t => t.amount < 0);
    if (filter !== 'All') return transactions.filter(t => t.category === filter);

    return transactions;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch transactions');
  }
};

export default { getTransactions };
