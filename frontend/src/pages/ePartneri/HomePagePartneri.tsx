import { Input, Spin, Table } from "antd";
import "../../styles/epartneri.css";
import { AddNewPartnerModal } from "@components";
import React, { Suspense, useState } from "react";
import { usePartnersListTable } from "configurations";
import { PartnerListTableType } from "@types";
import NoPermission from "components/NoPermission";
import { useMediaQuery } from "react-responsive";
import { usePartnersListTableMobile } from "configurations/ePartneri/partnersListTable";
import { useUserContext } from "hooks/useUserContext";
import { useGetPartnersList } from "hooks/epartneri-hooks/useGetPartnersList";

export const HomePagePartneri = () => {
  const { user } = useUserContext();
  if (!user?.permissions?.partneri) {
    return <NoPermission />;
  }

  const [filteredPartnersData, setFilteredPartnersData] =
    useState<PartnerListTableType[]>();
  const { data: partnersListData, isLoading } = useGetPartnersList();
  const configurations = usePartnersListTable();
  const configurationsMobile = usePartnersListTableMobile();
  const isCard = useMediaQuery({
    query: "(max-width: 562px)",
  });
  return (
    <div className="footerSize">
      <div className="headerButton">
        <div>
          <Input.Search
            placeholder="Pretraži (brend)"
            onChange={(e) => {
              const filteredData = partnersListData.filter(
                (entry: PartnerListTableType) =>
                  entry.partner.brand_name
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
              );
              setFilteredPartnersData(filteredData);
            }}
          />
        </div>
        <Suspense fallback={<Spin size="small" />}>
          <AddNewPartnerModal />
        </Suspense>
      </div>
      {isCard ? (
        <Table
          className="containerShadow"
          style={{ margin: "10px 2% 2% 2%" }}
          size="small"
          dataSource={filteredPartnersData || partnersListData}
          loading={isLoading}
          columns={configurationsMobile}
          pagination={{ pageSize: 15 }}
          rowKey="id"
        />
      ) : (
        <Table
          className="containerShadow"
          style={{ margin: "10px 2% 2% 2%" }}
          size="small"
          dataSource={filteredPartnersData || partnersListData}
          loading={isLoading}
          columns={configurations}
          pagination={{ pageSize: 15 }}
          rowKey="id"
        />
      )}
    </div>
  );
};
