import React, { Suspense } from "react";
import { CommentsButtonAndModalAndForm, NoPermission } from "components";
import "./../../styles/suprach.css";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Input,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { useSearchUser } from "hooks/suprach-hooks/useSearchUser";
import { UserToGrade } from "types/UserTypes";
import { useUserContext } from "hooks/useUserContext";

export const CommentUserPage = () => {
  const { user } = useUserContext();
  if (!user?.permissions?.suprach) {
    return <NoPermission />;
  }
  const [searchUserData, setSearchUserData] = React.useState("");
  const { data: userToComment } = useSearchUser(searchUserData);
  return (
    <div className="footerSize" style={{ margin: "0 2%" }}>
      <Flex justify="end">
        <Input
          style={{ width: "225px", marginBottom: "20px" }}
          placeholder="Pretraži po imenu ili prezimenu"
          onChange={(event) => setSearchUserData(event.target.value)}
        />
      </Flex>
      <Flex
        className="footerSize"
        justify="center"
        wrap="wrap"
        gap="small"
        vertical
        align="center"
      >
        <Flex justify="center" wrap="wrap" gap="large">
          {userToComment?.map((userToGrade: UserToGrade) => (
            <Card
              key={userToGrade?.id}
              style={{ height: 260, width: 150, padding: "10px" }}
              cover={
                userToGrade?.photo ? (
                  <Avatar
                    style={{ width: 100, height: 100, margin: "auto" }}
                    src={userToGrade?.photo}
                  />
                ) : (
                  <>
                    <Avatar
                      style={{
                        backgroundColor: "#C5272F",
                        margin: "auto",
                        width: 100,
                        height: 100,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "24px", // A
                      }}
                      gap={4}
                    >
                      <strong>
                        {userToGrade.first_name[0]}.{" "}
                        {" " + userToGrade.last_name[0]}.
                      </strong>
                    </Avatar>
                  </>
                )
              }
              actions={[
                <Flex justify="space-evenly">
                  <Suspense fallback={<Spin size="small" />}>
                    <CommentsButtonAndModalAndForm
                      userToGradeId={userToGrade?.id.toString()}
                      userToGradeName={`${userToGrade?.first_name} ${userToGrade?.last_name}`}
                    />
                  </Suspense>
                </Flex>,
              ]}
            >
              <div style={{ height: 40 }}>
                <Typography.Text strong>
                  {userToGrade?.first_name} {userToGrade?.last_name}
                </Typography.Text>
              </div>
            </Card>
          ))}
        </Flex>
      </Flex>
    </div>
  );
};
