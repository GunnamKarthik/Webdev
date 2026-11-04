import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {
  getCurrency,
  getCurrencySymbol
} from '../utils/currency'
import './Budget.css'

function Budget() {
  const currentMonth = new Date().toISOString().slice(0, 7)

  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [budgetAmount, setBudgetAmount] = useState('')
  const [transactions, setTransactions] = useState([])
  const selectedCurrency = getCurrency()
  const currencySymbol = getCurrencySymbol(selectedCurrency)

  // ==========================================
  // LOAD BUDGET FOR SELECTED MONTH
  // ==========================================

  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        `http://localhost:5000/api/budgets/${selectedMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (response.ok) {
        if (data.budget) {
          setBudgetAmount(data.budget.amount)
        } else {
          setBudgetAmount('')
        }
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Error loading budget:', error)
    }
  }

  // ==========================================
  // LOAD TRANSACTIONS
  // ==========================================

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        'http://localhost:5000/api/transactions',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (response.ok) {
        setTransactions(data.transactions)
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        console.error(data.message)
      }
    } catch (error) {
      console.error('Error loading transactions:', error)
    }
  }

  // ==========================================
  // SAVE OR UPDATE BUDGET
  // ==========================================

  const handleSaveBudget = async () => {
    try {
      if (!budgetAmount || Number(budgetAmount) <= 0) {
        alert('Please enter a valid budget amount.')
        return
      }

      const token = localStorage.getItem('token')

      const response = await fetch(
        'http://localhost:5000/api/budgets',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            month: selectedMonth,
            amount: Number(budgetAmount)
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        setBudgetAmount(data.budget.amount)
        alert('Budget saved successfully.')
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        alert(data.message || 'Unable to save budget.')
      }
    } catch (error) {
      console.error('Error saving budget:', error)
      alert('Unable to save budget.')
    }
  }

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    fetchBudget()
  }, [selectedMonth])

  useEffect(() => {
    fetchTransactions()
  }, [])

  // ==========================================
  // CALCULATE MONTHLY BUDGET PROGRESS
  // ==========================================

  const monthlyExpenses = transactions
    .filter((transaction) => {
      const transactionMonth = new Date(transaction.date)
        .toISOString()
        .slice(0, 7)

      return (
        transaction.type === 'expense' &&
        transactionMonth === selectedMonth
      )
    })
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    )

  const budget = Number(budgetAmount) || 0

  const remainingBudget = budget - monthlyExpenses

  const budgetUsed =
    budget > 0
      ? Math.min((monthlyExpenses / budget) * 100, 100)
      : 0

  return (
    <>
      <Navbar />

      <div className="budget-page">

        <div className="budget-header">

          <div>
            <h1>Monthly Budget</h1>

            <p>
              Set a spending limit and keep track of your monthly expenses.
            </p>
          </div>

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />

        </div>

        <div className="budget-form-card">

          <h2>Set Your Budget</h2>

          <label>
            Monthly Budget Amount
          </label>

          <div className="budget-input-group">

            <span>{currencySymbol}</span>

            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Enter budget amount"
              value={budgetAmount}
              onChange={(e) => setBudgetAmount(e.target.value)}
            />

          </div>

          <button
            type="button"
            onClick={handleSaveBudget}
          >
            Save Budget
          </button>

        </div>

        {/* BUDGET SUMMARY */}

        <div className="budget-summary">

          <div className="budget-stat-card">
            <p>Monthly Budget</p>
            <h3>{currencySymbol}{budget.toFixed(2)}</h3>
          </div>

          <div className="budget-stat-card">
            <p>Spent</p>
            <h3>{currencySymbol}{monthlyExpenses.toFixed(2)}</h3>
          </div>

          <div className="budget-stat-card">
            <p>Remaining</p>

            <h3>
              {currencySymbol}{remainingBudget.toFixed(2)}
            </h3>
          </div>

        </div>

        {/* BUDGET PROGRESS */}

        <div className="budget-progress-card">

          <div className="budget-progress-heading">

            <h2>Budget Progress</h2>

            <span>
              {budgetUsed.toFixed(0)}% Used
            </span>

          </div>

          <div className="budget-progress-bar">

            <div
              className="budget-progress-value"
              style={{
                width: `${budgetUsed}%`
              }}
            ></div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Budget