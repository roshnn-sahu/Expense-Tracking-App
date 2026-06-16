import apiClient from '@/config/axios';

const mapApiResponseToTransactions = (data) => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item, index) => ({
    id: item.id ?? index + 1,
    name: item.name ?? item.title ?? item.description ?? 'Untitled',
    category: item.category ?? 'Other',
    amount: parseFloat(item.amount ?? item.value ?? 0),
    date: item.date ?? item.created_at ?? '',
    dateGroup: item.dateGroup ?? item.date ?? '',
    icon: item.icon ?? 'MoreHorizontal',
    color: item.color ?? '#6B7280',
  }));
};

export const getTransactions = async (filter = 'All') => {
  try {
    const response = await apiClient.get(`/transaction/list/${filter}/`);
    return mapApiResponseToTransactions(response.data);
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message || 'Failed to fetch transactions');
  }
};

export default { getTransactions };
