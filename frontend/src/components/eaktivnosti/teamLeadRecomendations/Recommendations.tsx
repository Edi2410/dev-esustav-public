import React from "react";
import { recommendationTableConfigurations } from "configurations";
import { Table } from "antd";
import { useGetUserForRecomendations } from "hooks/eaktivnosti-hooks/teamLeadRecomendations-hooks/useGetUserForRecomendations";

const Recommendations = () => {
  const { data, isLoading } = useGetUserForRecomendations();

  return (
    <>
      <Table
        loading={isLoading}
        className="containerShadow"
        style={{ margin: "2%" }}
        size="small"
        dataSource={data}
        columns={recommendationTableConfigurations}
        rowKey="user"
      />
    </>
  );
};
export default Recommendations;
