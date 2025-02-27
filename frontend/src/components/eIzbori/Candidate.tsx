import React from "react";
import { CandidateType } from "types";
import { Card, Image, Button, Flex, Avatar } from "antd";
interface Props {
  candidate: CandidateType;
}

const Candidate = ({ candidate }: Props) => {
  return (
    <>
      <Card
        style={{
          minWidth: "30%",
          minHeight: "50%",
          margin: "auto",
        }}
        title={
          (candidate?.role?.name !== null ? candidate?.role?.name : "") +
          " (" +
          candidate?.team.short_name +
          ") " +
          candidate?.user.first_name +
          " " +
          candidate?.user.last_name
        }
      >
        {candidate?.user?.photo ? (
          <Avatar
            shape="square"
            size={112}
            style={{ marginBottom: "20px" }}
            src={candidate?.user?.photo}
          />
        ) : (
          <Avatar shape="square">
            {candidate?.user?.first_name[0].toUpperCase()}.{" "}
            {candidate?.user?.last_name[0].toUpperCase()}.
          </Avatar>
        )}
        <Flex wrap="wrap" justify="center" gap="small">
          {candidate?.cv && (
            <Button
              href={candidate?.cv}
              target="_blank"
              type="primary"
              className="candidateDetailsButton"
            >
              Životopis
            </Button>
          )}
          {candidate?.plan_rada && (
            <Button
              href={candidate?.plan_rada}
              target="_blank"
              type="primary"
              className="candidateDetailsButton"
            >
              Plan Rada
            </Button>
          )}
          {candidate?.aktivnosti && (
            <Button
              href={candidate?.aktivnosti}
              target="_blank"
              type="primary"
              className="candidateDetailsButton"
            >
              Aktivnosti
            </Button>
          )}
          {candidate?.predstavljanje && (
            <>
              <br />
              <Button
                href={candidate?.predstavljanje}
                target="_blank"
                type="primary"
                className="candidateDetailsButton"
              >
                Predstavljanje
              </Button>
            </>
          )}
        </Flex>
      </Card>
    </>
  );
};
export default Candidate;
