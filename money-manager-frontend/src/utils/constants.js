export const CATEGORIES = {
  INCOME: [
    { value: 'salary', label: 'Salary', icon: '💰' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'investment', label: 'Investment', icon: '📈' },
    { value: 'freelance', label: 'Freelance', icon: '💻' },
    { value: 'bonus', label: 'Bonus', icon: '🎁' },
    { value: 'other', label: 'Other', icon: '➕' },
  ],
  EXPENSE: [
    { value: 'fuel', label: 'Fuel', icon: '⛽' },
    { value: 'food', label: 'Food', icon: '🍔' },
    { value: 'movie', label: 'Movie', icon: '🎬' },
    { value: 'medical', label: 'Medical', icon: '🏥' },
    { value: 'loan', label: 'Loan', icon: '🏦' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'utilities', label: 'Utilities', icon: '💡' },
    { value: 'transportation', label: 'Transportation', icon: '🚗' },
    { value: 'education', label: 'Education', icon: '📚' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎮' },
    { value: 'other', label: 'Other', icon: '➕' },
  ],
};

export const DIVISIONS = [
  { value: 'personal', label: 'Personal' },
  { value: 'office', label: 'Office' },
];

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const PERIOD_FILTERS = {
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
};

export const CHART_COLORS = {
  income: '#10b981',
  expense: '#ef4444',
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
};
