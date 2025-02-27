import React from "react";
import { useGetMyComments } from "hooks/suprach-hooks/useGetMyComments";
import { Card, Flex, Typography } from "antd";
import { CommentsType } from "types/SuprachTypes";

const CommentsOverview = () => {
  const { data: commentsData } = useGetMyComments();

  return (
    <div
      className="containerShadowBottomRadius footerSize"
      style={{ backgroundColor: "white", padding: "10px" }}
    >
      <Flex gap={"small"} wrap="wrap" vertical>
        {commentsData?.map((comment: CommentsType) => (
          <Card
            className="containerShadowSuprachCard"
            key={comment.id}
            bodyStyle={{ padding: "10px" }}
          >
            {comment.comment}
            <br />
            <Typography.Text type="secondary" italic>
              {comment.suprach.academic_year.description} /
              {comment.suprach.round === 1 ? "Prvi suprach" : "Drugi suprach"}
            </Typography.Text>
          </Card>
        ))}
      </Flex>
    </div>
  );
};
export default CommentsOverview;
