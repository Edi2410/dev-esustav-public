import moment from "moment";
import { ColumnsType } from "antd/es/table";
import { ActivityListType, ActivityType, RoleEnum, Team } from "types";
import React from "react";
import { EditActivity, DeleteActivity, QrCodeModal } from "components";
import { Tooltip } from "antd";
import { useGetAllTeams } from "hooks/useGetAllTeams";
import { useUserContext } from "hooks/useUserContext";
import { useGetAllActivityType } from "hooks/eaktivnosti-hooks/activity-hooks/useGetAllActivityType";

export const useActivityTableConfigurations = () => {
  const { data: teams } = useGetAllTeams();
  const { user } = useUserContext();

  const { data: activity_type } = useGetAllActivityType();
  const activityTableConfigurations: ColumnsType<ActivityListType> = [
    {
      title: "Naziv",
      dataIndex: "title",
      render: (_, record) => (
        <Tooltip title={record.description} placement="right">
          <span>{record.title}</span>
        </Tooltip>
      ),
    },
    {
      title: "Vrsta",
      dataIndex: ["activity_type", "name"],
      filters: activity_type?.map((activity: ActivityType) => ({
        text: activity.name,
        value: activity.name,
      })),
      onFilter: (value, record) => record.activity_type.name === value,
    },
    {
      title: "Datum",
      dataIndex: "date",
      render: (value) => moment(value).format("DD.MM.YYYY"),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },
    {
      title: "Lokacija",
      dataIndex: "location",
    },
    {
      title: "Organizator",
      render: (_, record) =>
        record.virtual_team !== null
          ? record?.team.short_name +
            " (" +
            record?.virtual_team?.short_name +
            ")"
          : record?.team.short_name,
      filters: teams?.map((team: Team) => ({
        text: team.short_name,
        value: team.short_name,
      })),
      onFilter: (value, record) => record.team.short_name === value,
    },
    {
      title: "Odgovorna osoba",
      dataIndex: "responsible_user",
      render: (value) => value.first_name + " " + value.last_name,
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          {(user?.role.name === RoleEnum.Voditelj ||
            user?.role.name === RoleEnum.Koordinator) &&
          (user.team.id === record.team.id ||
            user?.team_group.name === "Informacijske tehnologije" ||
            (user?.role.name === RoleEnum.Koordinator &&
              user.team_group.id === record.team.TeamGroups.id)) ? (
            <div onClick={(e) => e.stopPropagation()}>
              <QrCodeModal activity={record} />
              <EditActivity activity={record} />
              <DeleteActivity activityID={record.id} />
            </div>
          ) : null}
        </>
      ),
    },
  ];
  return activityTableConfigurations;
};

export const useActivityTableConfigurationsWithoutPersonAndLocation = () => {
  const { data: teams } = useGetAllTeams();
  const { user } = useUserContext();

  const { data: activity_type } = useGetAllActivityType();
  const activityTableConfigurations: ColumnsType<ActivityListType> = [
    {
      title: "Naziv",
      dataIndex: "title",
      render: (_, record) => (
        <Tooltip title={record.description} placement="right">
          <span>{record.title}</span>
        </Tooltip>
      ),
    },
    {
      title: "Vrsta",
      dataIndex: ["activity_type", "name"],
      filters: activity_type?.map((activity: ActivityType) => ({
        text: activity.name,
        value: activity.name,
      })),
      onFilter: (value, record) => record.activity_type.name === value,
    },
    {
      title: "Datum",
      dataIndex: "date",
      render: (value) => moment(value).format("DD.MM.YYYY"),
      sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
    },

    {
      title: "Organizator",
      render: (_, record) =>
        record.virtual_team !== null
          ? record?.team.short_name +
            " (" +
            record?.virtual_team?.short_name +
            ")"
          : record?.team.short_name,
      filters: teams?.map((team: Team) => ({
        text: team.short_name,
        value: team.short_name,
      })),
      onFilter: (value, record) => record.team.short_name === value,
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <>
          {(user?.role.name === RoleEnum.Voditelj ||
            user?.role.name === RoleEnum.Koordinator) &&
          (user.team.id === record.team.id ||
            user?.team_group.name === "Informacijske tehnologije") ? (
            <div onClick={(e) => e.stopPropagation()}>
              <QrCodeModal activity={record} />
              <EditActivity activity={record} />
              <DeleteActivity activityID={record.id} />
            </div>
          ) : null}
        </>
      ),
    },
  ];
  return activityTableConfigurations;
};
