import {
  InfoList,
  InfoAdmin,
  InfoListForSpecificTeamLeader,
  InfoListForSpecificTeamMember,
} from "components";
import { Flex, Segmented, Spin } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import React, { Suspense } from "react";
import { RoleEnum } from "@types";
import { useUserContext } from "hooks/useUserContext";

export const HomePageInfo = () => {
  const [page, setPage] = React.useState<SegmentedValue>("infoList");
  const { user } = useUserContext();

  return (
    <div className="footerSize" style={{ margin: "0 2%" }}>
      {user?.permissions?.admin ? (
        user?.role.name === RoleEnum.Voditelj ? (
          <Segmented
            style={{ marginBottom: "20px" }}
            className="segmented"
            options={[
              { label: "eINFO", value: "infoList" },
              { label: "eINFO admin", value: "eInfoAdmin" },
              {
                label: `eINFO za ${user.team.short_name}`,
                value: "eInfoMember",
              },
            ]}
            onChange={(value) => setPage(value)}
          />
        ) : (
          <Segmented
            style={{ marginBottom: "20px" }}
            className="segmented"
            options={[
              { label: "eINFO", value: "infoList" },
              { label: "eINFO admin", value: "eInfoAdmin" },
              {
                label: `eINFO za ${user.team_group.short_name}`,
                value: "eInfoLeaders",
              },
            ]}
            onChange={(value) => setPage(value)}
          />
        )
      ) : user?.role.name === RoleEnum.Voditelj ? (
        <Segmented
          style={{ marginBottom: "20px" }}
          className="segmented"
          options={[
            { label: "eINFO", value: "infoList" },
            {
              label: `eINFO za tim ${user.team.short_name}`,
              value: "eInfoMember",
            },
          ]}
          onChange={(value) => setPage(value)}
        />
      ) : user?.role.name === RoleEnum.Koordinator ? (
        <Segmented
          style={{ marginBottom: "20px" }}
          className="segmented"
          options={[
            { label: "eINFO", value: "infoList" },
            {
              label: `eINFO za skupinu ${user.team_group.short_name}`,
              value: "eInfoLeaders",
            },
          ]}
          onChange={(value) => setPage(value)}
        />
      ) : (
        <> </>
      )}

      {page === "infoList" ? (
        <Suspense fallback={<Spin size="small" />}>
          <InfoList />
        </Suspense>
      ) : page === "eInfoMember" ? (
        <Suspense fallback={<Spin size="small" />}>
          <InfoListForSpecificTeamMember />
        </Suspense>
      ) : page === "eInfoLeaders" ? (
        <Suspense fallback={<Spin size="small" />}>
          <InfoListForSpecificTeamLeader />
        </Suspense>
      ) : page === "eInfoAdmin" ? (
        <Suspense fallback={<Spin size="small" />}>
          <InfoAdmin />
        </Suspense>
      ) : (
        <Suspense fallback={<Spin size="small" />}>
          <InfoList />
        </Suspense>
      )}
    </div>
  );
};
