import { Card, Flex, Typography } from "antd";
import { useGetMyScore } from "hooks/suprach-hooks/useGetMyScore";
import React from "react";
import { ScoreAvgType } from "types/SuprachTypes";

const GradesOverview = () => {
  const { data: scoreData } = useGetMyScore();
  return (
    <div
      className="containerShadowBottomRadius footerSize"
      style={{ backgroundColor: "white", padding: "10px" }}
    >
      <Flex gap={"small"} wrap="wrap" justify="center">
        {scoreData?.map((score: ScoreAvgType) => (
          <Card
            className="containerShadowSuprachCard"
            key={score.question__id}
            bodyStyle={{ padding: "10px" }}
          >
            {score.question__description}
            <Typography.Title type="danger">{Number(score.avg_score).toFixed(2)}</Typography.Title>
          </Card>
        ))}
      </Flex>
    </div>
  );
};
export default GradesOverview;
