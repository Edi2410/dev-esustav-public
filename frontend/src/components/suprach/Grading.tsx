import React, { Suspense } from "react";
import { SpecialUserToGrade, UserToGrade } from "types/UserTypes";
import { useGetUserToGrade } from "hooks/suprach-hooks/useGetUserToGrade";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import { IoThumbsUpOutline } from "react-icons/io5";
import { useLikeUser } from "hooks/suprach-hooks/useLikeUser";
import { useUserContext } from "hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { useGetSpecialPerson } from "hooks/suprach-hooks/special/useGetSpecialPerson";

const Grading = () => {
  const { user } = useUserContext();
  const { data: usersToGrade } = useGetUserToGrade();
  const { data: specialUserToGrade } = useGetSpecialPerson();

  const likeUser = useLikeUser();
  const navigate = useNavigate();
  return (
    <>
      <Flex justify="flex-end">
        {(user?.permissions?.admin || user?.permissions?.suprach_admin) && (
          <Suspense fallback={<Spin size="small" />}>
            <Button
              type="primary"
              onClick={() => navigate("/suprach/users/notfill")}
              style={{ marginBottom: "20px", marginRight: "20px" }}
            >
              Pregledaj tko nije ispunio
            </Button>
          </Suspense>
        )}
        <Suspense fallback={<Spin size="small" />}>
          <Button
            type="primary"
            onClick={() => navigate("/suprach/comments")}
            style={{ marginBottom: "20px" }}
          >
            Dodatni komentar
          </Button>
        </Suspense>
      </Flex>
      <Flex className="footerSize" justify="center" wrap="wrap" gap="large">
        {usersToGrade?.map((userToGrade: UserToGrade) => (
          <Card
            key={userToGrade?.id}
            style={{ height: 250, width: 150, padding: "10px" }}
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
                <Button
                  type="primary"
                  disabled={userToGrade.graded}
                  onClick={() =>
                    navigate(
                      `/suprach/grading/${userToGrade.id}/false/${userToGrade.first_name}`
                    )
                  }
                >
                  Ocijeni
                </Button>
                <Tooltip title="Možeš lajkat osobu ukoliko je ne poznaješ dovoljno!">
                  <Button
                    icon={<IoThumbsUpOutline size={20} />}
                    disabled={userToGrade.graded}
                    onClick={() =>
                      likeUser.mutate({
                        graded: Number(userToGrade?.id),
                        grader: Number(user?.user?.id),
                      })
                    }
                  />
                </Tooltip>
              </Flex>,
            ]}
          >
            <div style={{ height: 30 }}>
              <Typography.Text strong>
                {userToGrade?.first_name} {userToGrade?.last_name}
              </Typography.Text>
            </div>
          </Card>
        ))}

        {specialUserToGrade?.map((specialUserToGrade: SpecialUserToGrade) => (
          <Card
            key={specialUserToGrade.id}
            style={{ height: 250, width: 150, padding: "10px" }}
            cover={
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
                <strong>{specialUserToGrade.name[0]}</strong>
              </Avatar>
            }
            actions={[
              <Flex justify="space-evenly">
                <Button
                  type="primary"
                  disabled={specialUserToGrade.graded}
                  onClick={() =>
                    navigate(
                      `/suprach/grading/${specialUserToGrade.id}/true/${specialUserToGrade.name}`
                    )
                  }
                >
                  Ocijeni
                </Button>
              </Flex>,
            ]}
          >
            <div style={{ height: 30 }}>
              <Typography.Text strong>
                {specialUserToGrade?.name}
              </Typography.Text>
            </div>
          </Card>
        ))}
      </Flex>
    </>
  );
};
export default Grading;
