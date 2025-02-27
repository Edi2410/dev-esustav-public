import React, { Suspense } from "react";
import { Grading, NoPermission, OverviewHome } from "components";
import { Spin } from "antd";
import { useGetActiveSuprach } from "hooks/suprach-hooks/useGetActiveSuprach";
import "./../../styles/suprach.css";
import { useUserContext } from "hooks/useUserContext";

export const SuprachHomePage = () => {
  const { user } = useUserContext();
  if (!user?.permissions?.suprach) {
    return <NoPermission />;
  }

  const { data: suprach, isLoading } = useGetActiveSuprach();

  return (
    <>
      {isLoading ? (
        <Spin size="large" />
      ) : !suprach?.grading_active ? (
        <div className="footerSize" style={{ margin: "0 2%" }}>
          <Suspense fallback={<Spin size="small" />}>
            <OverviewHome />
          </Suspense>
        </div>
      ) : (
        <div className="footerSize" style={{ margin: "0 2%" }}>
          <Suspense fallback={<Spin size="small" />}>
            <Grading />
          </Suspense>
        </div>
      )}
    </>
  );
};
