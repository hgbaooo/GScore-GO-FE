"use client";

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
} from "@mui/material";

interface Student {
  name: string;
  math: number;
  physics: number;
  chemistry: number;
}

const Dashboard = () => {
  const [topStudents, setTopStudents] = useState<Student[]>([]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    // Simulated data fetch
    const fetchedStudents: Student[] = [
      { name: "Student 1", math: 9.5, physics: 9.2, chemistry: 9.8 },
      { name: "Student 2", math: 9.3, physics: 9.4, chemistry: 9.1 },
      { name: "Student 3", math: 9.2, physics: 9.0, chemistry: 9.5 },
      { name: "Student 4", math: 9.0, physics: 9.3, chemistry: 9.2 },
      { name: "Student 5", math: 8.9, physics: 9.1, chemistry: 9.0 },
      { name: "Student 6", math: 8.8, physics: 8.9, chemistry: 9.3 },
      { name: "Student 7", math: 8.7, physics: 9.0, chemistry: 8.9 },
      { name: "Student 8", math: 8.6, physics: 8.8, chemistry: 9.1 },
      { name: "Student 9", math: 8.5, physics: 8.7, chemistry: 9.0 },
      { name: "Student 10", math: 8.4, physics: 8.6, chemistry: 8.8 },
    ];
    setTopStudents(fetchedStudents);
  }, []);

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
                <TableCell>Name</TableCell>
                <TableCell align="right">Math</TableCell>
                <TableCell align="right">Physics</TableCell>
                <TableCell align="right">Chemistry</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topStudents.map((student, index) => (
                <TableRow key={student.name} hover>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell align="right">{student.math.toFixed(1)}</TableCell>
                  <TableCell align="right">
                    {student.physics.toFixed(1)}
                  </TableCell>
                  <TableCell align="right">
                    {student.chemistry.toFixed(1)}
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
