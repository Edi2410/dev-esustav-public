import { lazy } from "react";

const Candidate = lazy(() => import("./Candidate"));
const ElectionsVoditelji = lazy(() => import("./voditelji/ElectionsVoditelji"));
const VotesFormVoditelji = lazy(() => import("./voditelji/VotesFormVoditelji"));
const ElectionsUP = lazy(() => import("./up/ElectionsUP"));
const VotesFormUP = lazy(() => import("./up/VotesFormUP"));
const Documents = lazy(() => import("./dokumenti/Documents"));
const ElectionsDocuments = lazy(() => import("./dokumenti/ElectionsDocuments"));
const VotesFormDocuments = lazy(() => import("./dokumenti/VotesFormDocuments"));

export {
  Candidate,
  ElectionsVoditelji,
  VotesFormVoditelji,
  ElectionsUP,
  VotesFormUP,
  Documents,
  ElectionsDocuments,
  VotesFormDocuments,
};
