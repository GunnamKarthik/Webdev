import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Register.css'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check whether both passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }

    try {
      // Send registration information to the backend
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        alert('Account created successfully!')

        // Redirect user to login page
        navigate('/login')
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.error(error)
      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="register-page">

      <div className="register-container">

        <Link to="/" className="register-logo">
          Smart<span>Spend</span>
        </Link>

        <div className="register-card">

          <h1>Create your account</h1>

          <p className="register-subtitle">
            Start managing your money smarter with SmartSpend.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="name">
                Full Name
              </label>

              <input
                type="text"
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-email">
                Email Address
              </label>

              <input
                type="email"
                id="register-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="register-password">
                Password
              </label>

              <input
                type="password"
                id="register-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="7"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">
                Confirm Password
              </label>

              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength="7"
                required
              />
            </div>

            <button
              type="submit"
              className="register-submit"
            >
              Create Account
            </button>

          </form>

          <p className="login-text">
            Already have an account?{' '}
            <Link to="/login">
              Sign in
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Register