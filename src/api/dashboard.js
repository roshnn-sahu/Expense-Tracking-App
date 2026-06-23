import { getUserId } from '@/utils/storage';
import apiClient from '@/config/axios';

// Helper: Parse a value to a number, default to 0 if invalid
const toNumber = value => {
  const n = parseFloat(String(value ?? '').replace(/,/g, ''));
  return Number.isFinite(n) ? n : 0;
};

// Helper: Map raw API transaction into consistent frontend format
const mapTransaction = (item, index) => {
  const amount = toNumber(item.amount);
  const isIncome = item.type === 'Income';
  return {
    id: item.transaction_id ?? item.id ?? index + 1,
    name: item.name ?? item.title ?? item.description ?? 'Untitled',
    category: item.category ?? 'Other',
    amount: isIncome ? amount : -amount,
    date: item.date ?? item.entry_date ?? '',
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
};

// Fetch dashboard home screen data: balance, income/expense totals, and latest transactions
export const getDashboardData = async () => {
  const response = await apiClient.get('/login/dashboard', {
    headers: { user_id: await getUserId() },
  });

  const raw = response.data?.data ?? response.data;
  const income = raw?.aIncome ?? {};
  const expense = raw?.aExpense ?? {};
  const transactions = Array.isArray(raw?.aLatestTransaction)
    ? raw.aLatestTransaction.map(mapTransaction)
    : [];

  return {
    currency: raw?.currency ?? '$',
    balance: toNumber(raw?.balance),
    totalIncome: toNumber(income.total_amount),
    totalExpense: toNumber(expense.total_amount),
    monthIncome: toNumber(income.this_month_amount),
    monthExpense: toNumber(expense.this_month_amount),
    latestTransactions: transactions,
  };
};

export default { getDashboardData };
