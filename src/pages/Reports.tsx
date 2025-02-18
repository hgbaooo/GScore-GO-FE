import { useState } from "react";
import { Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const Reports = () => {
  const [data] = useState([
    { category: "A", count: 12 },
    { category: "B", count: 19 },
    { category: "C", count: 3 },
    { category: "D", count: 5 },
    { category: "E", count: 2 },
  ]);

  return (
    <div>
      <Typography variant="h4">Reports</Typography>
      <BarChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#3f51b5" />
      </BarChart>
    </div>
  );
};

export default Reports;
