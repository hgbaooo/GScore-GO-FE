import type React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Dashboard, Search, BarChart, Settings } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH = 240;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Search", icon: <Search />, path: "/search" },
  { text: "Reports", icon: <BarChart />, path: "/reports" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: SIDEBAR_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar /> {/* Để tránh nội dung bị che bởi AppBar */}
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map(({ text, icon, path }) => {
            const isActive = location.pathname === path;

            return (
              <ListItem key={text} disablePadding>
                <ListItemButton component={Link} to={path} selected={isActive}>
                  <ListItemIcon
                    sx={{ color: isActive ? "primary.main" : "inherit" }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
