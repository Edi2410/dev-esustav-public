import { ColumnsType } from "antd/es/table";
import { RecommendationsType } from "types";
import React from "react";
import { Tag } from "antd";
import { RecommendationsModal } from "@components";

export const recommendationTableConfigurations: ColumnsType<RecommendationsType> =
  [
    {
      title: "eSTUDENT",
      dataIndex: ["user"],
    },
    {
      title: "Ocjena rada",
      dataIndex: "passed",
      render: (_, record) => {
        return record.passed ? (
          <Tag color="green">Pozitivna</Tag>
        ) : (
          <Tag color="red">Negativna</Tag>
        );
      },
    },
    {
      title: "",
      dataIndex: "",
      render: (render) => <RecommendationsModal data={render} />,
    },
  ];
