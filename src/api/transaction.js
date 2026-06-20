import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '@/config/axios';

const USER_ID_KEY = 'user_id';
const DEFAULT_USER_ID = '1';

const getUserId = async () => {
  const userId = await AsyncStorage.getItem(USER_ID_KEY);
  return userId || DEFAULT_USER_ID;
};

const getUserHeader = async () => {
  const userId = await getUserId();
  return { 'User_id': userId };
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
  const rows = parsedData?.data?.aRow ?? parsedData?.aRow ?? parsedData?.data?.transactions ?? parsedData?.transactions;

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
      closing: item.closing ?? item.balance ?? '',
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

export const getTransactions = async (filter = 'All', page = 1) => {
  const url = `/transaction/list/${filter}/${page}`;

  const response = await apiClient.get(url, {
    headers: await getUserHeader(),
  });

  const transactions = mapApiResponseToTransactions(response.data);

  // Extract pagination info from response if available
  const parsedData =
    typeof response.data === 'string'
      ? JSON.parse(response.data)
      : response.data;
  const totalPages =
    parsedData?.total_pages || parsedData?.data?.total_pages || null;
  const hasMore = totalPages ? page < totalPages : transactions.length > 0;

  return {
    transactions,
    page,
    hasMore,
    totalPages,
  };
};


export const addTransaction = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });

  const response = await apiClient.post('/transaction/entry', formData, {
    headers: {
      ...await getUserHeader(),
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  return response.data;
};

export const deleteTransaction = async (id) => {
  const response = await apiClient.delete(`/transaction/delete/${id}`, {
    headers: {
      ...await getUserHeader(),
      Accept: 'application/json',
    },
  });
  return response.data;
};

export const updateTransaction = async (payload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(key, String(value));
    }
  });


  const response = await apiClient.post(`/transaction/entry/${payload.id}`, formData, {
    headers: {
      ...await getUserHeader(),
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
    },
  });
  return response.data;
};

export const getStatement = async (fromDate, toDate) => {
  const response = await apiClient.get('/transaction/statement?', {
    params: {
      satisfies_date: fromDate,
      e_date: toDate,
    },
    headers: await getUserHeader(),
  });

  const parsedData = parseResponseData(response.data);
  const transactions = mapApiResponseToTransactions(response.data);


  return {
    transactions,
    closing: parsedData?.closing ?? '',
    opening_balance: parsedData?.opening_balance ?? '',
    total_income: parsedData?.total_income ?? '',
    total_expense: parsedData?.total_expense ?? '',
    s_date: parsedData?.s_date ?? '',
    e_date: parsedData?.e_date ?? '',
    income: parsedData?.income ?? '',
    expense: parsedData?.expense ?? '',
    diff: parsedData?.diff ?? '',
  };
};

export default { getTransactions, addTransaction, updateTransaction, deleteTransaction, getStatement };
