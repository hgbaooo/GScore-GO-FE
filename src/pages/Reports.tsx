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
    { key: "toan", label: "Toán" },
    { key: "ngu_van", label: "Ngữ văn" },
    { key: "ngoai_ngu", label: "Ngoại ngữ" },
    { key: "vat_li", label: "Vật lý" },
    { key: "hoa_hoc", label: "Hóa học" },
    { key: "sinh_hoc", label: "Sinh học" },
    { key: "lich_su", label: "Lịch sử" },
    { key: "dia_li", label: "Địa lý" },
    { key: "gdcd", label: "GDCD" },
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
    <ResponsiveContainer width="100%" height={350}>
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
    const totalScores = subjects.map((subject) => ({
      name: subject.label,
      value: chartData.reduce(
        (sum, item) => sum + (item[subject.key as keyof SubjectScores] || 0),
        0
      ),
    }));

    return (
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={totalScores}
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
            {totalScores.map((entry, index) => (
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
      className="table-container"
      component={Paper}
      sx={{ mt: 4 }}
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
          p: 3,
          gap: 3,
          mb: 4,
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
            Overall Subject Distribution
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
