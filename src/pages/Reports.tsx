import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getScoreClassification } from "../services/scoreService";
import type { ScoreClassification } from "../types";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Reports = () => {
  const [scoreData, setScoreData] = useState<ScoreClassification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getScoreClassification();
        setScoreData(data);
      } catch (err) {
        toast.error("Failed to fetch score classification data.");
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const subjects = [
    { key: "toan", label: "Math" },
    { key: "ngu_van", label: "Literature" },
    { key: "ngoai_ngu", label: "Foreign Language" },
    { key: "vat_li", label: "Physics" },
    { key: "hoa_hoc", label: "Chemistry" },
    { key: "sinh_hoc", label: "Biology" },
    { key: "lich_su", label: "History" },
    { key: "dia_li", label: "Geography" },
    { key: "gdcd", label: "Civics" },
  ];

  const levels = ["excellent", "good", "average", "poor"];
  const levelLabels = {
    excellent: "≥8",
    good: "6-8",
    average: "4-6",
    poor: "<4",
  };

  const COLORS = {
    excellent: "#0088FE",
    good: "#00C49F",
    average: "#FFBB28",
    poor: "#FF8042",
  };

  const renderBarChart = () => {
    const transformedData = scoreData.map((item) => ({
      subject:
        subjects.find((s) => s.key === item.subject)?.label || item.subject,
      Excellent: item.excellent,
      Good: item.good,
      Average: item.average,
      Poor: item.poor,
    }));

    return (
      <ResponsiveContainer width="100%" height={350} minWidth={300}>
        <BarChart
          data={transformedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="subject" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Excellent" fill={COLORS.excellent} stackId="a" />
          <Bar dataKey="Good" fill={COLORS.good} stackId="a" />
          <Bar dataKey="Average" fill={COLORS.average} stackId="a" />
          <Bar dataKey="Poor" fill={COLORS.poor} stackId="a" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderPieChart = () => {
    const totalsByLevel = scoreData.reduce(
      (acc, item) => {
        acc.excellent += item.excellent;
        acc.good += item.good;
        acc.average += item.average;
        acc.poor += item.poor;
        return acc;
      },
      { excellent: 0, good: 0, average: 0, poor: 0 }
    );

    const total = Object.values(totalsByLevel).reduce((a, b) => a + b, 0);
    const pieData = Object.entries(totalsByLevel).map(([key, value]) => ({
      name: levelLabels[key as keyof typeof levelLabels],
      value,
      percentage: (value / total) * 100,
    }));

    return (
      <ResponsiveContainer width="100%" height={350} minWidth={300}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {pieData.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[levels[index] as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderTable = () => (
    <TableContainer
      component={Paper}
      sx={{
        mt: 4,
        maxWidth: "100%",
        overflow: "auto",
      }}
    >
      <Table aria-label="simple table" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Subject</TableCell>
            <TableCell align="right">≥8</TableCell>
            <TableCell align="right">6-8</TableCell>
            <TableCell align="right">4-6</TableCell>
            <TableCell align="right">&lt;4</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreData.map((item) => (
            <TableRow key={item.subject}>
              <TableCell component="th" scope="row">
                {subjects.find((s) => s.key === item.subject)?.label ||
                  item.subject}
              </TableCell>
              <TableCell align="right">{item.excellent}</TableCell>
              <TableCell align="right">{item.good}</TableCell>
              <TableCell align="right">{item.average}</TableCell>
              <TableCell align="right">{item.poor}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) {
    return <LoadingSpinner message="Loading report data..." />;
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{ p: 3, bgcolor: "error.light", maxWidth: "lg", width: "100%" }}
        >
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="main-content">
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 2, md: 3 },
          mb: { xs: 2, md: 4 },
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 3, flex: 1, minHeight: 400, width: "100%" }}
        >
          <Typography variant="h6" gutterBottom>
            Score Distribution by Subject
          </Typography>
          {renderBarChart()}
        </Paper>
        <Paper
          elevation={3}
          sx={{ p: 3, flex: 1, minHeight: 400, width: "100%" }}
        >
          <Typography variant="h6" gutterBottom>
            Student Distribution by Score Range
          </Typography>
          {renderPieChart()}
        </Paper>
      </Box>
      <Paper
        elevation={3}
        sx={{ p: 3, width: "100%", maxWidth: 1200, mx: "auto" }}
      >
        <Typography variant="h6" gutterBottom>
          Statistics
        </Typography>
        {renderTable()}
      </Paper>
    </Box>
  );
};

export default Reports;
