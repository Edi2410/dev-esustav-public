import React from "react";
import { useGetSpecialStats } from "hooks/suprach-hooks/special/useGetSpecialStats";
import { Card, Flex, Typography } from "antd";
import {
  CommentsType,
  ScoreAvgType,
  SpecialUserDataType,
} from "types/SuprachTypes";

const CommentsAndGradesForSpecial = () => {
  const { data: specialStats } = useGetSpecialStats();

  return (
    <div
      className="containerShadowBottomRadius footerSize"
      style={{ backgroundColor: "white", padding: "10px" }}
    >
      <Flex gap={"small"} wrap="wrap" vertical>
        {specialStats?.map((data: SpecialUserDataType, index: number) => (
          <Card
            className="containerShadowSuprachCard"
            key={index}
            bodyStyle={{ padding: "10px" }}
            title={data.user}
          >
            <Flex gap={"small"} wrap="wrap">
              {data.scores?.map((score: ScoreAvgType) => (
                <Card key={score.question__id} bodyStyle={{ padding: "10px" }}>
                  {score.question__description}
                  <Typography.Title type="danger">
                    {score.avg_score}
                  </Typography.Title>
                </Card>
              ))}
              {data.comments?.map((comment: CommentsType, index) => (
                <Card key={comment.id} bodyStyle={{ padding: "10px" }}>
                  {comment.comment}
                  <br />
                  <Typography.Text type="secondary" italic>
                    {comment.suprach.academic_year.description} /
                    {comment.suprach.round === 1
                      ? "Prvi suprach"
                      : "Drugi suprach"}
                  </Typography.Text>
                </Card>
              ))}
            </Flex>
          </Card>
        ))}
      </Flex>
    </div>
  );
};
export default CommentsAndGradesForSpecial;
