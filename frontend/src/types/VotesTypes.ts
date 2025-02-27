import { Team, User, Role } from "types";
import { AcademicYearType } from "./UserTypes";

export type CandidateType = {
  id: number;
  cv: string;
  plan_rada: string;
  role: Role;
  team: Team;
  user: User;
  aktivnosti: string;
  predstavljanje: string;
  elections: Elections;
};

export type VotesType = {
  user?: number;
  kandidatura: number;
  is_voted: boolean;
};

export type VotesResultsType = {
  id: number;
  kandidatura: string;
  team: string;
  role: string;
  votes_yes: number;
  votes_no: number;
};

export type Elections = {
  id?: number;
  description: string;
  academic_year: AcademicYearType;
  for_leadership: string;
  for_up: string;
  for_coordinator: string;
  for_documents: string;
  active: boolean;
  vote_active: boolean;
};

export type NumberOfVotesType = {
  id: number;
  number_of_votes: number;
  team: Team;
};

export type DocumentsType = {
  id?: number;
  document_title: string;
  document_link: string;
  elections: Elections;
  deleted: boolean;
};
