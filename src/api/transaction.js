import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

const USER_ID_KEY = 'user_id';

const userId = async () => (await AsyncStorage.getItem(USER_ID_KEY)) || '1';

const buildFormData = (payload) => {
  const fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      fd.append(key, String(value));
    }
  });
  return fd;
};

const mapRow = (item, index) => {
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
    closing: item.closing ?? item.balance ?? '',
    bill_no: item.bill_no ?? '',
    description: item.description ?? '',
    entry_date: item.entry_date ?? '',
    mode: item.mode ?? '',
    mode_no: item.mode_no ?? '',
    user: item.user ?? '',
    type: item.type ?? '',
  };
};

const getRows = (data) => {
  const d = typeof data === 'string' ? JSON.parse(data) : data;
  const rows = d?.data?.aRow ?? d?.aRow ?? d?.data?.transactions ?? d?.transactions;
  return Array.isArray(rows) ? rows : Array.isArray(d) ? d : [];
};

export const getTransactions = async (filter = 'All', page = 1) => {
  const response = await apiClient.get(`/transaction/list/${filter}/${page}`, {
    headers: { user_id: await userId() },
  });

  const transactions = getRows(response.data).map(mapRow);
  const parsed = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  const totalPages = parsed?.total_pages || parsed?.data?.total_pages || null;

  return {
    transactions,
    page,
    hasMore: totalPages ? page < totalPages : transactions.length > 0,
    totalPages,
  };
};

export const addTransaction = async (payload) => {
  const response = await apiClient.post('/transaction/entry', buildFormData(payload), {
    headers: { user_id: await userId(), 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  });
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await apiClient.delete(`/transaction/delete/${id}`, {
    headers: { user_id: await userId(), Accept: 'application/json' },
  });
  return response.data;
};

export const updateTransaction = async (payload) => {
  const response = await apiClient.post(`/transaction/entry/${payload.id}`, buildFormData(payload), {
    headers: { user_id: await userId(), 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  });
  return response.data;
};

export const getStatement = async (fromDate, toDate) => {
  const response = await apiClient.get('/transaction/statement?', {
    params: { satisfies_date: fromDate, e_date: toDate },
    headers: { user_id: await userId() },
  });

  const parsed = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
  const transactions = getRows(response.data).map(mapRow);

  return {
    transactions,
    closing: parsed?.closing ?? '',
    opening_balance: parsed?.opening_balance ?? '',
    total_income: parsed?.total_income ?? '',
    total_expense: parsed?.total_expense ?? '',
    s_date: parsed?.s_date ?? '',
    e_date: parsed?.e_date ?? '',
    income: parsed?.income ?? '',
    expense: parsed?.expense ?? '',
    diff: parsed?.diff ?? '',
  };
};

export default { getTransactions, addTransaction, updateTransaction, deleteTransaction, getStatement };
