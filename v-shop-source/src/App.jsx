import { useState, useRef, useEffect } from 'react'
import accessoryData from './accessory.json'
import DataTable from './DataTable'
import ConfirmModal from './ConfirmModal'

function App() {
  const quantityRef = useRef()
  const productRef = useRef()

  const [price, setPrice] = useState(0)
  const [selectedItems, setSelectedItems] = useState([
    { id: 1, name: "Mouse", price: 10, quantity: 2 },
    { id: 2, name: "Keyboard", price: 20, quantity: 1 },
  ])

  // Modal state
  const [modalVisible, setModalVisible] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    if (accessoryData.length > 0) {
      setPrice(accessoryData[0].price)
    }
  }, [])

  const updatePrice = (e) => {
    const productId = parseInt(e.target.value)
    const product = accessoryData.find(item => item.id === productId)
    if (product) {
      setPrice(product.price)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const productId = parseInt(productRef.current.value)
    const product = accessoryData.find(item => item.id === productId)
    const quantity = parseInt(quantityRef.current.value)

    if (product && quantity > 0) {
      const order = {
        ...product,
        quantity
      }

      console.table(order)
      setSelectedItems([...selectedItems, order])

      quantityRef.current.value = ''
      productRef.current.value = accessoryData[0].id
      setPrice(accessoryData[0].price)
    }
  }

  // Show modal to confirm delete
  const showDeleteModal = (id) => {
    setItemToDelete(id)
    setModalVisible(true)
  }

  // Confirm delete action
  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setSelectedItems(selectedItems.filter(item => item.id !== itemToDelete))
      setItemToDelete(null)
      setModalVisible(false)
    }
  }

  // Cancel delete action
  const cancelDelete = () => {
    setItemToDelete(null)
    setModalVisible(false)
  }

  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <h2>Order Form</h2>
      <form onSubmit={handleSubmit}>
        Product:
        <select ref={productRef} onChange={updatePrice} defaultValue={accessoryData[0].id}>
          {accessoryData.map((accessory, index) => (
            <option key={index} value={accessory.id}>{accessory.name}</option>
          ))}
        </select><br />

        Quantity:
        <input type="number" ref={quantityRef} min="1" /><br />

        <p>Price: ${price}</p>

        <button type="submit">Submit</button>
      </form>

      <hr />

      <h3>Selected Items</h3>
      <DataTable data={selectedItems} onDelete={showDeleteModal} />
      <h4>Total Price: ${totalPrice}</h4>

      {modalVisible && (
        <ConfirmModal
          message="Are you sure you want to delete this item?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  )
}

export default App
