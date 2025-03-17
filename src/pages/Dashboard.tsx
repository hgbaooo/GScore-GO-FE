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
import { getTop10GroupA } from "../services/studentService";
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
        const data = await getTop10GroupA();
        setTopStudents(data);
      } catch (err) {
        toast.error("Failed to fetch top students data.");
        setError(err instanceof Error ? err.message : "An error occurred");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const subjectMap: { [key: string]: string } = {
    toan: "Mathematics",
    vat_li: "Physics",
    hoa_hoc: "Chemistry",
  };

  if (loading) {
    return <LoadingSpinner message="Loading top students data..." />;
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
      <Paper
        elevation={3}
        sx={{ p: 3, width: "100%", maxWidth: 1200, mx: "auto" }}
      >
        <Typography variant="h6" gutterBottom>
          Top 10 Students - Group A
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Registration Number</TableCell>
                {Object.values(subjectMap).map((subject) => (
                  <TableCell key={subject} align="right">
                    {subject}
                  </TableCell>
                ))}
                <TableCell align="right">Total Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topStudents.map((student, index) => (
                <TableRow key={student._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{student.registrationNumber}</TableCell>
                  {Object.keys(subjectMap).map((key) => {
                    const score = student.scores.find(
                      (s) => s.subject === key
                    )?.score;
                    return (
                      <TableCell key={key} align="right">
                        {score !== undefined ? score.toFixed(2) : "-"}
                      </TableCell>
                    );
                  })}
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
