import React, { Suspense } from "react";
import { ActivityList, NoPermission, Recommendations } from "components";
import "../../styles/aktivnosti/homePage.css";
import { Segmented, Spin } from "antd";
import { SegmentedValue } from "antd/es/segmented";
import { RoleEnum } from "@types";
import { useUserContext } from "hooks/useUserContext";

export const HomePageAktivnosti = () => {
  const [page, setPage] = React.useState<SegmentedValue>("activity"); // ["activity", "recommendations"
  const { user } = useUserContext();
  if (!user?.permissions?.aktivnosti) {
    return <NoPermission />;
  }

  return (
    <div className="footerSize">
      {user?.role.name === RoleEnum.Clan ? (
        <Suspense fallback={<Spin size="small" />}>
          <ActivityList />
        </Suspense>
      ) : (
        <>
          <Segmented
            className="segmented"
            options={[
              { label: "Unos aktivnosti", value: "activity" },
              { label: "Pozitivne ocjene rada", value: "recommendations" },
            ]}
            onChange={(value) => setPage(value)}
          />
          {page === "activity" ? (
            <Suspense fallback={<Spin size="small" />}>
              <ActivityList />
            </Suspense>
          ) : (
            <Suspense fallback={<Spin size="small" />}>
              <Recommendations />
            </Suspense>
          )}
        </>
      )}
    </div>
  );
};
