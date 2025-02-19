"use client";

import { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Container,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Alert,
  Snackbar,
  useTheme,
  useMediaQuery,
  MenuItem,
} from "@mui/material";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [reportFrequency, setReportFrequency] = useState("weekly");
  const [email, setEmail] = useState("user@example.com");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSaveSettings = () => {
    console.log("Settings saved:", {
      darkMode,
      emailNotifications,
      reportFrequency,
      email,
    });
    setSnackbarOpen(true);
  };

  const handleResetData = () => {
    console.log("Data reset initiated");
    setSnackbarOpen(true);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Application Settings
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={(e) => setDarkMode(e.target.checked)}
                />
              }
              label="Dark Mode"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
              }
              label="Email Notifications"
            />
            <TextField
              select
              label="Report Frequency"
              value={reportFrequency}
              onChange={(e) => setReportFrequency(e.target.value)}
              fullWidth
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </TextField>
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Data Management
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveSettings}
              fullWidth={isSmallScreen}
            >
              Save Settings
            </Button>
            <Divider sx={{ my: 2 }} />
            <Alert severity="warning" sx={{ mb: 2 }}>
              Caution: The following action cannot be undone.
            </Alert>
            <Button
              variant="outlined"
              color="error"
              onClick={handleResetData}
              fullWidth={isSmallScreen}
            >
              Reset All Data
            </Button>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Action completed successfully"
      />
    </Container>
  );
};

export default Settings;
