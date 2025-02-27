import React, { Suspense, useState } from "react";
import { CandidateType } from "types";
import { Button, Flex, Modal, Spin, Tooltip, Typography } from "antd";
import { Candidate, VotesFormUP } from "@components";
import { useGetIsVoted } from "hooks/eizbori-hooks/useGetIsVoted";
import { Elections } from "types/VotesTypes";
import { useGetCandidateUP } from "hooks/eizbori-hooks/useGetCandidateUP";
import { useUserContext } from "hooks/useUserContext";

interface Props {
  elections: Elections;
}

const ElectionsUP = ({ elections }: Props) => {
  const { data: candidateUP } = useGetCandidateUP();
  const { user } = useUserContext();
  const { data: isVoted } = useGetIsVoted();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} style={{ color: "white" }}>
          Kandidati za UP
        </Typography.Title>
        <>
          {!user?.permissions?.can_vote ? (
            <Typography.Title level={5} style={{ color: "white" }}>
              Moraš biti prisutan na skupštini kako bi mogao glasati
            </Typography.Title>
          ) : elections?.vote_active ? (
            <>
              <Tooltip title={isVoted?.message}>
                <Button
                  type="primary"
                  size="large"
                  className="addButton"
                  onClick={() => setIsModalOpen(true)}
                  disabled={isVoted?.is_voted}
                >
                  Glasaj
                </Button>
              </Tooltip>
              <Modal
                title="Glasaj"
                style={{ top: "40px" }}
                open={isModalOpen}
                footer={null}
                cancelText="Poništi"
                onOk={() => setIsModalOpen(false)}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
                destroyOnClose={true}
              >
                <Suspense fallback={<Spin size="small" />}>
                  <VotesFormUP
                    candidateData={candidateUP}
                    setIsModalOpen={setIsModalOpen}
                  />
                </Suspense>
              </Modal>{" "}
            </>
          ) : (
            <Typography.Title level={5} style={{ color: "white" }}>
              Glasanje još nije aktivno
            </Typography.Title>
          )}
        </>
      </Flex>
      <Flex gap="small" wrap="wrap">
        {candidateUP?.map((candidate: CandidateType) => (
          <Candidate candidate={candidate} key={candidate?.id} />
        ))}
      </Flex>
    </>
  );
};
export default ElectionsUP;
