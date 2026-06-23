import { getUserId } from '@/utils/storage';
import apiClient from '@/config/axios';

// Helper: Build FormData from a payload object, skipping empty values
const buildFormData = (payload) => {
  const fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      fd.append(key, String(value));
    }
  });
  return fd;
};

// Helper: Map raw API transaction row into consistent frontend format
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

// Helper: Extract transaction rows array from various API response shapes
const getRows = (data) => {
  const d = typeof data === 'string' ? JSON.parse(data) : data;
  const rows = d?.data?.aRow ?? d?.aRow ?? d?.data?.transactions ?? d?.transactions;
  return Array.isArray(rows) ? rows : Array.isArray(d) ? d : [];
};

// Fetch paginated transaction list with optional filter (All/Income/Expense)
export const getTransactions = async (filter = 'All', page = 1) => {
  const response = await apiClient.get(`/transaction/list/${filter}/${page}`, {
    headers: { user_id: await getUserId(), 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
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

// Add a new transaction (expense or income)
export const addTransaction = async (payload) => {
  const response = await apiClient.post('/transaction/entry', buildFormData(payload), {
    headers: { user_id: await getUserId(), 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  });
  return response.data;
};

// Delete a transaction by its ID
export const deleteTransaction = async (id) => {
  const response = await apiClient.delete(`/transaction/delete/${id}`, {
    headers: { user_id: await getUserId(), Accept: 'application/json' },
  });
  return response.data;
};

// Update an existing transaction by ID with new payload data
export const updateTransaction = async (payload) => {
  const response = await apiClient.post(`/transaction/entry/${payload.id}`, buildFormData(payload), {
    headers: { user_id: await getUserId(), 'Content-Type': 'multipart/form-data', Accept: 'application/json' },
  });
  return response.data;
};

// Fetch statement/account summary for a date range (fromDate to toDate)
export const getStatement = async (fromDate, toDate) => {
  const response = await apiClient.get('/transaction/statement?', {
    params: { satisfies_date: fromDate, e_date: toDate },
    headers: { user_id: await getUserId() },
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
