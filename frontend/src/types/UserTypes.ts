import { Team, VirtualTeam, Role, TeamGroups } from "types";
import { SuprachType } from "./SuprachTypes";

export type UserData = {
  user: User;
  team: Team;
  virtual_team: VirtualTeam;
  team_group: TeamGroups;
  role: Role;
  csrf_token: string;
  academic_year: AcademicYearType;
  permissions: UserPermissionsType;
};

export type User = {
  id: number;
  password: string;
  last_login: string;
  is_superuser: boolean;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  data_joined: string;
  deleted: boolean;
  gender: string;
  user_permissions: string[];
  groups: [];
  photo: string;
};

export type AcademicYearType = {
  id: number;
  start_date: string;
  end_date: string;
  description: string;
  short: string;
};

export type UserPermissionsType = {
  id: number;
  user: number;
  academic_year: number;
  info: boolean;
  aktivnosti: boolean;
  partneri: boolean;
  izbori: boolean;
  admin: boolean;
  suprach: boolean;
  suprach_admin: boolean;
  can_vote: boolean;
};

export type UserToGrade = User & {
  graded: boolean;
};

export type SpecialUserToGrade = {
  id: number;
  name: string;
  graded: boolean;
};
