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
  Add as AddIcon,
} from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

// Add activity options at the top
const activityOptions = [
  'Regular Checkup',
  'Consultation',
  'Follow-up',
  'Surgery',
  'Laboratory Test',
  'X-Ray/Imaging',
  'Physical Therapy',
  'Vaccination',
];

const Appointments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [editedAppointment, setEditedAppointment] = useState(null);
  // Add more sample appointments
  const [appointments, setAppointments] = useState([
    {
      id: 'A001',
      patientName: 'John Doe',
      patientId: 'P001',
      age: 45,
      contact: '(555) 123-4567',
      activity: 'Regular Checkup',
      doctor: 'Dr. Smith',
      date: '2024-01-20',
      time: '09:00',
      status: 'Scheduled',
      statusColor: '#2196f3',
      purpose: 'Follow-up',
      notes: 'Regular checkup for hypertension',
    },
    {
      id: 'A002',
      patientName: 'Jane Smith',
      patientId: 'P002',
      age: 32,
      contact: '(555) 234-5678',
      activity: 'Consultation',
      doctor: 'Dr. Johnson',
      date: '2024-01-21',
      time: '10:30',
      status: 'Completed',
      statusColor: '#4caf50',
      purpose: 'Consultation',
      notes: 'Diabetes monitoring',
    },
    {
      id: 'A003',
      patientName: 'Mike Wilson',
      patientId: 'P003',
      age: 28,
      contact: '(555) 345-6789',
      activity: 'Laboratory Test',
      doctor: 'Dr. Brown',
      date: '2024-01-22',
      time: '14:00',
      status: 'Scheduled',
      statusColor: '#2196f3',
      purpose: 'Blood Test',
      notes: 'Annual health checkup',
    },
  ]);

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenDialog = (type, appointment) => {
    setDialogType(type);
    setSelectedAppointment(appointment);
    setEditedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
    setEditedAppointment(null);
  };

  const handleAddNewAppointment = () => {
    const newAppointment = {
      id: `A00${appointments.length + 1}`,
      patientName: '',
      patientId: '',
      age: '',
      contact: '',
      activity: '',
      doctor: '',
      date: '',
      time: '',
      status: 'Scheduled',
      statusColor: '#2196f3',
      purpose: '',
      notes: '',
    };
    setSelectedAppointment(newAppointment);
    setEditedAppointment(newAppointment);
    setDialogType('add');
    setOpenDialog(true);
  };

  const handleDeleteAppointment = () => {
    setAppointments(appointments.filter(a => a.id !== selectedAppointment.id));
    handleCloseDialog();
  };

  const statusOptions = [
    { label: 'Scheduled', color: '#2196f3' },
    { label: 'Completed', color: '#4caf50' },
    { label: 'Cancelled', color: '#f44336' },
    { label: 'No Show', color: '#ff9800' },
  ];

  const validateForm = () => {
    if (!editedAppointment) return false;
    return (
      editedAppointment.patientName &&
      editedAppointment.patientId &&
      editedAppointment.age &&
      editedAppointment.contact &&
      editedAppointment.activity &&
      editedAppointment.doctor &&
      editedAppointment.date &&
      editedAppointment.time &&
      editedAppointment.status &&
      editedAppointment.purpose
    );
  };

  const handleSaveAppointment = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }
    if (dialogType === 'add') {
      setAppointments([...appointments, editedAppointment]);
    } else {
      setAppointments(appointments.map(a => 
        a.id === editedAppointment.id ? editedAppointment : a
      ));
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Appointments Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddNewAppointment}
        >
          New Appointment
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by patient name, ID, or doctor..."
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
              <TableCell>Appointment ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Patient ID</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Activity</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAppointments.map((appointment) => (
              <TableRow key={appointment.id} hover>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>{appointment.patientName}</TableCell>
                <TableCell>{appointment.patientId}</TableCell>
                <TableCell>{appointment.age}</TableCell>
                <TableCell>{appointment.contact}</TableCell>
                <TableCell>{appointment.activity}</TableCell>
                <TableCell>{appointment.doctor}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Chip
                    icon={<StatusIcon sx={{ color: appointment.statusColor }} />}
                    label={appointment.status}
                    sx={{ 
                      backgroundColor: `${appointment.statusColor}15`,
                      color: appointment.statusColor,
                      borderColor: appointment.statusColor,
                      border: '1px solid'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpenDialog('edit', appointment)} color="info">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDialog('delete', appointment)} color="error">
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
          {dialogType === 'edit' ? 'Edit Appointment' :
           dialogType === 'add' ? 'New Appointment' : 'Delete Appointment'}
        </DialogTitle>
        <DialogContent>
          {dialogType === 'delete' ? (
            <Typography>Are you sure you want to delete this appointment?</Typography>
          ) : (
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Patient Name"
                  value={editedAppointment?.patientName || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, patientName: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Patient ID"
                  value={editedAppointment?.patientId || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, patientId: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Age"
                  type="number"
                  value={editedAppointment?.age || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, age: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Contact"
                  value={editedAppointment?.contact || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, contact: e.target.value})}
                />
              </Grid>
              // Update the Activity field in the form to use Select
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Activity</InputLabel>
                  <Select
                    value={editedAppointment?.activity || ''}
                    label="Activity"
                    onChange={(e) => setEditedAppointment({...editedAppointment, activity: e.target.value})}
                  >
                    {activityOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Doctor"
                  value={editedAppointment?.doctor || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, doctor: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="date"
                  label="Date"
                  InputLabelProps={{ shrink: true }}
                  value={editedAppointment?.date || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, date: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  type="time"
                  label="Time"
                  InputLabelProps={{ shrink: true }}
                  value={editedAppointment?.time || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, time: e.target.value})}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={editedAppointment?.status || ''}
                    label="Status"
                    onChange={(e) => {
                      const selectedStatus = statusOptions.find(s => s.label === e.target.value);
                      setEditedAppointment({
                        ...editedAppointment,
                        status: e.target.value,
                        statusColor: selectedStatus?.color || '#2196f3'
                      });
                    }}
                  >
                    {statusOptions.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Purpose"
                  value={editedAppointment?.purpose || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, purpose: e.target.value})}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes"
                  multiline
                  rows={4}
                  value={editedAppointment?.notes || ''}
                  onChange={(e) => setEditedAppointment({...editedAppointment, notes: e.target.value})}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          {dialogType !== 'delete' ? (
            <Button onClick={handleSaveAppointment} color="primary">
              {dialogType === 'add' ? 'Create Appointment' : 'Save Changes'}
            </Button>
          ) : (
            <Button onClick={handleDeleteAppointment} color="error">
              Delete
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;