import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  Dashboard,
  Search,
  BarChart,
  Settings,
  Menu,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Search", icon: <Search />, path: "/search" },
  { text: "Reports", icon: <BarChart />, path: "/reports" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? 240 : 60,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? 240 : 60,
          boxSizing: "border-box",
          position: "absolute",
          top: 64,
          left: 0,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        },
      }}
    >
      <Toolbar
        sx={{
          justifyContent: open ? "space-between" : "center",
          alignItems: "center",
          px: 1,
        }}
      >
        {open && (
          <Typography variant="h6" noWrap component="div">
            Menu
          </Typography>
        )}
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={handleDrawerToggle}
        >
          <Menu />
        </IconButton>
      </Toolbar>

      <List>
        {menuItems.map(({ text, icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <ListItem key={text} disablePadding>
              <ListItemButton
                component={Link}
                to={path}
                sx={{
                  backgroundColor: isActive ? "action.selected" : "transparent",
                  "&:hover": {
                    backgroundColor: isActive
                      ? "action.selected"
                      : "action.hover",
                  },
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? "primary.main" : "inherit",
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    fontSize: "1.25rem",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
