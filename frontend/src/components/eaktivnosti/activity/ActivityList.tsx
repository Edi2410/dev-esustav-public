import React, { Suspense, useState } from "react";
import { AddActivityButton, UserOnActivityModal } from "components";
import { Typography, Table, Spin } from "antd";
import {
  useActivityTableConfigurations,
  useActivityTableConfigurationsWithoutPersonAndLocation,
} from "configurations";
import { ActivityListType, RoleEnum } from "types";
import { useMediaQuery } from "react-responsive";
import { ActivityCards } from "..";
import { useGetAllActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useGetAllActivity";
import { useUserContext } from "hooks/useUserContext";

const ActivityList = () => {
  const { user } = useUserContext();
  const [isUserModalActive, setIsUserModalActive] = useState(false);
  const [activity, setActivity] = useState<ActivityListType>();
  const activityTableConfigurations = useActivityTableConfigurations();
  const activityTableConfigurationsWithoutPersonAndLocation =
    useActivityTableConfigurationsWithoutPersonAndLocation();
  const { data: activityData, isLoading } = useGetAllActivity();
  const isCard = useMediaQuery({
    query: "(max-width: 562px)",
  });
  const isShortTable = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  return (
    <>
      <div className="headerButton">
        <Typography.Title style={{ color: "white" }} level={3}>
          Unos aktivnosti
        </Typography.Title>
        {user?.role.name !== RoleEnum.Clan && (
          <Suspense fallback={<Spin size="small" />}>
            <AddActivityButton />
          </Suspense>
        )}
      </div>
      {isCard ? (
        <Suspense fallback={<Spin size="small" />}>
          <ActivityCards
            activityData={activityData}
            setIsUserModalActive={setIsUserModalActive}
            setActivity={setActivity}
          />
        </Suspense>
      ) : (
        <Table
          className="containerShadow"
          style={{ marginLeft: "2%", marginRight: "2%" }}
          size="small"
          onRow={(record) => ({
            onClick: () => {
              if (
                (user?.role.name === RoleEnum.Voditelj ||
                  user?.role.name === RoleEnum.Koordinator) &&
                (user.team.id === record.team.id ||
                  user?.team_group.name === "Informacijske tehnologije" ||
                  (user?.role.name === RoleEnum.Koordinator &&
                    user.team_group.id === record.team.TeamGroups.id))
              ) {
                setIsUserModalActive(true);
                setActivity(record);
              }
            },
          })}
          dataSource={activityData}
          loading={isLoading}
          columns={
            isShortTable
              ? activityTableConfigurationsWithoutPersonAndLocation
              : activityTableConfigurations
          }
          rowKey="id"
        />
      )}

      <Suspense fallback={<Spin size="small" />}>
        <UserOnActivityModal
          activity={activity}
          isUserModalActive={isUserModalActive}
          setIsUserModalActive={setIsUserModalActive}
          setActivity={setActivity}
        />
      </Suspense>
    </>
  );
};
export default ActivityList;
