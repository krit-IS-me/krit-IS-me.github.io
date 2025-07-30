function DataTable({ data, onDelete }) {
  return (
    <table border="1" cellPadding="8" style={{ width: '100%', marginTop: '1rem' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price ($)</th>
          <th>Quantity</th>
          <th>Total ($)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => (
          <tr key={idx}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.price * item.quantity}</td>
            <td>
              <button
                onClick={() => onDelete(item.id)}
                style={{
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  borderRadius: '4px',
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataTable
