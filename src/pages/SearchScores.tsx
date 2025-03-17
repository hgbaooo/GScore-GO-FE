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
import { getStudentByRegistrationNumber } from "../services/studentService";
import type { StudentScore } from "../types";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";

const SearchScores = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentScore, setStudentScore] = useState<StudentScore | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    // Reset states
    setLoading(true);
    setStudentScore(null);
    setNotFound(false);

    // Validate registration number
    if (!/^\d{8}$/.test(registrationNumber.trim())) {
      toast.error("Registration number must be 8 digits.");
      setLoading(false);
      return;
    }

    try {
      const score = await getStudentByRegistrationNumber(
        registrationNumber.trim()
      );
      if (score) {
        setStudentScore(score);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      const isNotFound =
        error instanceof Error &&
        (error as { response?: { status: number } }).response?.status === 404;

      if (isNotFound) {
        setNotFound(true);
      } else {
        toast.error("An error occurred while fetching data.");
        console.error("Search error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const subjectMap = {
    toan: "Math",
    ngu_van: "Literature",
    ngoai_ngu: "Foreign Language",
    vat_li: "Physics",
    hoa_hoc: "Chemistry",
    sinh_hoc: "Biology",
    lich_su: "History",
    dia_li: "Geography",
    gdcd: "Civics",
  } as const;

  type SubjectKey = keyof typeof subjectMap;

  const renderScoreCard = (subject: string, subjectKey: SubjectKey) => {
    if (!studentScore?.scores) return null;

    try {
      const scoreData = studentScore.scores.find(
        (s) => s.subject === subjectKey
      );

      if (!scoreData?.score && scoreData?.score !== 0) return null;

      return (
        <Card
          key={subjectKey}
          sx={{
            m: 1,
            flexBasis: {
              xs: "calc(100% - 16px)", // Full width on mobile
              sm: "calc(50% - 16px)", // Two cards per row on tablet
              lg: "calc(33.333% - 16px)", // Three cards per row on desktop
            },
            flexGrow: 1,
            flexShrink: 0,
            minWidth: {
              xs: "280px",
              sm: "240px",
              lg: "220px",
            },
            maxWidth: {
              xs: "100%",
              sm: "320px",
              lg: "300px",
            },
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 4,
            },
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                mb: 2,
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {subject}
            </Typography>
            <Typography
              variant="h3"
              color="primary"
              sx={{
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              {scoreData.score.toFixed(2)}
            </Typography>
          </CardContent>
        </Card>
      );
    } catch (error) {
      console.error(`Error rendering score card for ${subject}:`, error);
      return null;
    }
  };

  const renderScoreCards = () =>
    Object.entries(subjectMap).map(([key, label]) =>
      renderScoreCard(label, key as SubjectKey)
    );

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
        <Paper sx={{ padding: 3, width: "100%", maxWidth: 1000, mx: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Student Scores
          </Typography>
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              Registration Number: {studentScore.registrationNumber}
            </Typography>
            {studentScore.foreignLanguageCode && (
              <Typography variant="subtitle1">
                Foreign Language Code: {studentScore.foreignLanguageCode}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              margin: -1,
              gap: { xs: 2, sm: 2, lg: 3 },
              justifyContent: "center",
            }}
          >
            {renderScoreCards()}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SearchScores;
