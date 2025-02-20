import { AppBar, Toolbar, Typography } from "@mui/material";

const APPBAR_HEIGHT = 64;

const Appbar = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        width: "100%",
        height: `${APPBAR_HEIGHT}px`,
      }}
    >
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" noWrap component="div">
          G-Scores
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
