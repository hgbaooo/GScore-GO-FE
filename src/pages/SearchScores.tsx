import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { getStudentScores } from "../services/studentService";
import { StudentScore } from "../types";
import toast from "react-hot-toast";

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

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 2, mb: 2 }}>
        <Typography variant="h6">Search Student Score</Typography>
        <TextField
          label="Enter Registration Number"
          variant="outlined"
          fullWidth
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Search"}
        </Button>
      </Paper>

      {notFound && (
        <Paper sx={{ padding: 2, backgroundColor: "#ffebee" }}>
          <Typography variant="body1" color="error">
            No student found with the provided registration number.
          </Typography>
        </Paper>
      )}

      {studentScore && (
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Student Scores</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography>SBD: {studentScore.sbd}</Typography>
            <Typography>Toán: {studentScore.toan}</Typography>
            <Typography>Ngữ văn: {studentScore.ngu_van}</Typography>
            <Typography>Ngoại ngữ: {studentScore.ngoai_ngu}</Typography>
            <Typography>Vật lý: {studentScore.vat_li}</Typography>
            <Typography>Hóa học: {studentScore.hoa_hoc}</Typography>
            <Typography>Sinh học: {studentScore.sinh_hoc}</Typography>
            <Typography>Lịch sử: {studentScore.lich_su}</Typography>
            <Typography>Địa lý: {studentScore.dia_li}</Typography>
            <Typography>GDCD: {studentScore.gdcd}</Typography>
            <Typography>Mã ngoại ngữ: {studentScore.ma_ngoai_ngu}</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default SearchScores;
