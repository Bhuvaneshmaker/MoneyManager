const express = require('express');
const router = express.Router();
const { body, validationResult, query } = require('express-validator');
const Transaction = require('../models/Transaction');

// Validation middleware
const validateTransaction = [
  body('type').isIn(['income', 'expense']).withMessage('Type must be income or expense'),
  body('amount').isFloat({ min: 0 }).withMessage('Amount must be a positive number'),
  body('description').notEmpty().trim().withMessage('Description is required'),
  body('category').notEmpty().trim().withMessage('Category is required'),
  body('division').isIn(['personal', 'office']).withMessage('Division must be personal or office'),
  body('date').optional().isISO8601().withMessage('Invalid date format'),
];

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/transactions/filter
// @desc    Get filtered transactions
// @access  Public
router.get('/filter', async (req, res) => {
  try {
    const { type, category, division, startDate, endDate } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (division) filter.division = division;
    
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/transactions/summary
// @desc    Get transaction summary
// @access  Public
router.get('/summary', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const filter = {};

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const transactions = await Transaction.find(filter);

    const summary = {
      totalIncome: 0,
      totalExpense: 0,
      balance: 0,
      categoryBreakdown: {},
      divisionBreakdown: { personal: 0, office: 0 },
      transactionCount: transactions.length,
    };

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amount;
      } else {
        summary.totalExpense += transaction.amount;
      }

      if (!summary.categoryBreakdown[transaction.category]) {
        summary.categoryBreakdown[transaction.category] = 0;
      }
      summary.categoryBreakdown[transaction.category] += transaction.amount;

      if (transaction.division) {
        summary.divisionBreakdown[transaction.division] += transaction.amount;
      }
    });

    summary.balance = summary.totalIncome - summary.totalExpense;

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/transactions/date-range
// @desc    Get transactions by date range
// @access  Public
router.get('/date-range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const transactions = await Transaction.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).sort({ date: -1 });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   GET /api/transactions/:id
// @desc    Get transaction by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   POST /api/transactions
// @desc    Create new transaction
// @access  Public
router.post('/', validateTransaction, async (req, res) => {
  try {
    // Log incoming payload for debugging
    console.log('Create transaction payload:', JSON.stringify(req.body));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { type, amount, description, category, division, date } = req.body;
    // Defensive input checks
    const parsedAmount = Number(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    const txCategory = category ? String(category).toLowerCase() : undefined;

    const transaction = new Transaction({
      type,
      amount: parsedAmount,
      description,
      category: txCategory,
      division,
      date: date || new Date(),
    });

    const savedTransaction = await transaction.save();
    return res.status(201).json(savedTransaction);
  } catch (error) {
    // Log full error stack to server console for diagnosis
    console.error('Create transaction error:', error.stack || error);

    // Handle Mongoose validation errors with 400 response
    if (error.name === 'ValidationError') {
      const details = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      return res.status(400).json({ message: 'Validation failed', errors: details });
    }

    // Handle duplicate key / Mongo errors
    if (error.name === 'MongoError') {
      return res.status(500).json({ message: 'Database error', error: error.message });
    }

    return res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update transaction
// @access  Public
router.put('/:id', validateTransaction, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if transaction can be edited (within 12 hours)
    const hoursDiff = (new Date() - new Date(transaction.date)) / (1000 * 60 * 60);
    if (hoursDiff > 12) {
      return res.status(403).json({ 
        message: 'Cannot edit transaction after 12 hours' 
      });
    }

    const { type, amount, description, category, division, date } = req.body;

    transaction.type = type;
    transaction.amount = amount;
    transaction.description = description;
    transaction.category = category.toLowerCase();
    transaction.division = division;
    transaction.date = date || transaction.date;

    const updatedTransaction = await transaction.save();
    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Check if transaction can be deleted (within 12 hours)
    const hoursDiff = (new Date() - new Date(transaction.date)) / (1000 * 60 * 60);
    if (hoursDiff > 12) {
      return res.status(403).json({ 
        message: 'Cannot delete transaction after 12 hours' 
      });
    }

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
