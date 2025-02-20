import type React from "react";

import { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Dashboard,
  Search,
  BarChart,
  Settings,
  MenuOpen,
  Menu,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const SIDEBAR_WIDTH = 240;
const SIDEBAR_WIDTH_COLLAPSED = 65;

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Search", icon: <Search />, path: "/search" },
  { text: "Reports", icon: <BarChart />, path: "/reports" },
  { text: "Settings", icon: <Settings />, path: "/settings" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
        "& .MuiDrawer-paper": {
          width: isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH,
          transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
          overflowX: "hidden",
          borderRight: "1px solid",
          borderColor: "divider",
          pt: `64px`,
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map(({ text, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  component={Link}
                  to={path}
                  selected={isActive}
                  sx={{
                    minHeight: 48,
                    justifyContent: isCollapsed ? "center" : "initial",
                    px: 2.5,
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                    ...(isActive && {
                      backgroundColor: "rgba(0, 0, 0, 0.08)",
                      color: "primary.main",
                      "& .MuiListItemIcon-root": {
                        color: "primary.main",
                      },
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                      },
                    }),
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: isActive ? "primary.main" : "inherit",
                      minWidth: 0,
                      mr: isCollapsed ? 0 : 3,
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    sx={{
                      opacity: isCollapsed ? 0 : 1,
                      display: isCollapsed ? "none" : "block",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            position: "absolute",
            right: 0,
            top: 0,
            mt: 1,
            mr: 1,
          }}
        >
          {isCollapsed ? <Menu /> : <MenuOpen />}
        </IconButton>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
