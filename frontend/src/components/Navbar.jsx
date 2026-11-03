import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  currencies,
  getCurrency,
  setCurrency
} from '../utils/currency'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const [selectedCurrency, setSelectedCurrency] = useState(
    getCurrency()
  )

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value

    setSelectedCurrency(newCurrency)
    setCurrency(newCurrency)

    // Refresh so all pages display the selected currency
    window.location.reload()
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="app-navbar">

      <Link to="/dashboard" className="app-navbar-logo">
        Smart<span>Spend</span>
      </Link>

      <div className="app-navbar-links">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/transactions">
          Transactions
        </Link>

        <Link to="/budget">
          Budget
        </Link>

        <select
          className={`currency-selector currency-${selectedCurrency.toLowerCase()}`}
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          aria-label="Select currency"
        >
          {currencies.map((currency) => (
            <option
              key={currency.code}
              value={currency.code}
              className={`currency-option currency-option-${currency.code.toLowerCase()}`}
            >
              {currency.symbol} {currency.code}
            </option>
          ))}
        </select>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  )
}

export default Navbar