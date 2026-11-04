import { useEffect, useState } from 'react'

import {
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

import './Dashboard.css'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
import Navbar from '../components/Navbar'

import {
  getCurrency,
  getCurrencySymbol
} from '../utils/currency'

function Dashboard() {
  const [transactions, setTransactions] = useState([])

  // ==========================================
  // CURRENCY
  // ==========================================

  const selectedCurrency = getCurrency()
  const currencySymbol = getCurrencySymbol(selectedCurrency)

  // ==========================================
  // DEFAULT SELECTED MONTH
  // ==========================================

  const currentDate = new Date()

  const [selectedMonth, setSelectedMonth] = useState(
    `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, '0')}`
  )

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
      console.error(
        'Unable to load transactions:',
        error
      )
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // ==========================================
  // FILTER TRANSACTIONS BY SELECTED MONTH
  // ==========================================

  const monthlyTransactions = transactions.filter(
    (transaction) => {
      const transactionDate = new Date(transaction.date)

      const transactionMonth =
        `${transactionDate.getFullYear()}-${String(
          transactionDate.getMonth() + 1
        ).padStart(2, '0')}`

      return transactionMonth === selectedMonth
    }
  )

  // ==========================================
  // MONTHLY INCOME
  // ==========================================

  const monthlyIncome = monthlyTransactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  // ==========================================
  // MONTHLY EXPENSES
  // ==========================================

  const monthlyExpenses = monthlyTransactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  // ==========================================
  // MONTHLY BALANCE
  // ==========================================

  const monthlyBalance =
    monthlyIncome - monthlyExpenses

  // ==========================================
  // OVERALL INCOME
  // ==========================================

  const overallIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === 'income'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  // ==========================================
  // OVERALL EXPENSES
  // ==========================================

  const overallExpenses = transactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    )

  // ==========================================
  // OVERALL BALANCE
  // ==========================================

  const overallBalance =
    overallIncome - overallExpenses

  // ==========================================
  // INCOME VS EXPENSE CHART DATA
  // ==========================================

  const incomeExpenseData = [
    {
      name: 'Income',
      amount: monthlyIncome
    },
    {
      name: 'Expenses',
      amount: monthlyExpenses
    }
  ]

  // ==========================================
  // EXPENSES BY CATEGORY DATA
  // ==========================================

  const expenseCategoryMap = {}

  monthlyTransactions
    .filter(
      (transaction) =>
        transaction.type === 'expense'
    )
    .forEach((transaction) => {
      const category = transaction.category

      if (expenseCategoryMap[category]) {
        expenseCategoryMap[category] +=
          transaction.amount
      } else {
        expenseCategoryMap[category] =
          transaction.amount
      }
    })

  const expenseCategoryData = Object.entries(
    expenseCategoryMap
  ).map(([name, amount]) => ({
    name,
    amount
  }))

  // ==========================================
  // PIE CHART COLORS
  // ==========================================

  const categoryColors = [
    '#0f766e',
    '#2563eb',
    '#d97706',
    '#7c3aed',
    '#dc2626',
    '#0891b2'
  ]

  // ==========================================
  // FORMAT SELECTED MONTH
  // ==========================================

  const formatSelectedMonth = () => {
    const [year, month] = selectedMonth.split('-')

    const date = new Date(
      Number(year),
      Number(month) - 1
    )

    return date.toLocaleDateString('en-IE', {
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-page">

        <div className="dashboard-container">

          {/* HEADER */}

          <div className="dashboard-header">

            <div>

              <p className="dashboard-label">
                SMARTSPEND
              </p>

              <h1>Dashboard</h1>

              <p className="dashboard-subtitle">
                Track and understand your monthly finances.
              </p>

            </div>

            <div className="month-selector">

              <label>
                View Month
              </label>

              <input
                type="month"
                value={selectedMonth}
                onChange={(e) =>
                  setSelectedMonth(e.target.value)
                }
              />

            </div>

          </div>

          {/* SELECTED MONTH */}

          <div className="selected-month-heading">

            <p>
              Financial overview for
            </p>

            <h2>
              {formatSelectedMonth()}
            </h2>

          </div>

          {/* MONTHLY SUMMARY */}

          <div className="dashboard-summary">

            {/* MONTHLY BALANCE */}

            <div className="dashboard-summary-card balance-card">

              <div className="dashboard-icon">
                {currencySymbol}
              </div>

              <div>

                <p>
                  Monthly Balance
                </p>

                <h2>
                  {currencySymbol}
                  {monthlyBalance.toFixed(2)}
                </h2>

              </div>

            </div>

            {/* MONTHLY INCOME */}

            <div className="dashboard-summary-card income-card">

              <div className="dashboard-icon">
                ↑
              </div>

              <div>

                <p>
                  Monthly Income
                </p>

                <h2>
                  {currencySymbol}
                  {monthlyIncome.toFixed(2)}
                </h2>

              </div>

            </div>

            {/* MONTHLY EXPENSES */}

            <div className="dashboard-summary-card expense-card">

              <div className="dashboard-icon">
                ↓
              </div>

              <div>

                <p>
                  Monthly Expenses
                </p>

                <h2>
                  {currencySymbol}
                  {monthlyExpenses.toFixed(2)}
                </h2>

              </div>

            </div>

            {/* OVERALL BALANCE */}

            <div className="dashboard-summary-card overall-card">

              <div className="dashboard-icon">
                {currencySymbol}
              </div>

              <div>

                <p>
                  Overall Balance
                </p>

                <h2>
                  {currencySymbol}
                  {overallBalance.toFixed(2)}
                </h2>

              </div>

            </div>

          </div>

          {/* INCOME VS EXPENSES */}

          <div className="dashboard-chart-section">

            <div className="chart-header">

              <div>

                <h2>
                  Income vs Expenses
                </h2>

                <p>
                  Financial comparison for{' '}
                  {formatSelectedMonth()}.
                </p>

              </div>

            </div>

            <div className="chart-container">

              <ResponsiveContainer
                width="100%"
                height={300}
              >

                <BarChart
                  data={incomeExpenseData}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    axisLine={false}
                    tickLine={false}
                  />

                  <Tooltip
                    formatter={(value) => [
                      `${currencySymbol}${Number(value).toFixed(2)}`,
                      'Amount'
                    ]}
                  />

                  <Bar
                    dataKey="amount"
                    radius={[8, 8, 0, 0]}
                    barSize={70}
                  >

                    {incomeExpenseData.map((entry) => (

                      <Cell
                        key={entry.name}
                        fill={
                          entry.name === 'Income'
                            ? '#22a06b'
                            : '#e05252'
                        }
                      />

                    ))}

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* EXPENSES BY CATEGORY */}

          <div className="dashboard-chart-section">

            <div className="chart-header">

              <div>

                <h2>
                  Expenses by Category
                </h2>

                <p>
                  Spending breakdown for{' '}
                  {formatSelectedMonth()}.
                </p>

              </div>

            </div>

            <div className="chart-container">

              {expenseCategoryData.length === 0 ? (

                <div className="dashboard-empty">

                  <div className="dashboard-empty-icon">
                    {currencySymbol}
                  </div>

                  <h3>
                    No expense data
                  </h3>

                  <p>
                    Add expenses for{' '}
                    {formatSelectedMonth()}{' '}
                    to see the category breakdown.
                  </p>

                </div>

              ) : (

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >

                  <PieChart>

                    <Pie
                      data={expenseCategoryData}
                      dataKey="amount"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={105}
                      paddingAngle={3}
                    >

                      {expenseCategoryData.map(
                        (entry, index) => (

                          <Cell
                            key={entry.name}
                            fill={
                              categoryColors[
                                index %
                                categoryColors.length
                              ]
                            }
                          />

                        )
                      )}

                    </Pie>

                    <Tooltip
                      formatter={(value, name) => [
                        `${currencySymbol}${Number(value).toFixed(2)}`,
                        name
                      ]}
                    />

                    <Legend />

                  </PieChart>

                </ResponsiveContainer>

              )}

            </div>

          </div>

          {/* RECENT TRANSACTIONS */}

          <div className="dashboard-content">

            <div className="dashboard-section">

              <div className="dashboard-section-header">

                <div>

                  <h2>
                    Recent Transactions
                  </h2>

                  <p>
                    Transactions from{' '}
                    {formatSelectedMonth()}.
                  </p>

                </div>

                <span className="transaction-count">

                  {monthlyTransactions.length}{' '}
                  Transactions

                </span>

              </div>

              {monthlyTransactions.length === 0 ? (

                <div className="dashboard-empty">

                  <div className="dashboard-empty-icon">
                    {currencySymbol}
                  </div>

                  <h3>
                    No transactions this month
                  </h3>

                  <p>
                    Add an income or expense for{' '}
                    {formatSelectedMonth()}{' '}
                    to see it here.
                  </p>

                </div>

              ) : (

                <div className="recent-transactions">

                  {monthlyTransactions
                    .slice(0, 5)
                    .map((transaction) => (

                      <div
                        className="recent-transaction"
                        key={transaction._id}
                      >

                        <div className="recent-left">

                          <div
                            className={`recent-icon ${transaction.type}`}
                          >

                            {transaction.type === 'income'
                              ? '↑'
                              : '↓'}

                          </div>

                          <div>

                            <h3>
                              {transaction.category}
                            </h3>

                            <p>
                              {transaction.description ||
                                'No description'}
                            </p>

                          </div>

                        </div>

                        <div className="recent-right">

                          <span
                            className={`recent-amount ${transaction.type}`}
                          >

                            {transaction.type === 'income'
                              ? '+'
                              : '-'}

                            {currencySymbol}
                            {transaction.amount.toFixed(2)}

                          </span>

                          <span className="recent-date">

                            {new Date(
                              transaction.date
                            ).toLocaleDateString(
                              'en-IE'
                            )}

                          </span>

                        </div>

                      </div>

                    ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>
    </>
  )
}

export default Dashboard