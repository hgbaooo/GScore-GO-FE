import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { getTop10Students } from "../services/studentService";
import type { TopStudent } from "../types";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const students = await getTop10Students();
        setTopStudents(students);
      } catch (err) {
        toast.error("Failed to fetch top students.");
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading top students..." />;
  }

  if (error) {
    return (
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Paper elevation={3} sx={{ p: 3, maxWidth: "lg", width: "100%" }}>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box className="main-content">
      <Typography variant="h4" gutterBottom align="center">
        Dashboard
      </Typography>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: 1200,
          overflow: "hidden",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Top 10 Students of Group A
        </Typography>
        <TableContainer sx={{ maxWidth: "100%", overflow: "auto" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Registration Number</TableCell>
                <TableCell align="right">Math</TableCell>
                <TableCell align="right">Literature</TableCell>
                <TableCell align="right">Foreign Language</TableCell>
                <TableCell align="right">Physics</TableCell>
                <TableCell align="right">Chemistry</TableCell>
                <TableCell align="right">Biology</TableCell>
                <TableCell align="right">Total Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topStudents.map((student, index) => (
                <TableRow key={student.sbd} hover>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{student.sbd}</TableCell>
                  <TableCell align="right">{student.toan.toFixed(1)}</TableCell>
                  <TableCell align="right">
                    {student.ngu_van.toFixed(1)}
                  </TableCell>
                  <TableCell align="right">
                    {student.ngoai_ngu.toFixed(1)}
                  </TableCell>
                  <TableCell align="right">
                    {student.vat_li.toFixed(1)}
                  </TableCell>
                  <TableCell align="right">
                    {student.hoa_hoc.toFixed(1)}
                  </TableCell>
                  <TableCell align="right">
                    {student.sinh_hoc.toFixed(1)}
                  </TableCell>
                  <TableCell align="right">
                    {student.totalScore.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;
