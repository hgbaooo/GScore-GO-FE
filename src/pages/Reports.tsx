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
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getReportData } from "../services/studentService";
import type { ReportData, SubjectScores } from "../types";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Reports = () => {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getReportData();
        setReportData(data);
      } catch (err) {
        toast.error("Failed to fetch report data.");
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const chartData = reportData
    ? Object.entries(reportData).map(([range, scores]) => ({
        range,
        ...scores,
      }))
    : [];

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
  const ranges = ["<4", "4-6", "6-8", ">=8"];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#8dd1e1",
  ];

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={350} minWidth={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        {subjects.map((subject, index) => (
          <Bar
            key={subject.key}
            dataKey={subject.key}
            fill={COLORS[index]}
            name={subject.label}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => {
    const rangeDataForPie = ranges.map((range) => {
      let totalStudentsInRange = 0;
      if (reportData?.[range as keyof ReportData]) {
        totalStudentsInRange = Object.values(
          reportData[range as keyof ReportData]
        ).reduce((sum, count) => sum + count, 0);
      }
      return {
        name: range,
        value: totalStudentsInRange,
      };
    });

    return (
      <ResponsiveContainer width="100%" height={350} minWidth={300}>
        <PieChart>
          <Pie
            data={rangeDataForPie}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {rangeDataForPie.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
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
            <TableCell>Range</TableCell>
            {subjects.map((subject) => (
              <TableCell key={subject.key} align="right">
                {subject.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {ranges.map((range) => (
            <TableRow key={range}>
              <TableCell component="th" scope="row">
                {range}
              </TableCell>
              {subjects.map((subject) => (
                <TableCell key={subject.key} align="right">
                  {reportData?.[range as keyof ReportData]?.[
                    subject.key as keyof SubjectScores
                  ] ?? 0}
                </TableCell>
              ))}
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
