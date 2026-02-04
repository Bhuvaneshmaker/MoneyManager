import React, { useState, useEffect } from 'react';
import { Plus, BarChart3, History, TrendingUp } from 'lucide-react';
import AddTransactionModal from './components/AddTransactionModal';
import Dashboard from './components/Dashboard';
import TransactionHistory from './components/TransactionHistory';
import FilterPanel from './components/FilterPanel';
import { transactionAPI } from './services/api';
import { calculateSummary, getDateRange } from './utils/helpers';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [period, setPeriod] = useState('monthly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    filterByPeriod();
  }, [transactions, period]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await transactionAPI.getAll();
      setTransactions(response.data);
    } catch (err) {
      setError('Failed to fetch transactions. Please check if the backend is running.');
      console.error('Error fetching transactions:', err);
      // Set empty array if backend is not available
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const filterByPeriod = () => {
    const { start, end } = getDateRange(period);
    const filtered = transactions.filter(transaction => {
      const txDate = new Date(transaction.date);
      return txDate >= start && txDate <= end;
    });
    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      if (editTransaction) {
        await transactionAPI.update(editTransaction._id, transactionData);
      } else {
        await transactionAPI.create(transactionData);
      }
      await fetchTransactions();
      setIsModalOpen(false);
      setEditTransaction(null);
    } catch (err) {
      console.error('Error saving transaction:', err);
      alert('Failed to save transaction. Please try again.');
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await transactionAPI.delete(id);
      await fetchTransactions();
    } catch (err) {
      console.error('Error deleting transaction:', err);
      alert('Failed to delete transaction. Please try again.');
    }
  };

  const handleFilter = async (filters) => {
    try {
      const params = {};
      if (filters.type) params.type = filters.type;
      if (filters.category) params.category = filters.category;
      if (filters.division) params.division = filters.division;
      if (filters.startDate && filters.endDate) {
        params.startDate = filters.startDate;
        params.endDate = filters.endDate;
      }

      if (Object.keys(params).length > 0) {
        const response = await transactionAPI.getFiltered(params);
        setFilteredTransactions(response.data);
      } else {
        filterByPeriod();
      }
    } catch (err) {
      console.error('Error filtering transactions:', err);
    }
  };

  const handleResetFilter = () => {
    filterByPeriod();
  };

  const summary = calculateSummary(filteredTransactions);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <TrendingUp size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Money Manager</h1>
                <p className="text-blue-100 text-sm">Track your finances easily</p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditTransaction(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition shadow-md"
            >
              <Plus size={20} />
              Add Transaction
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === 'dashboard'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <BarChart3 size={20} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition ${
                  activeTab === 'history'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <History size={20} />
                History
              </button>
            </div>

            <div className="flex items-center gap-4">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
              {activeTab === 'history' && (
                <FilterPanel onFilter={handleFilter} onReset={handleResetFilter} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
            <p className="text-sm mt-2">
              Make sure the backend server is running at http://localhost:5000
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard
                transactions={filteredTransactions}
                period={period}
                summary={summary}
              />
            )}

            {activeTab === 'history' && (
              <TransactionHistory
                transactions={filteredTransactions}
                onEdit={handleEditTransaction}
                onDelete={handleDeleteTransaction}
              />
            )}
          </>
        )}
      </main>

      {/* Modal */}
      <AddTransactionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditTransaction(null);
        }}
        onSubmit={handleAddTransaction}
        editTransaction={editTransaction}
      />

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600 text-sm">
           Bhuvanesh © 2026 Money Manager. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;



// Error

// Failed to fetch transactions. Please check if the backend is running.

// Make sure the backend server is running at http://localhost:5000