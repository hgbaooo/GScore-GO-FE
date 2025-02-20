import { BrowserRouter as Router } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Appbar from "./components/Appbar";
import AppRoutes from "./routes";
import { Suspense } from "react";

const APPBAR_HEIGHT = 64;

const App = () => {
  return (
    <Router>
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          width: "100vw",
        }}
      >
        <Appbar />
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: `calc(100vh - ${APPBAR_HEIGHT}px)`,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            boxSizing: "border-box",
            overflow: "auto",
            padding: { xs: 2, sm: 3 },
            paddingTop: 3,
            mt: `${APPBAR_HEIGHT}px`,
          }}
        >
          <Box maxWidth="lg" sx={{ width: "100%" }}>
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
          </Box>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
