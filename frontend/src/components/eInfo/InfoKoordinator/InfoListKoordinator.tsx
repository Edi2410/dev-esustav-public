import React from "react";
import { InfoClanType } from "@types";
import { Card, Flex, Progress, Space } from "antd";
import { useGetRequirementsStatusForKoordinator } from "hooks/einfo-hooks/koordinator-hooks/useGetRequirementsStatusForKoordinator";

interface Props {
  user?: number;
}

const InfoListKoordinator = ({ user }: Props) => {
  const { data: koordinatorInfo } =
    useGetRequirementsStatusForKoordinator(user);

  return (
    <Flex justify="center" wrap="wrap" gap="small">
      {koordinatorInfo?.map((info: InfoClanType, index: number) => (
        <Card key={index} title={info.aktivnost} bordered={false}>
          {info.postotak ? (
            <Progress
              percent={Math.round((info.prisustvovao / info.odrzano) * 100)}
              steps={info.odrzano}
              strokeColor={
                (info.prisustvovao / info.odrzano) * 100 < info.potrebno
                  ? "#C5272F"
                  : "#53C519"
              }
            />
          ) : (
            <Progress
              percent={Math.round((info?.prisustvovao / info?.potrebno) * 100)}
              steps={
                info?.prisustvovao <= info?.potrebno
                  ? info.potrebno
                  : info.prisustvovao
              }
              strokeColor={
                (info.prisustvovao / info.odrzano) * 100 === 100
                  ? "#C5272F"
                  : "#53C519"
              }
            />
          )}
        </Card>
      ))}
    </Flex>
  );
};
export default InfoListKoordinator;
