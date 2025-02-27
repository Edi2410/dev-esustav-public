import React, { useEffect, useState } from "react";
import { ActivityListType, RoleEnum } from "@types";
import {
  Button,
  Card,
  Descriptions,
  Flex,
  Layout,
  Pagination,
  Space,
} from "antd";

import moment from "moment";
import { DeleteActivity, EditActivity, QrCodeModal } from "@components";
import { useUserContext } from "hooks/useUserContext";

interface Props {
  activityData: ActivityListType[];
  setIsUserModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setActivity: React.Dispatch<
    React.SetStateAction<ActivityListType | undefined>
  >;
}

const ActivityCards = ({
  activityData,
  setIsUserModalActive,
  setActivity,
}: Props) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedActivities, setDisplayedActivities] = useState<
    ActivityListType[]
  >([]);
  const { user } = useUserContext();

  useEffect(() => {
    if (activityData && activityData.length > 0) {
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = Math.min(startIndex + pageSize, activityData?.length);
      setDisplayedActivities(activityData.slice(startIndex, endIndex));
    } else {
      setDisplayedActivities([]);
    }
  }, [activityData, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Pagination
        className="containerShadow"
        style={{ margin: "0 5%", padding: "5px 0", backgroundColor: "white" }}
        current={currentPage}
        pageSize={pageSize}
        total={activityData?.length}
        onChange={handlePageChange}
      />
      {displayedActivities?.map((activity: ActivityListType) => (
        <Card
          className="containerShadow"
          title={activity.title}
          style={{ margin: "5%" }}
          key={activity.id}
          extra={
            (user?.role.name === RoleEnum.Voditelj ||
              user?.role.name === RoleEnum.Koordinator) &&
            (user.team.id === activity.team.id ||
              user?.team_group.name === "Informacijske tehnologije" ||
              (user?.role.name === RoleEnum.Koordinator &&
                user.team_group.id === activity.team.TeamGroups.id)) ? (
              <div onClick={(e) => e.stopPropagation()}>
                <QrCodeModal activity={activity} />
                <EditActivity activity={activity} />
                <DeleteActivity activityID={activity.id} />
              </div>
            ) : null
          }
        >
          <Descriptions>
            <Descriptions.Item label="Vrsta">
              {activity?.activity_type?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Datum">
              {moment(activity?.date).format("DD.MM.YYYY")}
            </Descriptions.Item>
            <Descriptions.Item label="Lokacija">
              {activity?.location}
            </Descriptions.Item>
            <Descriptions.Item label="Organizator">
              {activity?.team?.short_name}
              {activity?.virtual_team !== null &&
                `(${activity?.virtual_team?.short_name})`}
            </Descriptions.Item>
            <Descriptions.Item label="Odgovorna osoba">
              {activity?.responsible_user?.first_name +
                " " +
                activity?.responsible_user?.last_name}
            </Descriptions.Item>
          </Descriptions>
          <Flex justify="flex-end">
            <Button
              type="primary"
              onClick={() => {
                if (user?.role.name === RoleEnum.Clan) return;
                setIsUserModalActive(true);
                setActivity(activity);
              }}
            >
              Unesi prisutne
            </Button>
          </Flex>
        </Card>
      ))}
    </>
  );
};

export default ActivityCards;
