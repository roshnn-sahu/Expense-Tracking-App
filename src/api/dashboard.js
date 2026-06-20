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

const parseResponseData = data => {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  return data;
};

const getNumber = value => {
  const number = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(number) ? number : 0;
};

const getRootData = data => {
  const parsedData = parseResponseData(data);

  if (parsedData?.data && typeof parsedData.data === 'object') {
    return parsedData.data;
  }

  return parsedData;
};

const mapApiResponseToTransactions = dashboardData => {
  const rows = dashboardData?.aLatestTransaction ?? [];

  if (!Array.isArray(rows)) return [];

  return rows.map((item, index) => {
    const amount = getNumber(item.amount);
    const isIncome = item.type === 'Income';

    return {
      id: item.transaction_id ?? item.id ?? index + 1,
      name: item.name ?? item.title ?? item.description ?? 'Untitled',
      category: item.category ?? 'Other',
      amount: isIncome ? amount : -amount,
      date: item.date ?? item.entry_date ?? item.created_at ?? '',
      party: item.party ?? '',
      icon: item.icon ?? 'MoreHorizontal',
      color: isIncome ? '#10B981' : '#EF4444',
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

const mapApiResponseToDashboard = data => {
  const dashboardData = getRootData(data);
  const income = dashboardData?.aIncome ?? {};
  const expense = dashboardData?.aExpense ?? {};

  return {
    currency: dashboardData?.currency ?? '$',
    balance: getNumber(dashboardData?.balance),
    totalIncome: getNumber(income.total_amount),
    totalExpense: getNumber(expense.total_amount),
    monthIncome: getNumber(income.this_month_amount),
    monthExpense: getNumber(expense.this_month_amount),
    latestTransactions: mapApiResponseToTransactions(dashboardData),
  };
};

export const getDashboardData = async () => {
  const response = await apiClient.get('/login/dashboard', {
    headers: await getUserHeader(),
  });

  return mapApiResponseToDashboard(response.data);
};

export default { getDashboardData };
