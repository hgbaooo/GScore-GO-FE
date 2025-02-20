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
      toast.error("An error occurred while fetching data.");
      console.error(error);
    } finally {
      setLoading(false);
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
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <TextField
            label="Enter Registration Number"
            variant="outlined"
            fullWidth
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            disabled={loading}
            sx={{ height: 56 }}
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
            SBD: {studentScore.sbd}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", margin: -1 }}>
            {renderScoreCard("Toán", studentScore.toan)}
            {renderScoreCard("Ngữ văn", studentScore.ngu_van)}
            {renderScoreCard("Ngoại ngữ", studentScore.ngoai_ngu)}
            {renderScoreCard("Vật lý", studentScore.vat_li)}
            {renderScoreCard("Hóa học", studentScore.hoa_hoc)}
            {renderScoreCard("Sinh học", studentScore.sinh_hoc)}
            {renderScoreCard("Lịch sử", studentScore.lich_su)}
            {renderScoreCard("Địa lý", studentScore.dia_li)}
            {renderScoreCard("GDCD", studentScore.gdcd)}
          </Box>
          {studentScore.ma_ngoai_ngu && (
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Mã ngoại ngữ: {studentScore.ma_ngoai_ngu}
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchScores;
