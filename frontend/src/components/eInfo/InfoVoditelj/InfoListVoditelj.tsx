import React from "react";
import { InfoClanType } from "@types";
import { Card, Flex, Progress, Space, Typography } from "antd";
import { useGetRequirementsStatusForVoditelj } from "hooks/einfo-hooks/voditelj-hooks/useGetRequirementsStatusForVoditelj";

interface Props {
  user?: number;
}

const InfoListVoditelj = ({ user }: Props) => {
  const { data: voditeljInfo } = useGetRequirementsStatusForVoditelj(user);

  return (
    <Flex justify="center" wrap="wrap" gap="small">
      {voditeljInfo?.map((info: InfoClanType, index: number) => (
        <Card key={index} title={info.aktivnost} bordered={false}>
          {info.aktivnost == "Sastanak" ? (
            <>
              <Progress
                percent={Math.round((info.odrzano / 15) * 100)}
                steps={info.potrebno}
                strokeColor={info.odrzano < 15 ? "#C5272F" : "#53C519"}
              />
            </>
          ) : info.aktivnost == "Štandiranje" ? (
            <>
              <Progress
                percent={Math.round(
                  (info?.prisustvovao / info?.potrebno) * 100
                )}
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
            </>
          ) : info.aktivnost == "Pristupni štandiranje" ? (
            <>
              <Progress
                percent={Math.round(
                  (info?.prisustvovao / info?.potrebno) * 100
                )}
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
            </>
          ) : (
            info.aktivnost == "ViP Sastanak" && (
              <>
                <Progress
                  percent={Math.round((info.prisustvovao / info.odrzano) * 100)}
                  steps={info.odrzano}
                  strokeColor={
                    (info.prisustvovao / info.odrzano) * 100 < info.potrebno
                      ? "#C5272F"
                      : "#53C519"
                  }
                />
              </>
            )
          )}
        </Card>
      ))}
    </Flex>
  );
};
export default InfoListVoditelj;
