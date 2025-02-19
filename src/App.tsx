import { BrowserRouter as Router } from "react-router-dom";
import { Box, CssBaseline, AppBar, Typography, Toolbar } from "@mui/material";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";
import { useState } from "react";

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: "100%",
          }}
        >
          <Toolbar sx={{ justifyContent: "center" }}>
            <Typography variant="h6" noWrap component="div">
              G-Scores
            </Typography>
          </Toolbar>
        </AppBar>

        <Sidebar open={open} setOpen={setOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: `calc(100% - ${open ? 240 : 60}px)`,
            marginLeft: `${open ? 240 : 60}px`,
            transition: (theme) =>
              theme.transitions.create(["margin", "width"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            mt: "64px",
            p: 3,
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: 1200,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppRoutes />
          </Box>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
