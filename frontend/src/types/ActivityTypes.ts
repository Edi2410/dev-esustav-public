import { Team, VirtualTeam } from "./TeamTypes";
import { AcademicYearType, User } from "./UserTypes";

export type ActivityType = {
  id: number;
  name: string;
  has_hour: boolean;
};

export type Activity = {
  title: string;
  description: string;
  date: string;
  location: string;
  responsible_user: User;
  team: Team;
  virtual_team: VirtualTeam;
  activity_type: ActivityType;
  academic_year: AcademicYearType;
};

export type CreateActivityType = {
  id?: number;
  title: string;
  description: string;
  date: string;
  location: string;
  responsible_user: number;
  team: number;
  virtual_team: number;
  activity_type: number;
  academic_year: number;
};

export type ActivityListType = Activity & {
  id: number;
};

export type AddUserOnActivityType = {
  user: number;
  activity: number;
  hours?: number;
  academic_year?: number;
};

export type UserOnActivityType = {
  id: number;
  user: User;
  activity: Activity;
  hours: number;
};

export type RecommendationsType = {
  id: string;
  user_id: string;
  user: string;
  recommendation: string;
  recommender: string;
  passed: string;
};
