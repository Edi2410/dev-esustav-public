import React from "react";
import { InfoAdminUpdateSpecificRow } from "@components";
import { ColumnsType } from "antd/es/table";
import { CertificateRequirementsType } from "types";

export const useEinfoAdminTableConf = (searchText: string) => {
  const einfoAdminTableConf: ColumnsType<CertificateRequirementsType> = [
    {
      title: "eSTUDENT",
      dataIndex: ["user", "email"],
      filteredValue: [searchText],
      onFilter: (value, record) =>
        String(record.user.email)
          .toLowerCase()
          .includes(String(value).toLowerCase()),
    },
    {
      title: "Prvi Suprach",
      dataIndex: ["suprach_1"],
      render: (_, record) => (
        <InfoAdminUpdateSpecificRow value={record} type="suprach_1" />
      ),
    },
    {
      title: "Drugi Suprach",
      dataIndex: ["suprach_2"],
      render: (_, record) => (
        <InfoAdminUpdateSpecificRow value={record} type="suprach_2" />
      ),
    },
    {
      title: "Životopis",
      dataIndex: ["zivotopis"],
      render: (_, record) => (
        <InfoAdminUpdateSpecificRow value={record} type="zivotopis" />
      ),
    },
    {
      title: "Bootcamp",
      dataIndex: ["bootcamp"],
      render: (_, record) => (
        <InfoAdminUpdateSpecificRow value={record} type="bootcamp" />
      ),
    },
  ];

  return einfoAdminTableConf;
};
