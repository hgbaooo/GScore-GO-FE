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
  Container,
  useTheme,
  useMediaQuery,
  Skeleton, // Import Skeleton
} from "@mui/material";
import { getTop10Students } from "../services/studentService";
import { TopStudent } from "../types";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [topStudents, setTopStudents] = useState<TopStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Top 10 Students of Group A
          </Typography>
          <Skeleton variant="rectangular" width="100%" height={300} />
        </Paper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" color="error">
            Error: {error}
          </Typography>
        </Paper>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 3, overflow: "hidden" }}>
        <Typography variant="h6" gutterBottom>
          Top 10 Students of Group A
        </Typography>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader size={isSmallScreen ? "small" : "medium"}>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>SBD</TableCell>
                <TableCell align="right">Toán</TableCell>
                <TableCell align="right">Ngữ văn</TableCell>
                <TableCell align="right">Ngoại ngữ</TableCell>
                <TableCell align="right">Vật lý</TableCell>
                <TableCell align="right">Hóa học</TableCell>
                <TableCell align="right">Sinh học</TableCell>
                <TableCell align="right">Total Score</TableCell>{" "}
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
    </Container>
  );
};

export default Dashboard;
