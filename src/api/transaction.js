import apiClient from '@/config/axios';

const getTransactionRows = (data) => {
  if (Array.isArray(data?.data?.aRow)) return data.data.aRow;
  if (Array.isArray(data)) return data;
  return [];
};

const mapApiResponseToTransactions = (data) => {
  const rows = getTransactionRows(data);

  return rows.map((item, index) => {
    const amount = parseFloat(item.amount ?? item.value ?? 0) || 0;
    const isIncome = item.type === 'Income';

    return {
      id: item.transaction_id ?? item.id ?? index + 1,
      name: item.name ?? item.title ?? item.description ?? 'Untitled',
      category: item.category ?? 'Other',
      amount: isIncome ? Math.abs(amount) : -Math.abs(amount),
      date: item.date ?? item.entry_date ?? item.created_at ?? '',
      dateGroup: 'Other',
      icon: item.icon ?? 'MoreHorizontal',
      color: isIncome ? '#10B981' : '#EF4444',
    };
  });
};

export const getTransactions = async (filter = 'All') => {
  const response = await apiClient.get('/transaction/list/All/');

  const transactions = mapApiResponseToTransactions(response.data);

  if (filter === 'Income') return transactions.filter(t => t.amount > 0);
  if (filter === 'Expense') return transactions.filter(t => t.amount < 0);
  if (filter !== 'All') return transactions.filter(t => t.category === filter);

  return transactions;
};

export default { getTransactions };
