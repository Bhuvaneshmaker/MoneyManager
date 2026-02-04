import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { CATEGORIES, DIVISIONS, TRANSACTION_TYPES } from '../utils/constants';

const AddTransactionModal = ({ isOpen, onClose, onSubmit, editTransaction }) => {
  const [activeTab, setActiveTab] = useState('income');
  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    description: '',
    category: '',
    division: 'personal',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
  });

  useEffect(() => {
    if (editTransaction) {
      const txDate = new Date(editTransaction.date);
      setActiveTab(editTransaction.type);
      setFormData({
        type: editTransaction.type,
        amount: editTransaction.amount.toString(),
        description: editTransaction.description,
        category: editTransaction.category,
        division: editTransaction.division || 'personal',
        date: txDate.toISOString().split('T')[0],
        time: txDate.toTimeString().split(' ')[0].substring(0, 5),
      });
    }
  }, [editTransaction]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFormData({
      ...formData,
      type: tab,
      category: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const dateTime = new Date(`${formData.date}T${formData.time}`);
    
    const transactionData = {
      type: formData.type,
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      division: formData.division,
      date: dateTime.toISOString(),
    };

    onSubmit(transactionData);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'income',
      amount: '',
      description: '',
      category: '',
      division: 'personal',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    });
    setActiveTab('income');
  };

  if (!isOpen) return null;

  const categories = activeTab === 'income' ? CATEGORIES.INCOME : CATEGORIES.EXPENSE;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={() => {
              onClose();
              resetForm();
            }}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex border-b">
          <button
            onClick={() => handleTabChange('income')}
            className={`flex-1 py-3 text-center font-semibold transition ${
              activeTab === 'income'
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Income
          </button>
          <button
            onClick={() => handleTabChange('expense')}
            className={`flex-1 py-3 text-center font-semibold transition ${
              activeTab === 'expense'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Expense
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.icon} {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Division *
            </label>
            <select
              name="division"
              value={formData.division}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DIVISIONS.map((div) => (
                <option key={div.value} value={div.value}>
                  {div.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time *
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                onClose();
                resetForm();
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 px-4 py-2 rounded-lg text-white transition ${
                activeTab === 'income'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {editTransaction ? 'Update' : 'Add'} {activeTab === 'income' ? 'Income' : 'Expense'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
