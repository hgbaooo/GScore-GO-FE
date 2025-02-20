import { Typography, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Settings = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <SettingsIcon sx={{ fontSize: 80, mb: 2 }} />
      <Typography variant="h4">Settings Page</Typography>
    </Box>
  );
};

export default Settings;
