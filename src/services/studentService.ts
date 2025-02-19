import axios from "axios";
import { StudentScore, TopStudent, ReportData } from "../types";

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

export const getTop10Students = async (): Promise<TopStudent[]> => {
  try {
    const url = `${API_URL}/students/top10-groupA`;
    const response = await axios.get<TopStudent[]>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching top 10 students:", error);
    throw error;
  }
};

export const getReportData = async (): Promise<ReportData> => {
  try {
    const url = `${API_URL}/students/report`;
    const response = await axios.get<ReportData>(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching report data:", error);
    throw error;
  }
};
