import { useState } from "react";
import {
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Container,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

const Reports = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [scoreDistribution] = useState([
    { subject: "Math", ">=8": 40, "6-8": 60, "4-6": 30, "<4": 20 },
    { subject: "Physics", ">=8": 35, "6-8": 55, "4-6": 25, "<4": 15 },
    { subject: "Chemistry", ">=8": 45, "6-8": 65, "4-6": 35, "<4": 25 },
  ]);

  const [topStudents] = useState([
    { name: "Student 1", math: 9, physics: 8.5, chemistry: 9.2 },
    { name: "Student 2", math: 8.8, physics: 8.0, chemistry: 8.7 },
    { name: "Student 3", math: 8.5, physics: 7.8, chemistry: 8.5 },
    { name: "Student 4", math: 8.2, physics: 7.5, chemistry: 8.2 },
    { name: "Student 5", math: 8.0, physics: 7.2, chemistry: 8.0 },
  ]);

  const [averageScores] = useState([
    { month: "Jan", math: 7.2, physics: 6.8, chemistry: 7.5 },
    { month: "Feb", math: 7.5, physics: 7.0, chemistry: 7.8 },
    { month: "Mar", math: 7.8, physics: 7.2, chemistry: 8.0 },
    { month: "Apr", math: 8.0, physics: 7.5, chemistry: 8.2 },
    { month: "May", math: 8.2, physics: 7.8, chemistry: 8.5 },
  ]);

  const renderChart = (title: string, chart: React.ReactElement) => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Box sx={{ height: isSmallScreen ? 300 : 400, width: "100%" }}>
        <ResponsiveContainer>{chart}</ResponsiveContainer>
      </Box>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Reports
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {renderChart(
          "Score Distribution by Subject",
          <BarChart data={scoreDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey=">=8" fill="#8884d8" />
            <Bar dataKey="6-8" fill="#82ca9d" />
            <Bar dataKey="4-6" fill="#ffc658" />
            <Bar dataKey="<4" fill="#ff8042" />
          </BarChart>
        )}

        {renderChart(
          "Top 5 Students Performance",
          <LineChart data={topStudents}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="math" stroke="#8884d8" />
            <Line type="monotone" dataKey="physics" stroke="#82ca9d" />
            <Line type="monotone" dataKey="chemistry" stroke="#ffc658" />
          </LineChart>
        )}

        {renderChart(
          "Average Scores Trend",
          <LineChart data={averageScores}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="math" stroke="#8884d8" />
            <Line type="monotone" dataKey="physics" stroke="#82ca9d" />
            <Line type="monotone" dataKey="chemistry" stroke="#ffc658" />
          </LineChart>
        )}
      </Box>
    </Container>
  );
};

export default Reports;
