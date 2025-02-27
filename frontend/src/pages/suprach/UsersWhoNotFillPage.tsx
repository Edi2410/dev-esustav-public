import React, { Suspense } from "react";
import { NoPermission, UsersWhoNotFillSuprach } from "components";
import { Spin } from "antd";
import "./../../styles/suprach.css";
import { useUserContext } from "hooks/useUserContext";

export const UsersWhoNotFillPage = () => {
  const { user } = useUserContext();

  if (user?.permissions?.suprach_admin || user?.permissions?.admin) {
    return (
      <div className="footerSize" style={{ margin: "0 2%" }}>
        <Suspense fallback={<Spin size="small" />}>
          <UsersWhoNotFillSuprach />
        </Suspense>
      </div>
    );
  }
  return <NoPermission />;
};
