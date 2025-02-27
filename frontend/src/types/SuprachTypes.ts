import { AcademicYearType } from "./UserTypes";

export type QuestionType = {
  id: number;
  description: string;
};

export type SuprachType = {
  id: number;
  academic_year: AcademicYearType;
  active: boolean;
  end_date: string;
  grading_active: boolean;
  round: number;
  start_date: string;
};

export type CommentsType = {
  comment: string;
  id: number;
  suprach: SuprachType;
  user: number;
};

export type ScoreAvgType = {
  avg_score: number;
  question__description: string;
  question__id: number;
};

export type SpecialUserDataType = {
  comments: CommentsType[];
  scores: ScoreAvgType[];
  user: string;
};
