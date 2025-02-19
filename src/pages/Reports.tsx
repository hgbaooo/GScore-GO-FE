import { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
  Skeleton,
  Container,
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
} from "recharts";
import { getReportData } from "../services/studentService";
import { ReportData, SubjectScores } from "../types";
import toast from "react-hot-toast";

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

  const renderChart = () => (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="toan" fill="#8884d8" name="Toán" />
        <Bar dataKey="ngu_van" fill="#82ca9d" name="Ngữ văn" />
        <Bar dataKey="ngoai_ngu" fill="#ffc658" name="Ngoại ngữ" />
        <Bar dataKey="vat_li" fill="#ff8042" name="Vật lý" />
        <Bar dataKey="hoa_hoc" fill="#0088FE" name="Hóa học" />
        <Bar dataKey="sinh_hoc" fill="#00C49F" name="Sinh học" />
        <Bar dataKey="lich_su" fill="#FFBB28" name="Lịch sử" />
        <Bar dataKey="dia_li" fill="#FF8042" name="Địa lý" />
        <Bar dataKey="gdcd" fill="#AF19FF" name="GDCD" />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
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

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "7fr 3fr" },
          gap: 3,
          "& > *": {
            height: "100%",
          },
        }}
      >
        {loading && (
          <>
            <Skeleton variant="rectangular" width="100%" height={400} />
            <Skeleton variant="rectangular" width="100%" height={400} />
          </>
        )}
        {!loading && error && (
          <Paper elevation={3} sx={{ p: 3, bgcolor: "error.light" }}>
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          </Paper>
        )}
        {!loading && !error && (
          <>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Score Distribution by Subject
              </Typography>
              <Box sx={{ width: "100%" }}>{renderChart()}</Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Statistics
              </Typography>
              {renderTable()}
            </Paper>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Reports;
