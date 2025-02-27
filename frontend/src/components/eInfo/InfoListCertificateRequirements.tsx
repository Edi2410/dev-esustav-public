import React, { useEffect } from "react";

import { Card, Flex, Layout, List, Progress, Space } from "antd";
import { UserOnActivityType } from "@types";
import { useGetCertificateRequirementsForUser } from "hooks/einfo-hooks/useGetCertificateRequirementsForUser";

interface Props {
  user?: number;
}

const InfoListCertificateRequirements = ({ user }: Props) => {
  const { data: certReqList } = useGetCertificateRequirementsForUser(user);
  var suprach = 0;
  if (certReqList?.certificate_requirements?.suprach_1) {
    suprach += 50;
  }
  if (certReqList?.certificate_requirements?.suprach_2) {
    suprach += 50;
  }
  return (
    <Flex className="footerSize" vertical align="center" justify="center">
      <Flex
        style={{ marginTop: "5px" }}
        wrap="wrap"
        justify="center"
        gap="small"
      >
        <Card title="Suprach">
          <Progress
            status={suprach === 100 ? "success" : "exception"}
            type="circle"
            percent={suprach}
            format={() => suprach / 50 + "/2"}
          />
        </Card>
        <Card title="Predan životopis u bazu">
          <Progress
            type="circle"
            percent={certReqList?.certificate_requirements?.zivotopis ? 100 : 0}
            status={
              certReqList?.certificate_requirements?.zivotopis
                ? "success"
                : "exception"
            }
          />
        </Card>
        <Card title="Ispunjen bootcamp">
          <Progress
            type="circle"
            percent={certReqList?.certificate_requirements?.bootcamp ? 100 : 0}
            status={
              certReqList?.certificate_requirements?.bootcamp
                ? "success"
                : "exception"
            }
          />
        </Card>
      </Flex>
      <List
        style={{ margin: "20px 0", width: "100%" }}
        className="containerShadow"
        dataSource={certReqList?.other_notes}
        renderItem={(item: UserOnActivityType) => {
          return (
            <List.Item key={item.id} style={{ padding: "3px" }}>
              <List.Item.Meta
                title={item.activity.title}
                description={item.activity.description}
              />
            </List.Item>
          );
        }}
      />
    </Flex>
  );
};
export default InfoListCertificateRequirements;
