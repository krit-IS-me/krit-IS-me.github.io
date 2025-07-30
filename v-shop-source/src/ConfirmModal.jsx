import React, { useEffect, useState } from 'react'

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  const handleCancel = () => {
    setShow(false)
    setTimeout(onCancel, 300)
  }

  const handleConfirm = () => {
    setShow(false)
    setTimeout(onConfirm, 300)
  }

  return (
    <div className={`modal-overlay ${show ? 'show' : ''}`} style={styles.overlay}>
      <div className={`modal-content ${show ? 'show' : ''}`} style={styles.modal}>
        <p>{message}</p>
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <button onClick={handleCancel} style={styles.buttonCancel}>Cancel</button>
          <button onClick={handleConfirm} style={styles.buttonConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    minWidth: 300,
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  buttonConfirm: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    marginLeft: 10,
    borderRadius: 4,
    cursor: 'pointer',
  },
  buttonCancel: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 4,
    cursor: 'pointer',
  },
}
