import React from "react";

import { NoPermission } from "@components";
import { useUserContext } from "hooks/useUserContext";
import { Flex, Table, Typography } from "antd";
import { useGetElectionsResults } from "hooks/eizbori-hooks/useGetElectionsResults";
import { VotesColumns } from "@configurations";

export const ElectionsResultsPage = () => {
  const { user } = useUserContext();
  if (!user?.permissions?.admin) {
    return <NoPermission />;
  }

  const { data } = useGetElectionsResults();


  return (
    <div className="footerSize">
      <div style={{ margin: "0 2%" }}>
        <Flex>
          <Typography.Title level={3} style={{ color: "white" }}>
            Rezultati aktivnih izbora
          </Typography.Title>
        </Flex>
        <Table
          className="containerShadow"
          dataSource={data}
          columns={VotesColumns}
        />
      </div>
    </div>
  );
};
