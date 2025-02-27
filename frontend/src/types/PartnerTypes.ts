import { ProjectsType } from "./ProjectTypes";
import { AcademicYearType } from "./UserTypes";

export type PartnerDataType = {
  id?: number;
  legal_name: string;
  brand_name: string;
  oib: string;
  address: string;
  black_list: boolean;
};

export type PartnerListTableType = {
  partner: PartnerDataType;
  projects: string[];
};

export type PartnersContactListType = {
  id: number;
  partner: PartnerDataType;
  name: string;
  position: string;
  email: string;
  phone_number: string;
  date: string;
};

export type PartnersContactCreateType = {
  id?: number;
  partner: number;
  name: string;
  position: string;
  email: string;
  phone_number: string;
  date: string;
};

export type PartnerNotesCreateType = {
  id?: number;
  partner: number;
  academic_year: number;
  project: number;
  notes: string;
  date: string;
};

export type PartnerNotesListType = {
  id?: number;
  partner: PartnerDataType;
  academic_year: AcademicYearType;
  project: ProjectsType;
  notes: string;
  date: string;
};

export type PartnerNotesType = {
  partner: PartnerDataType;
  notes: NotesPerYearType[];
  contacts: PartnersContactListType[];
};

export type NotesPerYearType = {
  academic_year: string;
  year_notes: PartnerNotesListType[];
};
