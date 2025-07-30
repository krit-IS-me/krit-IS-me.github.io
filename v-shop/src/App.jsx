import DataTable from './DataTable.jsx'
import { useRef, useState, useEffect } from 'react'
import accessoryData from './accessory.json'

function App() {
  const quantityRef = useRef()
  const productRef = useRef()

  const [price, setPrice] = useState(accessoryData[0]?.price || 0)
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, name: "Mouse", price: 10, quantity: 2 },
    { id: 2, name: "Keyboard", price: 20, quantity: 1 },
  ])

  const [filteredSelectedItems, setFilteredSelectedItems] = useState(selectedItems)

  // Keep filtered list updated when selectedItems changes
  useEffect(() => {
    setFilteredSelectedItems(selectedItems)
  }, [selectedItems])

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value)
    const product = accessoryData.find(item => item.id === productId)
    if (product) {
      setPrice(product.price)
    } else {
      setPrice(0)
    }
  }

  const handleSubmit = () => {
    const productId = parseInt(productRef.current.value)
    const product = accessoryData.find(item => item.id === productId)
    if (!product) return

    const order = {
      ...product,
      quantity: Number(quantityRef.current.value)
    }

    setSelectedItems([...selectedItems, order])
    setPrice(product.price)
    quantityRef.current.value = ''
  }

  const search = (keyword) => {
    setFilteredSelectedItems(
      selectedItems.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
    )
  }

  const sortAsc = () => {
    const sorted = [...filteredSelectedItems].sort((a, b) => a.name.localeCompare(b.name))
    setFilteredSelectedItems(sorted)
  }

  const sortDesc = () => {
    const sorted = [...filteredSelectedItems].sort((a, b) => b.name.localeCompare(a.name))
    setFilteredSelectedItems(sorted)
  }

  return (
    <>
      <h1>Product Order</h1>

      Product:
      <select ref={productRef} onChange={updatePrice}>
        {accessoryData.map((accessory, index) => (
          <option key={index} value={accessory.id}>
            {accessory.name}
          </option>
        ))}
      </select>
      <br />

      <p>Price: ${price}</p>

      Quantity:
      <input type="number" ref={quantityRef} min="1" />
      <br />

      <button onClick={handleSubmit}>Submit</button>

      <hr />
      <h2>Order Summary</h2>
      <DataTable
        data={filteredSelectedItems}
        onSearch={search}
        onSortAsc={sortAsc}
        onSortDesc={sortDesc}
      />
    </>
  )
}

export default App
