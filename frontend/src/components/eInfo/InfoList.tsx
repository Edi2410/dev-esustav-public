import React, { Suspense, useState } from "react";
import { RoleEnum } from "@types";
import { Flex, Space, Spin, Typography } from "antd";
import {
  InfoListCertificateRequirements,
  InfoListClan,
  InfoListKoordinator,
  InfoListVoditelj,
  ScanQrCodeModal,
} from "components";
import { useUserContext } from "hooks/useUserContext";

const InfoList = () => {
  const { user } = useUserContext();

  return (
    <>
      <Flex style={{ margin: "0 2%" }} justify="flex-end">
        <Suspense fallback={<Spin size="small" />}>
          <ScanQrCodeModal />
        </Suspense>
      </Flex>
      <Flex justify="center" align="center" vertical wrap="wrap">
        <Flex wrap="wrap">
          {user?.role.name === RoleEnum.Clan && (
            <Suspense fallback={<Spin size="small" />}>
              <InfoListClan user={user?.user?.id} />
            </Suspense>
          )}
          {user?.role.name === RoleEnum.Voditelj && (
            <Suspense fallback={<Spin size="small" />}>
              <InfoListVoditelj user={user?.user?.id} />
            </Suspense>
          )}
          {(user?.role.name === RoleEnum.Koordinator ||
            user?.role.name === RoleEnum.Potpredsjednik ||
            user?.role.name === RoleEnum.Predsjednik ||
            user?.role.name === RoleEnum.Tajnik) && (
            <Suspense fallback={<Spin size="small" />}>
              <InfoListKoordinator user={user?.user?.id} />
            </Suspense>
          )}
        </Flex>
        <Flex wrap="wrap">
          <Suspense fallback={<Spin size="small" />}>
            <InfoListCertificateRequirements user={user?.user?.id} />
          </Suspense>
        </Flex>
      </Flex>
    </>
  );
};
export default InfoList;
