export interface StudentScore {
  _id: string;
  registrationNumber: string;
  scores: {
    subject: string;
    score: number;
  }[];
  foreignLanguageCode: string;
  totalScore: number;
}

export interface Score {
  subject: string;
  score: number;
}

export interface TopStudent {
  _id: string;
  registrationNumber: string;
  foreignLanguageCode: string;
  totalScore: number;
  scores: Score[];
}

export interface ScoreClassification {
  subject: string;
  excellent: number;
  good: number;
  average: number;
  poor: number;
}

export interface ScoreClassificationResponse {
  classification: ScoreClassification[];
}
