import axios from "axios";
import { ScoreClassification, ScoreClassificationResponse } from "../types";

const API_URL = import.meta.env.VITE_SERVER_CONNECTION_URL;

if (!API_URL) {
  throw new Error("Missing VITE_SERVER_CONNECTION_URL environment variable");
}

export const getScoreClassification = async (): Promise<
  ScoreClassification[]
> => {
  try {
    const url = `${API_URL}/scores/classification`;
    const response = await axios.get<ScoreClassificationResponse>(url);
    return response.data.classification;
  } catch (error) {
    console.error("Error fetching score classification:", error);
    throw error;
  }
};
