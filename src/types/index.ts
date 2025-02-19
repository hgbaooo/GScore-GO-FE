export interface StudentScore {
  _id: string;
  sbd: string;
  toan: number;
  ngu_van: number;
  ngoai_ngu: number;
  vat_li: number;
  hoa_hoc: number;
  sinh_hoc: number;
  lich_su: number;
  dia_li: number;
  gdcd: number;
  ma_ngoai_ngu: string;
  __v: number;
}

export interface TopStudent {
  _id: string;
  sbd: string;
  toan: number;
  ngu_van: number;
  ngoai_ngu: number;
  vat_li: number;
  hoa_hoc: number;
  sinh_hoc: number;
  ma_ngoai_ngu: string;
  __v: number;
  totalScore: number;
}

export interface ReportData {
  ">=8": SubjectScores;
  "6-8": SubjectScores;
  "4-6": SubjectScores;
  "<4": SubjectScores;
}

export interface SubjectScores {
  toan: number;
  ngu_van: number;
  ngoai_ngu: number;
  vat_li: number;
  hoa_hoc: number;
  sinh_hoc: number;
  lich_su: number;
  dia_li: number;
  gdcd: number;
}
