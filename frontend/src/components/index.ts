import { lazy } from "react";

import {
  Candidate,
  ElectionsVoditelji,
  VotesFormVoditelji,
  ElectionsUP,
  VotesFormUP,
  Documents,
  ElectionsDocuments,
  VotesFormDocuments,
} from "./eIzbori";

import {
  ActivityList,
  Recommendations,
  AddActivityButton,
  ActivityForm,
  DeleteActivity,
  EditActivity,
  UserOnActivityModal,
  RecommendationsForm,
  RecommendationsModal,
  QrCodeModal,
  ActivityCards,
} from "./eaktivnosti";

import {
  InfoAdmin,
  InfoAdminButtons,
  InfoAdminUpdateSpecificRow,
  InfoList,
  InfoListCertificateRequirements,
  InfoListClan,
  InfoListVoditelj,
  InfoListKoordinator,
  InfoListForSpecificTeamMember,
  InfoListForSpecificTeamLeader,
  ScanQrCodeModal,
} from "./eInfo";

import {
  PartnerForm,
  AddNewPartnerModal,
  AddNewContactsModal,
  ContactsForm,
  DeleteContactsButton,
  EditContactModal,
  NotesForm,
  AddNewNotesModal,
  EditNotesButton,
  DeleteNotesButton,
  EditPartnerButton,
} from "./ePartneri";

import {
  Grading,
  OverviewHome,
  GradesOverview,
  CommentsOverview,
  CommentsButtonAndModalAndForm,
  CommentsAndGradesForSpecial,
  UsersWhoNotFillSuprach,
} from "./suprach";

import { UploadUsers } from "./eAdmin";

const NavBar = lazy(() => import("./NavBar"));
import RoutesList from "./RoutesList";
const HomeOption = lazy(() => import("./HomeOption"));
import NoPermission from "./NoPermission";

export {
  InfoListVoditelj,
  InfoListKoordinator,
  NoPermission,
  PartnerForm,
  AddNewPartnerModal,
  NavBar,
  InfoListCertificateRequirements,
  InfoAdminButtons,
  RoutesList,
  UploadUsers,
  Candidate,
  HomeOption,
  ActivityList,
  InfoListClan,
  Recommendations,
  RecommendationsForm,
  RecommendationsModal,
  AddActivityButton,
  ActivityForm,
  EditActivity,
  DeleteActivity,
  UserOnActivityModal,
  GradesOverview,
  CommentsOverview,
  InfoAdmin,
  InfoList,
  InfoAdminUpdateSpecificRow,
  AddNewContactsModal,
  ContactsForm,
  DeleteContactsButton,
  EditContactModal,
  NotesForm,
  AddNewNotesModal,
  ScanQrCodeModal,
  DeleteNotesButton,
  EditNotesButton,
  InfoListForSpecificTeamMember,
  InfoListForSpecificTeamLeader,
  QrCodeModal,
  ActivityCards,
  Grading,
  OverviewHome,
  CommentsButtonAndModalAndForm,
  EditPartnerButton,
  CommentsAndGradesForSpecial,
  UsersWhoNotFillSuprach,
  ElectionsVoditelji,
  VotesFormVoditelji,
  ElectionsUP,
  VotesFormUP,
  Documents,
  ElectionsDocuments,
  VotesFormDocuments,
};
