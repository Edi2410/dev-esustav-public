import { lazy } from "react";

const ActivityList = lazy(() => import("./activity/ActivityList"));
const AddActivityButton = lazy(() => import("./activity/AddActivityButton"));
const EditActivity = lazy(() => import("./activity/EditActivity"));
const DeleteActivity = lazy(() => import("./activity/DeleteActivity"));
const UserOnActivityModal = lazy(
  () => import("./activity/UserOnActivityModal")
);
const QrCodeModal = lazy(() => import("./activity/QrCodeModal"));

const ActivityForm = lazy(() => import("./activity/ActivityForm"));

const Recommendations = lazy(
  () => import("./teamLeadRecomendations/Recommendations")
);
const RecommendationsModal = lazy(
  () => import("./teamLeadRecomendations/RecommendationsModal")
);
const RecommendationsForm = lazy(
  () => import("./teamLeadRecomendations/RecommendationsForm")
);

const ActivityCards = lazy(() => import("./activityMobile/ActivityCards"));

export {
  ActivityList,
  Recommendations,
  AddActivityButton,
  ActivityForm,
  EditActivity,
  DeleteActivity,
  UserOnActivityModal,
  RecommendationsForm,
  RecommendationsModal,
  QrCodeModal,
  ActivityCards,
};
