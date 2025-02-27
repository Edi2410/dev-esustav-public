import React, { Suspense, useEffect, useState } from "react";

import { RoleEnum } from "@types";
import { Flex, Select, Space, Spin } from "antd";
import {
  InfoListCertificateRequirements,
  InfoListClan,
  InfoListKoordinator,
  InfoListVoditelj,
} from "components";
import { UserData } from "types";
import { useGetMyTeamgroupLeaders } from "hooks/useGetMyTeamgroupLeaders";

const InfoListForSpecificTeamLeader = () => {
  const [selectedUser, setSelectedUser] = useState<UserData | undefined>();
  const { data: MyTeamGroupLeaders } = useGetMyTeamgroupLeaders();

  return (
    <Flex vertical justify="center" align="center" wrap="wrap" gap="small">
      <div style={{ width: "100%" }}>
        <Select
          style={{ width: "250px", marginBottom: "10px" }}
          showSearch
          value={selectedUser?.user?.id}
          placeholder="Odaberi eSTUDENTa"
          filterOption={(input, option) => {
            return (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
          filterSort={(optionA, optionB) => {
            return (optionA?.label ?? "")
              .toString()
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toString().toLowerCase());
          }}
          onSelect={(value: number) =>
            setSelectedUser(
              MyTeamGroupLeaders.find(
                (user: UserData) => Number(user?.user?.id) === value
              )
            )
          }
        >
          {MyTeamGroupLeaders?.map((userData: UserData) => (
            <Select.Option
              key={userData.user.id}
              value={userData.user.id}
              label={userData.user.username}
            >
              {userData.user.username}
            </Select.Option>
          ))}
        </Select>
      </div>
      {selectedUser && (
        <>
          {selectedUser?.role.name === RoleEnum.Clan && (
            <Suspense fallback={<Spin size="small" />}>
              <InfoListClan user={selectedUser?.user.id} />
            </Suspense>
          )}
          {selectedUser?.role.name === RoleEnum.Voditelj && (
            <Suspense fallback={<Spin size="small" />}>
              <InfoListVoditelj user={selectedUser?.user.id} />
            </Suspense>
          )}
          {(selectedUser?.role.name === RoleEnum.Koordinator ||
            selectedUser?.role.name === RoleEnum.Potpredsjednik ||
            selectedUser?.role.name === RoleEnum.Predsjednik ||
            selectedUser?.role.name === RoleEnum.Tajnik) && (
            <Suspense fallback={<Spin size="small" />}>
              <InfoListKoordinator user={selectedUser?.user.id} />
            </Suspense>
          )}
          <Space direction="horizontal" wrap>
            <Suspense fallback={<Spin size="small" />}>
              <InfoListCertificateRequirements user={selectedUser?.user.id} />
            </Suspense>
          </Space>
        </>
      )}
    </Flex>
  );
};
export default InfoListForSpecificTeamLeader;
