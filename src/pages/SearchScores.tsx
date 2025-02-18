import { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

const SearchScores = () => {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [studentScore, setStudentScore] = useState<number | null>(null);

  const handleSearch = () => {
    const fakeDatabase: { [key: string]: number } = {
      "12345": 8.9,
      "67890": 7.5,
      "11223": 9.2,
    };

    setStudentScore(fakeDatabase[registrationNumber] || null);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6">Search Student Score</Typography>
        <TextField
          label="Enter Registration Number"
          variant="outlined"
          fullWidth
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>

        {studentScore !== null ? (
          <Typography sx={{ marginTop: 2 }}>Score: {studentScore}</Typography>
        ) : (
          <Typography sx={{ marginTop: 2, color: "red" }}>
            Student not found.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default SearchScores;
