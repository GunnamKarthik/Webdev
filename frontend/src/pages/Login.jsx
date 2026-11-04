import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email,
            password
          })
        }
      )

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)

        alert('Login successful!')

        navigate('/dashboard')
      } else {
        alert(data.message)
      }

    } catch (error) {
      console.error(error)

      alert('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="login-page">

      <div className="login-container">

        <Link to="/" className="login-logo">
          Smart<span>Spend</span>
        </Link>

        <div className="login-card">

          <h1>Welcome back</h1>

          <p className="login-subtitle">
            Sign in to continue managing your finances.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

            </div>

            <button
              type="submit"
              className="login-submit"
            >
              Sign In
            </button>

          </form>

          <p className="register-text">
            Don't have an account?{' '}
            <Link to="/register">
              Create account
            </Link>
          </p>

        </div>

      </div>

    </div>
  )
}

export default Login