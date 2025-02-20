import { BrowserRouter as Router } from "react-router-dom";
import {
  Box,
  CssBaseline,
  AppBar,
  Typography,
  Toolbar,
  Container,
} from "@mui/material";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./routes";

const SIDEBAR_WIDTH = 240;

const App = () => {
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

        <Sidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
            ml: `${SIDEBAR_WIDTH}px`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            pt: "64px",
            boxSizing: "border-box",
          }}
        >
          <Container
            maxWidth="lg"
            sx={{
              mt: 4,
              mb: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              width: "100%",
              boxSizing: "border-box",
              mx: "auto",
            }}
          >
            <AppRoutes />
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
