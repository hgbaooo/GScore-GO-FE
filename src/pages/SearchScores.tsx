import type React from "react";

import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import { getStudentScores } from "../services/studentService";
import type { StudentScore } from "../types";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchScores = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentScore, setStudentScore] = useState<StudentScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setStudentScore(null);
    setNotFound(false);

    if (!/^\d{8}$/.test(registrationNumber)) {
      toast.error("Registration number must be 8 digits.");
      setLoading(false);
      return;
    }

    try {
      const score = await getStudentScores(registrationNumber);
      if (score) {
        setStudentScore(score);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      if (
        error instanceof Error &&
        (error as { response?: { status: number } }).response &&
        (error as { response?: { status: number } }).response?.status === 404
      ) {
        setNotFound(true);
      } else {
        toast.error("An error occurred while fetching data.");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const renderScoreCard = (subject: string, score: number | undefined) => {
    if (score === undefined || score === null) return null;
    return (
      <Card
        sx={{
          m: 1,
          flexBasis: {
            xs: "100%",
            sm: "calc(50% - 16px)",
            md: "calc(33.333% - 16px)",
          },
          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        <CardContent>
          <Typography variant="h6" component="div">
            {subject}
          </Typography>
          <Typography variant="h4" color="primary">
            {score.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box className="main-content">
      <Paper
        sx={{ padding: 3, mb: 3, width: "100%", maxWidth: 800, mx: "auto" }}
      >
        <Typography variant="h5" gutterBottom>
          Search Student Score
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, sm: 2 },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "flex-start",
          }}
        >
          <TextField
            label="Enter Registration Number"
            variant="outlined"
            fullWidth
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={loading}
            sx={{ height: 56, width: { xs: "100%", sm: "auto" } }}
          >
            Search
          </Button>
        </Box>
      </Paper>

      {notFound && (
        <Paper
          sx={{
            padding: 3,
            backgroundColor: "#ffebee",
            width: "100%",
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <Typography variant="body1" color="error">
            No student found with the provided registration number.
          </Typography>
        </Paper>
      )}

      {loading && <LoadingSpinner message="Searching for student scores..." />}

      {studentScore && (
        <Paper sx={{ padding: 3, width: "100%", maxWidth: 800, mx: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Student Scores
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
          Registration Number: {studentScore.sbd}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              margin: -1,
              gap: { xs: 1, sm: 2 },
            }}
          >
            {renderScoreCard("Math", studentScore.toan)}
            {renderScoreCard("Literature", studentScore.ngu_van)}
            {renderScoreCard("Foreign Language", studentScore.ngoai_ngu)}
            {renderScoreCard("Physics", studentScore.vat_li)}
            {renderScoreCard("Chemistry", studentScore.hoa_hoc)}
            {renderScoreCard("Biology", studentScore.sinh_hoc)}
            {renderScoreCard("History", studentScore.lich_su)}
            {renderScoreCard("Geography", studentScore.dia_li)}
            {renderScoreCard("Civics", studentScore.gdcd)}
          </Box>
          {studentScore.ma_ngoai_ngu && (
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Foreign Language Code: {studentScore.ma_ngoai_ngu}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchScores;
