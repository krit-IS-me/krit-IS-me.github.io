import { useState } from 'react'
import './App.css'

function App() {
  const [price, setPrice] = useState(0)
  const [discount, setDiscount] = useState(0)

  const discountedPrice = price - discount
  const vat = discountedPrice > 0 ? discountedPrice * 0.07 : 0
  const total = discountedPrice > 0 ? discountedPrice + vat : 0

  return (
    <div className="vat-calculator">
      <h1>VAT Calculator</h1>
      <div className="input-group">
        <label>
          Price:
          <input
            type="number"
            value={price}
            min="0"
            onChange={e => setPrice(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="input-group">
        <label>
          Discount:
          <input
            type="number"
            value={discount}
            min="0"
            max={price}
            onChange={e => setDiscount(Number(e.target.value))}
          />
        </label>
      </div>
      <div className="results">
        <p>VAT (7%): <strong>{vat.toFixed(2)}</strong></p>
        <p>Total: <strong>{total.toFixed(2)}</strong></p>
      </div>
    </div>
  )
}

export default App
