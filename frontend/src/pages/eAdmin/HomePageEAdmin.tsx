import { NoPermission, UploadUsers } from "@components";
import { Button, Flex, Layout, Spin } from "antd";
import { useUserContext } from "hooks/useUserContext";
import React, { Suspense } from "react";
import { useNavigate } from "react-router-dom";

export const HomePageEAdmin = () => {
  const { user } = useUserContext();
  if (!user?.permissions?.admin) {
    return <NoPermission />;
  }
  const navigate = useNavigate();

  return (
    <Layout className="layoutHome">
      <Flex align="middle" gap="middle" style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={() => navigate("elections/results")}>
          <b>Rezultati izbora</b>
        </Button>
      </Flex>
      <Suspense fallback={<Spin size="small" />}>
        <UploadUsers />
      </Suspense>
    </Layout>
  );
};
