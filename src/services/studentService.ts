import axios from "axios";
import { StudentScore, TopStudent } from "../types";

const API_URL = import.meta.env.VITE_SERVER_CONNECTION_URL;

if (!API_URL) {
  throw new Error("Missing VITE_SERVER_CONNECTION_URL environment variable");
}

export const getStudentByRegistrationNumber = async (
  registrationNumber: string
): Promise<StudentScore> => {
  try {
    const url = `${API_URL}/students/${registrationNumber}`;
    const response = await axios.get<StudentScore>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching student scores:", error);
    throw error;
  }
};

export const getTop10GroupA = async (): Promise<TopStudent[]> => {
  try {
    const url = `${API_URL}/students/top10-groupA`;
    const response = await axios.get<TopStudent[]>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching top 10 students:", error);
    throw error;
  }
};
