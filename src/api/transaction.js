import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

const USER_ID_KEY = 'user_id';
const DEFAULT_USER_ID = '1';

const getUserId = async () => {
  const userId = await AsyncStorage.getItem(USER_ID_KEY);
  return userId || DEFAULT_USER_ID;
};

const parseResponseData = (data) => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  return data;
};

const getTransactionRows = (data) => {
  const parsedData = parseResponseData(data);
  const rows = parsedData?.data?.aRow ?? parsedData?.data?.transactions ?? parsedData?.transactions;

  if (Array.isArray(rows)) return rows;
  if (Array.isArray(parsedData)) return parsedData;

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
      party: item.party ?? '',
      icon: item.icon ?? 'MoreHorizontal',
      color: isIncome ? '#10B981' : '#EF4444',
      // Pass through all raw API fields for the detail modal
      bill_no: item.bill_no ?? '',
      description: item.description ?? '',
      entry_date: item.entry_date ?? '',
      mode: item.mode ?? '',
      mode_no: item.mode_no ?? '',
      user: item.user ?? '',
      type: item.type ?? '',
    };
  });
};

export const getTransactions = async (filter = 'All') => {
  const userId = await getUserId();
  const response = await apiClient.get('/transaction/list/All/', {

    headers: { user_id: userId },
  });

  const transactions = mapApiResponseToTransactions(response.data);

  if (filter === 'Income') return transactions.filter(t => t.amount > 0);
  if (filter === 'Expense') return transactions.filter(t => t.amount < 0);
  if (filter !== 'All') return transactions.filter(t => t.category === filter);

  return transactions;
};

export const addTransaction = async (payload) => {
  const userId = await getUserId();

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  const response = await apiClient.post('/transaction/entry', formData, {
    headers: {
      user_id: userId,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  return response.data;
};

export const updateTransaction = async (payload) => {
  const userId = await getUserId();

  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  const response = await apiClient.put(`/transaction/entry/${payload.id || payload.transaction_id}`, formData, {
    headers: {
      user_id: userId,
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  return response.data;
};

export default { getTransactions, addTransaction, updateTransaction };
