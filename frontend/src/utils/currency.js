export const currencies = [
  {
    code: 'EUR',
    symbol: '€',
    name: 'Euro'
  },
  {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar'
  },
  {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound'
  },
  {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee'
  },
  {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar'
  },
  {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar'
  }
]

export const getCurrency = () => {
  return localStorage.getItem('currency') || 'EUR'
}

export const setCurrency = (currency) => {
  localStorage.setItem('currency', currency)
}

export const getCurrencySymbol = (currencyCode) => {
  const currency = currencies.find(
    (item) => item.code === currencyCode
  )

  return currency ? currency.symbol : '€'
}