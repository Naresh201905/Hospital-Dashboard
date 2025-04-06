import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Box, Card, CardContent, Badge, IconButton } from '@mui/material';
import {
  PeopleAlt,
  LocalHospital,
  EventAvailable,
  MedicalServices,
  AccessTime,
  Notifications,
  Circle as StatusIcon,
} from '@mui/icons-material';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [appointments, setAppointments] = useState([
    {
      id: 'A001',
      patientName: 'John Smith',
      time: '09:00 AM',
      doctor: 'Dr. Wilson',
      status: 'Scheduled',
      amount: '$150'
    },
    {
      id: 'A002',
      patientName: 'Sarah Johnson',
      time: '10:30 AM',
      doctor: 'Dr. Brown',
      status: 'Completed',
      amount: '$200'
    }
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Add these new functions
  const handleOpenDialog = (type, appointment = null) => {
    setDialogType(type);
    setSelectedAppointment(appointment);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAppointment(null);
  };

  const handleDeleteAppointment = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setAppointments(appointments.filter(app => app.id !== id));
    }
  };

  // Add after handleDeleteAppointment and before useEffect
  const handleSaveAppointment = () => {
    if (dialogType === 'add') {
      const newAppointment = {
        id: `A${String(appointments.length + 1).padStart(3, '0')}`,
        ...selectedAppointment
      };
      setAppointments([...appointments, newAppointment]);
    } else {
      setAppointments(appointments.map(app => 
        app.id === selectedAppointment.id ? selectedAppointment : app
      ));
    }
    handleCloseDialog();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const statsData = [
    { title: 'Total Patients', value: '1,234', icon: <PeopleAlt />, color: '#1976d2' },
    { title: 'Available Doctors', value: '48', icon: <LocalHospital />, color: '#2e7d32' },
    { title: "Today's Appointments", value: '42', icon: <EventAvailable />, color: '#ed6c02' },
    { title: 'Active Treatments', value: '156', icon: <MedicalServices />, color: '#9c27b0' },
  ];

  const recentActivities = [
    { time: '09:00 AM', activity: 'Dr. Smith started morning rounds' },
    { time: '10:30 AM', activity: 'New patient admitted to Emergency' },
    { time: '11:15 AM', activity: 'Surgery scheduled for Room 302' },
    { time: '12:00 PM', activity: 'Staff meeting in Conference Room A' },
  ];

  const livePatientStatus = [
    { id: 'P001', name: 'John Doe', status: 'Stable', room: '101', color: '#4caf50' },
    { id: 'P002', name: 'Jane Smith', status: 'Critical', room: '205', color: '#f44336' },
    { id: 'P003', name: 'Mike Johnson', status: 'Under Observation', room: '304', color: '#ff9800' },
    { id: 'P004', name: 'Sarah Williams', status: 'Recovering', room: '102', color: '#2196f3' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Header with Notifications */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4">Hospital Dashboard</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="primary">
                <Badge badgeContent={notifications} color="error">
                  <Notifications />
                </Badge>
              </IconButton>
              <Typography variant="h6">
                {currentTime.toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Stats Cards */}
        {statsData.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: `${stat.color}15`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ 
                  bgcolor: stat.color,
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  color: 'white'
                }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4">{stat.value}</Typography>
            </Paper>
          </Grid>
        ))}

        {/* Live Patient Status */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Live Patient Status
            </Typography>
            <Grid container spacing={2}>
              {livePatientStatus.map((patient) => (
                <Grid item xs={12} sm={6} md={3} key={patient.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <StatusIcon sx={{ color: patient.color, mr: 1 }} />
                        <Typography variant="h6">{patient.name}</Typography>
                      </Box>
                      <Typography variant="body2" color="textSecondary">
                        ID: {patient.id}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Room: {patient.room}
                      </Typography>
                      <Typography variant="body1" sx={{ color: patient.color, mt: 1 }}>
                        {patient.status}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Activities
            </Typography>
            <Grid container spacing={2}>
              {recentActivities.map((activity, index) => (
                <Grid item xs={12} key={index}>
                  <Card variant="outlined">
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <AccessTime sx={{ mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="subtitle2" color="primary">
                          {activity.time}
                        </Typography>
                        <Typography variant="body2">
                          {activity.activity}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Today's Appointments Section */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Today's Appointments</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog('add')}
              >
                Add Appointment
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Patient Name</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>Doctor</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>{appointment.id}</TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      <TableCell>{appointment.time}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                      <TableCell>{appointment.amount}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleOpenDialog('edit', appointment)}>
                          <EditIcon color="primary" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteAppointment(appointment.id)}>
                          <DeleteIcon color="error" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' ? 'Add New Appointment' : 'Edit Appointment'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Patient Name"
              fullWidth
              value={selectedAppointment?.patientName || ''}
              onChange={(e) => setSelectedAppointment({
                ...selectedAppointment,
                patientName: e.target.value
              })}
            />
            <TextField
              label="Doctor"
              fullWidth
              value={selectedAppointment?.doctor || ''}
              onChange={(e) => setSelectedAppointment({
                ...selectedAppointment,
                doctor: e.target.value
              })}
            />
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={selectedAppointment?.time || ''}
              onChange={(e) => setSelectedAppointment({
                ...selectedAppointment,
                time: e.target.value
              })}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Amount"
              fullWidth
              value={selectedAppointment?.amount || ''}
              onChange={(e) => setSelectedAppointment({
                ...selectedAppointment,
                amount: e.target.value
              })}
            />
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={selectedAppointment?.status || ''}
                onChange={(e) => setSelectedAppointment({
                  ...selectedAppointment,
                  status: e.target.value
                })}
                label="Status"
              >
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSaveAppointment}
          >
            {dialogType === 'add' ? 'Add' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;