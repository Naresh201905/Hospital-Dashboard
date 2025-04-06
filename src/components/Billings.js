import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  CheckCircle as PaidIcon,
  Schedule as PendingIcon,
  Warning as OverdueIcon 
} from '@mui/icons-material';

const Billings = () => {
  const [bills, setBills] = useState([
    {
      id: 'B001',
      patientName: 'John Smith',
      date: '2024-01-15',
      service: 'Consultation',
      amount: 150,
      status: 'Paid',
    },
    {
      id: 'B002',
      patientName: 'Sarah Johnson',
      date: '2024-01-16',
      service: 'Laboratory Tests',
      amount: 300,
      status: 'Pending',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [dialogType, setDialogType] = useState('');

  const handleOpenDialog = (type, bill = null) => {
    setDialogType(type);
    setSelectedBill(bill || {
      patientName: '',
      date: '',
      service: '',
      amount: '',
      status: 'Pending'
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBill(null);
  };

  const handleSaveBill = () => {
    if (dialogType === 'add') {
      const newBill = {
        id: `B${String(bills.length + 1).padStart(3, '0')}`,
        ...selectedBill
      };
      setBills([...bills, newBill]);
    } else {
      setBills(bills.map(bill => 
        bill.id === selectedBill.id ? selectedBill : bill
      ));
    }
    handleCloseDialog();
  };

  const handleDeleteBill = (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      setBills(bills.filter(bill => bill.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return { color: '#4caf50', icon: <PaidIcon /> };
      case 'Pending':
        return { color: '#ff9800', icon: <PendingIcon /> };
      case 'Overdue':
        return { color: '#f44336', icon: <OverdueIcon /> };
      default:
        return { color: '#757575', icon: null };
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Billing Management</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog('add')}
          sx={{ borderRadius: 2 }}
        >
          Add New Bill
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Bill ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Amount ($)</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bills.map((bill) => {
              const { color, icon } = getStatusColor(bill.status);
              return (
                <TableRow 
                  key={bill.id}
                  sx={{ '&:hover': { backgroundColor: '#f8f8f8' } }}
                >
                  <TableCell>{bill.id}</TableCell>
                  <TableCell>{bill.patientName}</TableCell>
                  <TableCell>{bill.date}</TableCell>
                  <TableCell>{bill.service}</TableCell>
                  <TableCell>${bill.amount}</TableCell>
                  <TableCell>
                    <Chip
                      icon={icon}
                      label={bill.status}
                      sx={{
                        backgroundColor: `${color}15`,
                        color: color,
                        fontWeight: 500,
                        '& .MuiChip-icon': {
                          color: color
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton 
                      onClick={() => handleOpenDialog('edit', bill)}
                      sx={{ '&:hover': { color: 'primary.main' } }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      onClick={() => handleDeleteBill(bill.id)}
                      sx={{ '&:hover': { color: 'error.main' } }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {['Paid', 'Pending', 'Overdue'].map((status) => {
          const statusBills = bills.filter(bill => bill.status === status);
          const totalAmount = statusBills.reduce((sum, bill) => sum + bill.amount, 0);
          const { color, icon } = getStatusColor(status);
          
          return (
            <Grid item xs={12} md={4} key={status}>
              <Card sx={{ 
                borderRadius: 2,
                boxShadow: 2,
                borderLeft: 5,
                borderColor: color
              }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>{status}</Typography>
                  </Box>
                  <Typography variant="h4" sx={{ color: color }}>
                    ${totalAmount}
                  </Typography>
                  <Typography color="text.secondary">
                    {statusBills.length} bills
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Dialog remains unchanged */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? 'Add New Bill' : 'Edit Bill'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Patient Name"
              fullWidth
              value={selectedBill?.patientName || ''}
              onChange={(e) => setSelectedBill({
                ...selectedBill,
                patientName: e.target.value
              })}
            />
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={selectedBill?.date || ''}
              onChange={(e) => setSelectedBill({
                ...selectedBill,
                date: e.target.value
              })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Service"
              fullWidth
              value={selectedBill?.service || ''}
              onChange={(e) => setSelectedBill({
                ...selectedBill,
                service: e.target.value
              })}
            />
            <TextField
              label="Amount"
              type="number"
              fullWidth
              value={selectedBill?.amount || ''}
              onChange={(e) => setSelectedBill({
                ...selectedBill,
                amount: Number(e.target.value)
              })}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedBill?.status || ''}
                onChange={(e) => setSelectedBill({
                  ...selectedBill,
                  status: e.target.value
                })}
                label="Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Paid">Paid</MenuItem>
                <MenuItem value="Overdue">Overdue</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveBill}>
            {dialogType === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Billings;