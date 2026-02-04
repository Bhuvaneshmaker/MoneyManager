import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Wallet, Calendar } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';
import { CHART_COLORS } from '../utils/constants';

const Dashboard = ({ transactions, period, summary }) => {
  const generateChartData = () => {
    if (!transactions || transactions.length === 0) return [];

    const dataMap = {};

    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      let key;

      if (period === 'weekly') {
        key = date.toLocaleDateString('en-US', { weekday: 'short' });
      } else if (period === 'monthly') {
        key = date.getDate().toString();
      } else {
        key = date.toLocaleDateString('en-US', { month: 'short' });
      }

      if (!dataMap[key]) {
        dataMap[key] = { name: key, income: 0, expense: 0 };
      }

      if (transaction.type === 'income') {
        dataMap[key].income += transaction.amount;
      } else {
        dataMap[key].expense += transaction.amount;
      }
    });

    return Object.values(dataMap);
  };

  const getCategoryData = () => {
    if (!summary || !summary.categoryBreakdown) return [];

    return Object.entries(summary.categoryBreakdown)
      .map(([category, amount]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: amount,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8);
  };

  const chartData = generateChartData();
  const categoryData = getCategoryData();

  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#14b8a6', '#6366f1'];

  const StatCard = ({ title, amount, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <Icon className={`text-${color}-500`} size={24} />
      </div>
      <p className={`text-2xl font-bold text-${color}-600`}>{formatCurrency(amount)}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          amount={summary?.totalIncome || 0}
          icon={TrendingUp}
          color="green"
          subtitle={`${period} period`}
        />
        <StatCard
          title="Total Expense"
          amount={summary?.totalExpense || 0}
          icon={TrendingDown}
          color="red"
          subtitle={`${period} period`}
        />
        <StatCard
          title="Balance"
          amount={summary?.balance || 0}
          icon={Wallet}
          color={summary?.balance >= 0 ? 'green' : 'red'}
          subtitle="Income - Expense"
        />
        <StatCard
          title="Transactions"
          amount={transactions?.length || 0}
          icon={Calendar}
          color="blue"
          subtitle={`${period} period`}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expense Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Income vs Expense ({period.charAt(0).toUpperCase() + period.slice(1)})
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="income" fill={CHART_COLORS.income} name="Income" />
              <Bar dataKey="expense" fill={CHART_COLORS.expense} name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Trend Analysis
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke={CHART_COLORS.income} strokeWidth={2} name="Income" />
              <Line type="monotone" dataKey="expense" stroke={CHART_COLORS.expense} strokeWidth={2} name="Expense" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Category Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Division Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Division Summary
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Office</p>
                <p className="text-xl font-bold text-blue-600">
                  {formatCurrency(summary?.divisionBreakdown?.office || 0)}
                </p>
              </div>
              <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🏢</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Personal</p>
                <p className="text-xl font-bold text-purple-600">
                  {formatCurrency(summary?.divisionBreakdown?.personal || 0)}
                </p>
              </div>
              <div className="h-16 w-16 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
