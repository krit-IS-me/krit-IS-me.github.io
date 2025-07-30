import React, { useRef } from "react";
import { Button, Container } from "@mui/material"; // or use <button> if no MUI

const DataTable = ({ data, onSearch, onSortAsc, onSortDesc }) => {
  const sRef = useRef();

  const handleSearch = () => {
    const keyword = sRef.current.value;
    onSearch(keyword);
  };

  return (
    <Container>
      {/* Search input and button */}
      <div style={{ marginBottom: "1rem" }}>
        <input type="text" placeholder="Search..." ref={sRef} />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>

        {/* Sort buttons */}
        <Button variant="outlined" onClick={onSortAsc} style={{ marginLeft: "1rem" }}>
          Sort ↑
        </Button>
        <Button variant="outlined" onClick={onSortDesc} style={{ marginLeft: "0.5rem" }}>
          Sort ↓
        </Button>
      </div>

      {/* Table */}
      <table border="1" cellPadding="5" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No items found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </Container>
  );
};

export default DataTable;
