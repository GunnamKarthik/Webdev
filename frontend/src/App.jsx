import Transactions from './pages/Transactions'
import Dashboard from './pages/Dashboard'
import Budget from './pages/Budget'
import ProtectedRoute from './components/ProtectedRoute'
import { Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function Home() {
  return (
    <div className="app">

      <nav className="navbar">

        <div className="logo">
          Smart<span>Spend</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>

          <Link to="/login">
            <button className="login-btn">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="signup-btn">
              Sign Up
            </button>
          </Link>
        </div>

      </nav>

      <main className="hero" id="home">

        <div className="hero-text">

          <p className="tagline">
            SMART STUDENT BUDGETING
          </p>

          <h1>
            Take control of your
            <span> money.</span>
          </h1>

          <p className="hero-description">
            Track your income, manage expenses, create monthly budgets
            and understand where your money goes with SmartSpend.
          </p>

          <div className="hero-buttons">

            <Link to="/register">
              <button className="primary-btn">
                Get Started
              </button>
            </Link>

            <button className="secondary-btn">
              Learn More
            </button>

          </div>

        </div>

        <div className="summary-card">

          <p className="card-title">
            Monthly Overview
          </p>

          <div className="balance">
            <p>Available Balance</p>
            <h2>€1,240.00</h2>
          </div>

          <div className="money-row">

            <div>
              <p>Income</p>
              <strong className="income">
                €1,850
              </strong>
            </div>

            <div>
              <p>Expenses</p>
              <strong className="expense">
                €610
              </strong>
            </div>

          </div>

          <div className="budget">

            <div className="budget-heading">
              <span>Monthly Budget</span>
              <span>61%</span>
            </div>

            <div className="progress">
              <div className="progress-value"></div>
            </div>

          </div>

        </div>

      </main>

    </div>
  )
}

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/budget"
        element={
          <ProtectedRoute>
            <Budget />
          </ProtectedRoute>
        }
      />

    </Routes>
  )
}

export default App