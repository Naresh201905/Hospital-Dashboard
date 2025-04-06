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
  Chip,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
} from '@mui/material';
import {
  Search,
  Circle as StatusIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Add as AddIcon } from '@mui/icons-material';

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editedPatient, setEditedPatient] = useState(null); // Add this line
  const [patients, setPatients] = useState([
    {
      id: 'P001',
      name: 'John Doe',
      age: 45,
      gender: 'Male',
      contact: '(555) 123-4567',
      diagnosis: 'Hypertension',
      status: 'Stable',
      doctor: 'Dr. Smith',
      statusColor: '#4caf50',
      address: '123 Main St, City',
      bloodGroup: 'A+',
      admissionDate: '2024-01-15',
    },
    {
      id: 'P002',
      name: 'Jane Smith',
      age: 32,
      gender: 'Female',
      contact: '(555) 234-5678',
      diagnosis: 'Diabetes Type 2',
      status: 'Critical',
      doctor: 'Dr. Johnson',
      statusColor: '#f44336',
      address: '456 Oak St, City',
      bloodGroup: 'B-',
      admissionDate: '2024-01-10',
    },
    {
      id: 'P003',
      name: 'Mike Johnson',
      age: 28,
      gender: 'Male',
      contact: '(555) 345-6789',
      diagnosis: 'Fracture',
      status: 'Recovering',
      doctor: 'Dr. Williams',
      statusColor: '#2196f3',
      address: '789 Pine St, City',
      bloodGroup: 'O+',
      admissionDate: '2024-01-12',
    },
    {
      id: 'P004',
      name: 'Sarah Williams',
      age: 52,
      gender: 'Female',
      contact: '(555) 456-7890',
      diagnosis: 'Pneumonia',
      status: 'Under Observation',
      doctor: 'Dr. Brown',
      statusColor: '#ff9800',
      address: '321 Elm St, City',
      bloodGroup: 'AB+',
      admissionDate: '2024-01-14',
    }
  ]);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (type, patient) => {
    setDialogType(type);
    setSelectedPatient(patient);
    setEditedPatient(patient); // Add this line
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPatient(null);
    setEditedPatient(null); // Add this line
  };

  const handleAddNewPatient = () => {
    const newPatient = {
      id: `P00${patients.length + 1}`,
      name: '',
      age: '',
      gender: '',
      contact: '',
      diagnosis: '',
      status: 'New',
      doctor: '',
      statusColor: '#1976d2',
      address: '',
      bloodGroup: '',
      admissionDate: new Date().toISOString().split('T')[0],
    };
    setSelectedPatient(newPatient);
    setEditedPatient(newPatient); // Add this line
    setDialogType('add');
    setOpenDialog(true);
  };

  const handleDeletePatient = () => {
    setPatients(patients.filter(p => p.id !== selectedPatient.id));
    handleCloseDialog();
  };

  const handleSavePatient = () => {
    if (dialogType === 'add') {
      setPatients([...patients, editedPatient]);
    } else {
      setPatients(patients.map(p => 
        p.id === editedPatient.id ? editedPatient : p
      ));
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Patients Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewPatient}
        >
          Add New Patient
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, ID, or diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Patient ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id} hover>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.diagnosis}</TableCell>
                <TableCell>
                  <Chip
                    icon={<StatusIcon sx={{ color: patient.statusColor }} />}
                    label={patient.status}
                    sx={{ 
                      backgroundColor: `${patient.statusColor}15`,
                      color: patient.statusColor,
                      borderColor: patient.statusColor,
                      border: '1px solid'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog('view', patient)} color="primary">
                    <ViewIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog('edit', patient)} color="info">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog('delete', patient)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogType === 'view' ? 'Patient Details' : 
           dialogType === 'edit' ? 'Edit Patient' :
           dialogType === 'add' ? 'Add New Patient' : 'Delete Patient'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'delete' ? (
            <Typography>Are you sure you want to delete this patient's record?</Typography>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  value={editedPatient?.name || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, name: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  type="number"
                  value={editedPatient?.age || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, age: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Gender"
                  value={editedPatient?.gender || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, gender: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact"
                  value={editedPatient?.contact || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, contact: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Blood Group"
                  value={editedPatient?.bloodGroup || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, bloodGroup: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Status"
                  value={editedPatient?.status || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, status: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Doctor"
                  value={editedPatient?.doctor || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, doctor: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Diagnosis"
                  value={editedPatient?.diagnosis || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, diagnosis: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  value={editedPatient?.address || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, address: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Admission Date"
                  value={editedPatient?.admissionDate || ''}
                  disabled={dialogType === 'view'}
                  onChange={(e) => setEditedPatient({...editedPatient, admissionDate: e.target.value})}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {(dialogType === 'edit' || dialogType === 'add') && (
            <Button onClick={handleSavePatient} color="primary">
              {dialogType === 'add' ? 'Add Patient' : 'Save Changes'}
            </Button>
          )}
          {dialogType === 'delete' && (
            <Button onClick={handleDeletePatient} color="error">
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Patients;