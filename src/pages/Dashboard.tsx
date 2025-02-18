import { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Box,
  Container,
  useMediaQuery,
} from "@mui/material";
import { Student, ScoreCategory } from "../types";

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState<number | null>(null);
  const [topStudents, setTopStudents] = useState<Student[]>([]);
  const [scoreDistribution, setScoreDistribution] = useState<ScoreCategory[]>(
    []
  );

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setTotalStudents(150);

    setTopStudents([
      { name: "Student 1", score: 9 },
      { name: "Student 2", score: 8.8 },
      { name: "Student 3", score: 8.5 },
      { name: "Student 4", score: 8.2 },
      { name: "Student 5", score: 8.0 },
      { name: "Student 6", score: 7.9 },
      { name: "Student 7", score: 7.8 },
      { name: "Student 8", score: 7.5 },
      { name: "Student 9", score: 7.4 },
      { name: "Student 10", score: 7.2 },
    ]);

    setScoreDistribution([
      { range: ">= 8 points", count: 40 },
      { range: "6 to 8 points", count: 60 },
      { range: "4 to 6 points", count: 30 },
      { range: "< 4 points", count: 20 },
    ]);
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Main content area */}
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <Container maxWidth="lg" sx={{ marginTop: 4 }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                gap: 3,
              }}
            >
              <Paper sx={{ p: 2, flex: 1 }}>
                <Typography variant="h6">
                  Total Students: {totalStudents ?? "Loading..."}
                </Typography>
              </Paper>
              <Paper sx={{ p: 2, flex: 1 }}>
                <Typography variant="h6">Top 10 Students in Group A</Typography>
                {topStudents.length > 0 ? (
                  <ul>
                    {topStudents.map((student, index) => (
                      <li key={index}>
                        {student.name}: {student.score}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography>Loading...</Typography>
                )}
              </Paper>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
              <Paper sx={{ p: 2, flex: 1 }}>
                <Typography variant="h6">Score Distribution</Typography>
                {scoreDistribution.length > 0 ? (
                  <ul>
                    {scoreDistribution.map((category, index) => (
                      <li key={index}>
                        {category.range}: {category.count} students
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Typography>Loading...</Typography>
                )}
              </Paper>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
