import React, { Suspense, useState } from "react";
import { CandidateType } from "types";
import { Button, Flex, Modal, Spin, Tooltip, Typography } from "antd";
import { Candidate, Documents, VotesFormDocuments } from "@components";
import { useGetIsVoted } from "hooks/eizbori-hooks/useGetIsVoted";
import { DocumentsType, Elections } from "types/VotesTypes";
import { useUserContext } from "hooks/useUserContext";
import { useGetDocuments } from "hooks/eizbori-hooks/useGetDocuments";

interface Props {
  elections: Elections;
}

const ElectionsDocuments = ({ elections }: Props) => {
  const { data: documents } = useGetDocuments();
  const { user } = useUserContext();
  const { data: isVoted } = useGetIsVoted();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Flex justify="space-between" align="center">
        <Typography.Title level={3} style={{ color: "white" }}>
          Pravilnici
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
                  <VotesFormDocuments
                    documentsData={documents}
                    setIsModalOpen={setIsModalOpen}
                  />
                </Suspense>
              </Modal>
            </>
          ) : (
            <Typography.Title level={5} style={{ color: "white" }}>
              Glasanje još nije aktivno
            </Typography.Title>
          )}
        </>
      </Flex>
      <Flex gap="small" wrap="wrap">
        {documents?.map((documents: DocumentsType) => (
          <Documents documents={documents} key={documents?.id} />
        ))}
      </Flex>
    </>
  );
};
export default ElectionsDocuments;
