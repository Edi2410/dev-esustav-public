import React, { Suspense, useState } from "react";
import { Input, Spin, Table } from "antd";
import { useEinfoAdminTableConf } from "configurations";
import { InfoAdminButtons } from "components";
import { useGetCertificateRequirementsList } from "hooks/einfo-hooks/useGetCertificateRequirementsList";

const InfoAdmin = () => {
  const [searchText, setSearchText] = useState("");
  const einfoAdminTableConf = useEinfoAdminTableConf(searchText);
  const { data: infoAdmin, isLoading } = useGetCertificateRequirementsList();
  return (
    <>
      <div className="topLevel">
        <Suspense fallback={<Spin size="small" />}>
          <InfoAdminButtons />
        </Suspense>
        <div>
          <Input.Search
            placeholder="Pretraži"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <Table
        className="containerShadow"
        style={{ margin: "0 2% 2% 2%" }}
        size="small"
        dataSource={infoAdmin}
        loading={isLoading}
        columns={einfoAdminTableConf}
        pagination={{ pageSize: 15 }}
        rowKey="id"
      />
    </>
  );
};
export default InfoAdmin;
