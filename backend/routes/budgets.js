const express = require('express')
const router = express.Router()

const Budget = require('../models/Budget')
const authMiddleware = require('../middleware/authMiddleware')

// ==========================================
// CREATE OR UPDATE MONTHLY BUDGET
// ==========================================

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { month, amount } = req.body

    if (!month || amount === undefined) {
      return res.status(400).json({
        message: 'Month and budget amount are required.'
      })
    }

    if (Number(amount) < 0) {
      return res.status(400).json({
        message: 'Budget amount cannot be negative.'
      })
    }

    const budget = await Budget.findOneAndUpdate(
      {
        user: req.userId,
        month
      },
      {
        user: req.userId,
        month,
        amount: Number(amount)
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    )

    res.status(200).json({
      message: 'Budget saved successfully.',
      budget
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to save budget.'
    })
  }
})

// ==========================================
// GET BUDGET FOR A MONTH
// ==========================================

router.get('/:month', authMiddleware, async (req, res) => {
  try {
    const budget = await Budget.findOne({
      user: req.userId,
      month: req.params.month
    })

    res.status(200).json({
      budget
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      message: 'Unable to load budget.'
    })
  }
})

module.exports = router