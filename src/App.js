import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, AppBar, Toolbar, IconButton, Badge, Avatar, Menu, MenuItem } from '@mui/material';
import { Notifications, AccountCircle } from '@mui/icons-material';
import Dashboard from './components/Dashboard';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import { Box } from '@mui/material';
import Patients from './components/Patients';
import Billings from './components/Billings';

// Update the theme configuration
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
      contrastText: '#fff',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      color: '#1a237e',
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#333333',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a237e',
          color: '#ffffff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [notifications, setNotifications] = useState(3);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box sx={{ display: 'flex' }}>
          {isAuthenticated && <Sidebar />}
          <Box sx={{ flexGrow: 1, backgroundColor: 'background.default', minHeight: '100vh' }}>
            {isAuthenticated && (
              <AppBar position="static" elevation={2}>
                <Toolbar sx={{ 
                  justifyContent: 'flex-end', 
                  gap: 2,
                  '& .MuiIconButton-root': {
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(33, 150, 243, 0.04)',
                    },
                  },
                }}>
                  <Box sx={{ 
                    color: 'primary.main', 
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    {currentTime.toLocaleTimeString()}
                  </Box>
                  <IconButton>
                    <Badge badgeContent={notifications} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>
                  <IconButton onClick={handleProfileMenu}>
                    <Avatar sx={{ 
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}>
                      <AccountCircle />
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    PaperProps={{
                      elevation: 3,
                      sx: {
                        mt: 1.5,
                        minWidth: 180,
                      }
                    }}
                  >
                    <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </Toolbar>
              </AppBar>
            )}
            <Box sx={{ p: 3 }}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/patients"
                  element={
                    <PrivateRoute>
                      <Patients />
                    </PrivateRoute>
                  }
                />
                // In your Routes component
                <Route path="/billings" element={<Billings />} />
              </Routes>
            </Box>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;