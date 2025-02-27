import { lazy } from "react";

const InfoAdmin = lazy(() => import("./infoAdmin/InfoAdmin"));
const InfoAdminUpdateSpecificRow = lazy(
  () => import("./infoAdmin/InfoAdminUpdateSpecificRow")
);
const InfoAdminButtons = lazy(() => import("./infoAdmin/InfoAdminButtons"));

const InfoList = lazy(() => import("./InfoList"));
const InfoListCertificateRequirements = lazy(
  () => import("./InfoListCertificateRequirements")
);

const InfoListClan = lazy(() => import("./InfoClan/InfoListClan"));
const InfoListVoditelj = lazy(() => import("./InfoVoditelj/InfoListVoditelj"));
const InfoListKoordinator = lazy(
  () => import("./InfoKoordinator/InfoListKoordinator")
);
const ScanQrCodeModal = lazy(() => import("./ScanQrCodeModal"));
const InfoListForSpecificTeamLeader = lazy(
  () => import("./InfoListForSpecificTeamLeader")
);

const InfoListForSpecificTeamMember = lazy(
  () => import("./InfoListForSpecificTeamMember")
);
export {
  ScanQrCodeModal,
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
};
