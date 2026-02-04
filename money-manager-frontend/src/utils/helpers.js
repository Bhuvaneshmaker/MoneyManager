import { format, parseISO, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, differenceInHours } from 'date-fns';

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy');
};

export const formatDateTime = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'dd MMM yyyy, hh:mm a');
};

export const canEdit = (transactionDate) => {
  const now = new Date();
  const txDate = typeof transactionDate === 'string' ? parseISO(transactionDate) : transactionDate;
  const hoursDiff = differenceInHours(now, txDate);
  return hoursDiff <= 12;
};

export const getDateRange = (period, date = new Date()) => {
  switch (period) {
    case 'weekly':
      return {
        start: startOfWeek(date, { weekStartsOn: 1 }),
        end: endOfWeek(date, { weekStartsOn: 1 }),
      };
    case 'monthly':
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    case 'yearly':
      return {
        start: startOfYear(date),
        end: endOfYear(date),
      };
    default:
      return { start: date, end: date };
  }
};

export const groupTransactionsByDate = (transactions) => {
  const grouped = {};
  
  transactions.forEach(transaction => {
    const date = formatDate(transaction.date);
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  });
  
  return Object.entries(grouped).sort((a, b) => 
    new Date(b[0]) - new Date(a[0])
  );
};

export const calculateSummary = (transactions) => {
  const summary = {
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    categoryBreakdown: {},
    divisionBreakdown: { personal: 0, office: 0 },
  };
  
  transactions.forEach(transaction => {
    const amount = parseFloat(transaction.amount) || 0;
    
    if (transaction.type === 'income') {
      summary.totalIncome += amount;
    } else {
      summary.totalExpense += amount;
    }
    
    // Category breakdown
    if (!summary.categoryBreakdown[transaction.category]) {
      summary.categoryBreakdown[transaction.category] = 0;
    }
    summary.categoryBreakdown[transaction.category] += amount;
    
    // Division breakdown
    if (transaction.division && summary.divisionBreakdown.hasOwnProperty(transaction.division)) {
      summary.divisionBreakdown[transaction.division] += amount;
    }
  });
  
  summary.balance = summary.totalIncome - summary.totalExpense;
  
  return summary;
};
