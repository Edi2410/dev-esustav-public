import React from "react";

import { InfoClanType } from "@types";
import { Card, Flex, Progress, Space } from "antd";
import { useGetRequirementsStatusForClan } from "hooks/einfo-hooks/clan-hooks/useGetRequirementsStatusForClan";

interface Props {
  user?: number;
}

const InfoListClan = ({ user }: Props) => {
  const { data: clanInfo } = useGetRequirementsStatusForClan(user);

  return (
    <Flex justify="center" wrap="wrap" gap="small">
      {clanInfo?.map((info: InfoClanType, index: number) => (
        <Card key={index} title={info.aktivnost} bordered={false}>
          {info.postotak ? (
            <>
              <Progress
                percent={Math.round((info.prisustvovao / info.odrzano) * 100)}
                steps={
                  info?.prisustvovao <= info?.potrebno
                    ? info.potrebno
                    : info.odrzano
                }
                strokeColor={
                  (info.prisustvovao / info.odrzano) * 100 < info.potrebno
                    ? "#C5272F"
                    : "#53C519"
                }
              />
            </>
          ) : (
            <>
              <Progress
                percent={Math.round(
                  (info?.prisustvovao / info?.potrebno) * 100
                )}
                steps={
                  info?.prisustvovao <= info?.potrebno
                    ? info.potrebno
                    : info.odrzano
                }
                strokeColor={
                  (info.prisustvovao / info.odrzano) * 100 === 100
                    ? "#C5272F"
                    : "#53C519"
                }
              />
            </>
          )}
        </Card>
      ))}
    </Flex>
  );
};
export default InfoListClan;
