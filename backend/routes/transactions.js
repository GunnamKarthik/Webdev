const express = require('express');
const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();


// ==========================================
// CREATE TRANSACTION
// ==========================================

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;

    const newTransaction = new Transaction({
      user: req.userId,
      type,
      category,
      amount,
      description,
      date
    });

    await newTransaction.save();

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: newTransaction
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


// ==========================================
// READ ALL TRANSACTIONS
// ==========================================

router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.userId
    }).sort({ date: -1 });

    res.status(200).json({
      transactions
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


// ==========================================
// UPDATE TRANSACTION
// ==========================================

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { type, category, amount, description, date } = req.body;

    const transaction = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.userId
      },
      {
        type,
        category,
        amount,
        description,
        date
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});
// ==========================================
// DELETE TRANSACTION
// ==========================================

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      });
    }

    res.status(200).json({
      message: 'Transaction deleted successfully'
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


// Export router
module.exports = router;