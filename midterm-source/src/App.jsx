/*
Bootstrap replaced with MUI as requested.
*/

import { useState, useRef, useEffect } from "react";
import { Container, Grid, Paper, Button, FormControl, InputLabel, Select, MenuItem, TextField, Box } from "@mui/material";
import QuotationTable from "./QuotationTable";

function App() {
  
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [products, setProducts] = useState([]);
  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(0);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");

  // Load products from JSON file on component mount
  useEffect(() => {
    console.log('Fetching products...');
    fetch('/products.json')
      .then(response => {
        console.log('Response received:', response);
        return response.json();
      })
      .then(data => {
        console.log('Products loaded:', data);
        setProducts(data);
        if (data.length > 0) {
          setSelectedProduct(data[0].code);
          setPpu(data[0].price);
        }
      })
      .catch(error => {
        console.error('Error loading products:', error);
        // Fallback to hardcoded products if fetch fails
        const fallbackProducts = [
          { code: "p001", name: "Product A", price: 100 },
          { code: "p002", name: "Product B", price: 200 },
          { code: "p003", name: "Product C", price: 150 },
          { code: "p004", name: "Product D", price: 250 },
        ];
        setProducts(fallbackProducts);
        setSelectedProduct(fallbackProducts[0].code);
        setPpu(fallbackProducts[0].price);
      });
  }, []);

  const addItem = () => {
    let item = products.find((v) => selectedProduct === v.code)
    
    // Ensure we have a valid item
    if (!item) {
      console.error('No item selected');
      return;
    }

    const newItem = {
      item: item.name,
      ppu: parseFloat(ppu),
      qty: parseInt(qty),
      discount: parseFloat(discount),
    };

    // Check for redundant items (same name and price)
    const existingItemIndex = dataItems.findIndex(
      (existing) => existing.item === newItem.item && existing.ppu === newItem.ppu
    );

    if (existingItemIndex !== -1) {
      // Merge redundant items with weighted average discount
      const updatedItems = [...dataItems];
      const existingItem = updatedItems[existingItemIndex];
      
      // Calculate weighted average discount
      const totalQty = existingItem.qty + newItem.qty;
      const weightedDiscount = (
        (existingItem.discount * existingItem.qty) + 
        (newItem.discount * newItem.qty)
      ) / totalQty;
      
      updatedItems[existingItemIndex] = {
        ...existingItem,
        qty: totalQty,
        discount: weightedDiscount,
      };
      setDataItems(updatedItems);
    } else {
      // Add new item
      setDataItems([...dataItems, newItem]);
    }

    // Reset form
    setQty(1);
    setDiscount(0);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const clearAll = () => {
    setDataItems([]);
  }

  const productChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedProduct(selectedCode);
    let item = products.find((v) => selectedCode === v.code);
    setPpu(item.price);
  }

  // Debug: log products state
  console.log('Current products state:', products);
  console.log('Selected product:', selectedProduct);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, backgroundColor: "#e4e4e4" }}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  value={selectedProduct}
                  label="Item"
                  onChange={productChange}
                >
                  {products.length === 0 && <MenuItem disabled>Loading products...</MenuItem>}
                  {products.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Price Per Unit"
                type="number"
                inputRef={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(e.target.value)}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Quantity"
                type="number"
                inputRef={qtyRef}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Discount (%)"
                type="number"
                inputRef={discountRef}
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                inputProps={{ min: 0, max: 100 }}
              />
            </Box>
            
            <Button 
              variant="contained" 
              fullWidth 
              onClick={addItem}
              sx={{ mt: 2 }}
            >
              Add
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
