import { UserData, User } from "./UserTypes";

import {
  Team,
  TeamGroups,
  VirtualTeam,
  NumberOfVotesPerUserType,
} from "./TeamTypes";

import { Role, RoleGroup } from "./RoleTypes";

import { CandidateType, VotesType, VotesResultsType } from "./VotesTypes";

import { CertificateRequirementsType, InfoClanType } from "./InfoTypes";

import { RoleEnum } from "./Enums";

import { LikesType } from "./LikesType";

import { QuestionType } from "./SuprachTypes";

import {
  ActivityType,
  Activity,
  ActivityListType,
  AddUserOnActivityType,
  UserOnActivityType,
  RecommendationsType,
  CreateActivityType,
} from "./ActivityTypes";

import { ProjectsType } from "./ProjectTypes";
import {
  PartnerDataType,
  PartnerNotesCreateType,
  PartnerNotesListType,
  PartnersContactCreateType,
  PartnersContactListType,
  PartnerListTableType,
  PartnerNotesType,
  NotesPerYearType,
} from "./PartnerTypes";

//for enums
export { RoleEnum };

export type {
  LikesType,
  CreateActivityType,
  InfoClanType,
  PartnerNotesType,
  NotesPerYearType,
  PartnerListTableType,
  ProjectsType,
  PartnerDataType,
  PartnerNotesCreateType,
  PartnerNotesListType,
  PartnersContactCreateType,
  PartnersContactListType,
  UserData,
  TeamGroups,
  Team,
  User,
  VirtualTeam,
  Role,
  RoleGroup,
  CandidateType,
  NumberOfVotesPerUserType,
  VotesType,
  VotesResultsType,
  ActivityType,
  Activity,
  ActivityListType,
  AddUserOnActivityType,
  UserOnActivityType,
  RecommendationsType,
  CertificateRequirementsType,
  QuestionType,
};
