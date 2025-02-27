import { AcademicYearType, User } from "./UserTypes";

export type CertificateRequirementsType = {
  id: number;
  user: User;
  academic_year: AcademicYearType;
  suprach_1: boolean;
  suprach_2: boolean;
  zivotopis: boolean;
  bootcamp: boolean;
};

export type InfoClanType = {
  aktivnost: string;
  potrebno: number;
  odrzano: number;
  prisustvovao: number;
  postotak: boolean;
};
