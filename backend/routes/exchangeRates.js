const express = require('express')

const router = express.Router()

router.get('/:currency', async (req, res) => {
  try {
    const currency = req.params.currency.toUpperCase()

    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/EUR`
    )

    const data = await response.json()

    if (data.result !== 'success') {
      return res.status(500).json({
        message: 'Unable to get exchange rate'
      })
    }

    const rate = data.conversion_rates[currency]

    if (!rate) {
      return res.status(400).json({
        message: 'Currency not supported'
      })
    }

    res.json({
      base: 'EUR',
      currency: currency,
      rate: rate
    })
  } catch (error) {
    console.error('Exchange rate error:', error)

    res.status(500).json({
      message: 'Failed to fetch exchange rate'
    })
  }
})

module.exports = router