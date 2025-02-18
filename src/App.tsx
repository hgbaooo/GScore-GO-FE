import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box, CssBaseline, AppBar, Toolbar, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SearchScores from "./pages/SearchScores";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { useState } from "react";

const App = () => {
  const [open, setOpen] = useState(true);

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: "100%" }}
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
            p: 3,
            ml: open ? "60px" : "0",
            transition: "margin-left 0.3s",
            mt: "64px",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<SearchScores />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
