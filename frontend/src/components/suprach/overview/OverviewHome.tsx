import React from "react";
import { Tabs } from "antd";
import {
  suprachOverviewTabsItems,
  suprachOverviewTabsItemsAdmin,
} from "configurations/suprach/overviewTabs";
import { useUserContext } from "hooks/useUserContext";
const OverviewHome = () => {
  const { user } = useUserContext();
  return (
    <>
      {user?.permissions.admin || user?.permissions?.suprach_admin ? (
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={suprachOverviewTabsItemsAdmin}
        />
      ) : (
        <Tabs
          type="card"
          defaultActiveKey="1"
          items={suprachOverviewTabsItems}
        />
      )}
    </>
  );
};
export default OverviewHome;
