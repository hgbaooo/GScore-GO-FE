import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";

const SearchScores = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentScore, setStudentScore] = useState<{
    math: number | null;
    physics: number | null;
    chemistry: number | null;
  }>({ math: null, physics: null, chemistry: null });

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = () => {
    const fakeDatabase: {
      [key: string]: { math: number; physics: number; chemistry: number };
    } = {
      "12345": { math: 8.9, physics: 7.5, chemistry: 9.2 },
      "67890": { math: 7.5, physics: 6.8, chemistry: 8.0 },
      "11223": { math: 9.2, physics: 8.7, chemistry: 9.0 },
    };

    const scores = fakeDatabase[registrationNumber] || {
      math: null,
      physics: null,
      chemistry: null,
    };
    setStudentScore(scores);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Search Student Score
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "column" : "row",
            gap: 2,
            mb: 2,
          }}
        >
          <TextField
            label="Enter Registration Number"
            variant="outlined"
            fullWidth
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            sx={{ flex: isSmallScreen ? "1 1 auto" : "1 1 70%" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              flex: isSmallScreen ? "1 1 auto" : "0 0 30%",
              height: isSmallScreen ? "auto" : "56px",
            }}
          >
            Search
          </Button>
        </Box>

        {studentScore.math !== null ? (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Student Scores
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: isSmallScreen ? "column" : "row",
                gap: 2,
              }}
            >
              {Object.entries(studentScore).map(([subject, score]) => (
                <Box
                  key={subject}
                  sx={{
                    flex: isSmallScreen ? "1 1 100%" : "1 1 calc(33.33% - 8px)",
                  }}
                >
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      textAlign: "center",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      bgcolor: "secondary.light",
                      color: "secondary.contrastText",
                    }}
                  >
                    <Typography variant="h4">{score}</Typography>
                    <Typography variant="body2">
                      {subject.charAt(0).toUpperCase() + subject.slice(1)}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        ) : (
          <Typography
            sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}
          >
            Enter a registration number and click search to view student scores.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SearchScores;
