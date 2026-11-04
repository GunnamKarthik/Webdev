import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react'
import {
  getCurrency,
  getCurrencySymbol
} from '../utils/currency'
import './Transactions.css'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Transactions() {
  const [type, setType] = useState('expense')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [transactions, setTransactions] = useState([])
  const [editingId, setEditingId] = useState(null)

  // ==========================================
  // CURRENCY
  // ==========================================

  const selectedCurrency = getCurrency()
  const currencySymbol = getCurrencySymbol(selectedCurrency)

  // ==========================================
  // FETCH TRANSACTIONS
  // ==========================================

  const fetchTransactions = async () => {
    const token = localStorage.getItem('token')

    try {
      const response = await fetch(
        `${API_URL}/api/transactions`,
        {
          method: 'GET',
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
      console.error(error)
      alert('Unable to load transactions.')
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // ==========================================
  // ADD OR UPDATE TRANSACTION
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')

    try {
      const url = editingId
        ? `${API_URL}/api/transactions/${editingId}`
        : `${API_URL}/api/transactions`

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          type,
          category,
          amount: Number(amount),
          description,
          date
        })
      })

      const data = await response.json()

      if (response.ok) {
        alert(
          editingId
            ? 'Transaction updated successfully!'
            : 'Transaction added successfully!'
        )

        resetForm()
        fetchTransactions()
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    }
  }

  // ==========================================
  // EDIT TRANSACTION
  // ==========================================

  const handleEdit = (transaction) => {
    setEditingId(transaction._id)
    setType(transaction.type)
    setCategory(transaction.category)
    setAmount(transaction.amount)
    setDescription(transaction.description || '')
    setDate(transaction.date.split('T')[0])

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // ==========================================
  // DELETE TRANSACTION
  // ==========================================

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token')

    const confirmDelete = window.confirm(
      'Are you sure you want to delete this transaction?'
    )

    if (!confirmDelete) return

    try {
      const response = await fetch(
        `${API_URL}/api/transactions/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Transaction deleted successfully!')
        fetchTransactions()
      } else if (response.status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    }
  }

  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {
    setType('expense')
    setCategory('')
    setAmount('')
    setDescription('')
    setDate('')
    setEditingId(null)
  }

  // ==========================================
  // SUMMARY CALCULATIONS
  // ==========================================

  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  const totalExpenses = transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  const balance = totalIncome - totalExpenses

  return (
    <>
      <Navbar />

      <div className="transactions-page">

        <div className="transactions-container">

          {/* HEADER */}

          <div className="transactions-header">

            <div>

              <p className="page-label">
                SMARTSPEND
              </p>

              <h1>
                Transactions
              </h1>

              <p className="page-subtitle">
                Track your income and expenses in one place.
              </p>

            </div>

            <div className="header-badge">
              {transactions.length} Transactions
            </div>

          </div>

          {/* SUMMARY */}

          <div className="summary-grid">

            <div className="summary-card balance-summary">

              <div className="summary-icon">
                {currencySymbol}
              </div>

              <div>

                <p>
                  Current Balance
                </p>

                <h2>
                  {currencySymbol}
                  {balance.toFixed(2)}
                </h2>

              </div>

            </div>

            <div className="summary-card income-summary">

              <div className="summary-icon">
                ↑
              </div>

              <div>

                <p>
                  Total Income
                </p>

                <h2>
                  {currencySymbol}
                  {totalIncome.toFixed(2)}
                </h2>

              </div>

            </div>

            <div className="summary-card expense-summary">

              <div className="summary-icon">
                ↓
              </div>

              <div>

                <p>
                  Total Expenses
                </p>

                <h2>
                  {currencySymbol}
                  {totalExpenses.toFixed(2)}
                </h2>

              </div>

            </div>

          </div>

          {/* FORM */}

          <div className="transaction-form-card">

            <div className="section-heading">

              <div>

                <h2>
                  {editingId
                    ? 'Edit Transaction'
                    : 'Add New Transaction'}
                </h2>

                <p>
                  {editingId
                    ? 'Update the transaction information below.'
                    : 'Enter your transaction details below.'}
                </p>

              </div>

              {editingId && (

                <button
                  type="button"
                  className="cancel-edit-button"
                  onClick={resetForm}
                >
                  Cancel Edit
                </button>

              )}

            </div>

            <form onSubmit={handleSubmit}>

              <div className="form-grid">

                <div className="form-field">

                  <label>
                    Transaction Type
                  </label>

                  <select
                    value={type}
                    onChange={(e) =>
                      setType(e.target.value)
                    }
                  >

                    <option value="expense">
                      Expense
                    </option>

                    <option value="income">
                      Income
                    </option>

                  </select>

                </div>

                <div className="form-field">

                  <label>
                    Category
                  </label>

                  <input
                    type="text"
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value)
                    }
                    placeholder="e.g. Food, Rent, Salary"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Amount ({currencySymbol})
                  </label>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) =>
                      setAmount(e.target.value)
                    }
                    placeholder="0.00"
                    min="0.01"
                    step="0.01"
                    required
                  />

                </div>

                <div className="form-field">

                  <label>
                    Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    required
                  />

                </div>

                <div className="form-field full-width">

                  <label>
                    Description
                  </label>

                  <input
                    type="text"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    placeholder="Add a short description"
                  />

                </div>

              </div>

              <button
                type="submit"
                className="transaction-submit"
              >

                {editingId
                  ? 'Save Changes'
                  : '+ Add Transaction'}

              </button>

            </form>

          </div>

          {/* TRANSACTIONS */}

          <div className="transactions-list">

            <div className="list-heading">

              <div>

                <h2>
                  Recent Transactions
                </h2>

                <p>
                  Your latest income and expenses.
                </p>

              </div>

            </div>

            {transactions.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  {currencySymbol}
                </div>

                <h3>
                  No transactions yet
                </h3>

                <p>
                  Add your first transaction using the form above.
                </p>

              </div>

            ) : (

              <div className="transaction-grid">

                {transactions.map((transaction) => (

                  <div
                    key={transaction._id}
                    className={`transaction-card ${transaction.type}`}
                  >

                    <div className="transaction-card-header">

                      <span
                        className={`type-badge ${transaction.type}`}
                      >

                        {transaction.type === 'income'
                          ? 'Income'
                          : 'Expense'}

                      </span>

                      <span className="transaction-date">

                        {new Date(
                          transaction.date
                        ).toLocaleDateString(
                          'en-IE',
                          {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          }
                        )}

                      </span>

                    </div>

                    <div className="transaction-main">

                      <p className="transaction-category">
                        {transaction.category}
                      </p>

                      <h3
                        className={`transaction-amount ${transaction.type}`}
                      >

                        {transaction.type === 'income'
                          ? '+'
                          : '-'}

                        {currencySymbol}
                        {transaction.amount.toFixed(2)}

                      </h3>

                      <p className="transaction-description">

                        {transaction.description ||
                          'No description'}

                      </p>

                    </div>

                    <div className="transaction-actions">

                      <button
                        type="button"
                        className="edit-button"
                        onClick={() =>
                          handleEdit(transaction)
                        }
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          handleDelete(
                            transaction._id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </div>
    </>
  )
}

export default Transactions