import { BrowserRouter as Router } from "react-router-dom";
import { Box, CssBaseline, Container, CircularProgress } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import AppRoutes from "./routes";
import { Suspense } from "react";

const APPBAR_HEIGHT = 64;

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh", width: "100vw" }}>
        <Appbar />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            mt: `${APPBAR_HEIGHT}px`,
            height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxSizing: "border-box",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg">
            <Suspense
              fallback={
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <CircularProgress />
                </Box>
              }
            >
              <AppRoutes />
            </Suspense>
          </Container>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
