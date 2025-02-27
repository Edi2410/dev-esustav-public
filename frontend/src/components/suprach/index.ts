import { lazy } from "react";

const Grading = lazy(() => import("./Grading"));
const OverviewHome = lazy(() => import("./overview/OverviewHome"));
const GradesOverview = lazy(() => import("./overview/GradesOverview"));
const CommentsOverview = lazy(() => import("./overview/CommentsOverview"));
const UsersWhoNotFillSuprach = lazy(
  () => import("./overview/UsersWhoNotFillSuprach")
);
const CommentsAndGradesForSpecial = lazy(
  () => import("./overview/CommentsAndGradesForSpecial")
);
const CommentsButtonAndModalAndForm = lazy(
  () => import("./comments/CommentsButtonAndModalAndForm")
);

export {
  Grading,
  OverviewHome,
  GradesOverview,
  CommentsOverview,
  CommentsButtonAndModalAndForm,
  CommentsAndGradesForSpecial,
  UsersWhoNotFillSuprach,
};
