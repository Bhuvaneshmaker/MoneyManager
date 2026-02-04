import React, { useState } from 'react';
import { Edit2, Trash2, Clock, AlertCircle } from 'lucide-react';
import { formatCurrency, formatDateTime, canEdit, groupTransactionsByDate } from '../utils/helpers';
import { CATEGORIES } from '../utils/constants';

const TransactionHistory = ({ transactions, onEdit, onDelete }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const groupedTransactions = groupTransactionsByDate(transactions);

  const getCategoryIcon = (type, category) => {
    const categories = type === 'income' ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;
    const cat = categories.find(c => c.value === category);
    return cat?.icon || '➕';
  };

  const handleDelete = (transaction) => {
    setDeleteConfirm(transaction._id);
  };

  const confirmDelete = (id) => {
    onDelete(id);
    setDeleteConfirm(null);
  };

  if (!transactions || transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <AlertCircle size={48} className="mb-4" />
          <p className="text-lg">No transactions found</p>
          <p className="text-sm mt-2">Add your first transaction to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {groupedTransactions.map(([date, txns]) => (
        <div key={date} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b">
            <h3 className="font-semibold text-gray-700">{date}</h3>
          </div>
          <div className="divide-y">
            {txns.map((transaction) => {
              const isEditable = canEdit(transaction.date);
              
              return (
                <div
                  key={transaction._id}
                  className="p-4 hover:bg-gray-50 transition"
                >
                  {deleteConfirm === transaction._id ? (
                    <div className="flex items-center justify-between bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="text-red-500" size={20} />
                        <p className="text-sm text-red-700">Delete this transaction?</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => confirmDelete(transaction._id)}
                          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                            transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                          }`}
                        >
                          {getCategoryIcon(transaction.type, transaction.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-800">
                              {transaction.description}
                            </h4>
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                transaction.division === 'office'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-purple-100 text-purple-700'
                              }`}
                            >
                              {transaction.division}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <p className="text-sm text-gray-500 capitalize">
                              {transaction.category}
                            </p>
                            <p className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={12} />
                              {formatDateTime(transaction.date)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p
                          className={`text-xl font-bold ${
                            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                          }`}
                        >
                          {transaction.type === 'income' ? '+' : '-'}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <div className="flex gap-2">
                          {isEditable ? (
                            <>
                              <button
                                onClick={() => onEdit(transaction)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Edit transaction"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(transaction)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                title="Delete transaction"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          ) : (
                            <div className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full">
                              Locked
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistory;
