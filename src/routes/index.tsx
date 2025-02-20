import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const SearchScores = lazy(() => import("../pages/SearchScores"));
const Reports = lazy(() => import("../pages/Reports"));
const Settings = lazy(() => import("../pages/Settings"));

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/search" element={<SearchScores />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default AppRoutes;
