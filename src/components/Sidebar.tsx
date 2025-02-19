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
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard,
  Search,
  BarChart,
  Settings,
  Menu,
  ChevronLeft,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const drawerWidth = open ? 240 : 60;

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open={open}
      onClose={handleDrawerToggle}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: { xs: 0, sm: 64 },
          height: { xs: "100%", sm: "calc(100% - 64px)" },
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        {open && (
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
        )}
        <IconButton onClick={handleDrawerToggle}>
          {open ? <ChevronLeft /> : <Menu />}
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
