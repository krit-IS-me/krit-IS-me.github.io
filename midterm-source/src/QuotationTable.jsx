/*
Bootstrap replaced with MUI as requested.
*/

import { 
  Paper, 
  Button, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableContainer,
  TableFooter,
  Typography,
  Box,
  IconButton
} from "@mui/material";
import { ShoppingCart, Clear, Delete } from "@mui/icons-material";

import style from "./mystyle.module.css";

function QuotationTable({ data, deleteByIndex, clearAll }) {

  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Quotation</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <ShoppingCart />
          <Typography>No items</Typography>
        </Box>
      </Paper>
    );
  }

  // Calculate totals
  const total = data.reduce((acc, v) => {
    const itemTotal = v.qty * v.ppu;
    const discountAmount = itemTotal * (v.discount / 100);
    return acc + (itemTotal - discountAmount);
  }, 0);
  const totalDiscount = data.reduce((acc, v) => {
    const itemTotal = v.qty * v.ppu;
    return acc + (itemTotal * (v.discount / 100));
  }, 0);

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  const handleClearAll = () => {
    clearAll();
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Quotation</Typography>
      <Button 
        variant="outlined" 
        startIcon={<Clear />} 
        onClick={handleClearAll}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Discount (%)</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const itemTotal = v.qty * v.ppu;
              const discountAmount = itemTotal * (v.discount / 100);
              const amount = itemTotal - discountAmount;
              return (
                <TableRow key={i}>
                  <TableCell align="center">
                    <IconButton onClick={() => handleDelete(i)} size="small">
                      <Delete />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.discount}%</TableCell>
                  <TableCell align="right">{amount.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} align="right">
                <strong>Total Discount</strong>
              </TableCell>
              <TableCell align="center">
                <strong>{totalDiscount.toFixed(2)}</strong>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5} align="right">
                <strong>Total</strong>
              </TableCell>
              <TableCell align="right">
                <strong>{total.toFixed(2)}</strong>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default QuotationTable;
