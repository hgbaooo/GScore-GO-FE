import axios from "axios";
import { StudentScore } from "../types";

const API_URL = import.meta.env.VITE_SERVER_CONNECTION_URL;

if (!API_URL) {
  throw new Error("Missing VITE_SERVER_CONNECTION_URL environment variable");
}

export const getStudentScores = async (sbd?: string): Promise<StudentScore> => {
  try {
    const url = `${API_URL}/students/find?sbd=${sbd}`;
    const response = await axios.get<StudentScore>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching student scores:", error);
    throw error;
  }
};
