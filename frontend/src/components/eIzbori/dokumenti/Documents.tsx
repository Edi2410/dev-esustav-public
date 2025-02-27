import React from "react";
import { CandidateType } from "types";
import { Card, Image, Button, Flex, Avatar } from "antd";
import { DocumentsType } from "types/VotesTypes";
interface Props {
  documents: DocumentsType;
}

const Documents = ({ documents }: Props) => {
  return (
    <>
      <Card
        style={{
          minWidth: "30%",
          minHeight: "50%",
          margin: "auto",
        }}
        title={documents?.document_title}
      >
        <Flex wrap="wrap" justify="center" gap="small">
          {documents?.document_link && (
            <Button
              href={documents?.document_link}
              target="_blank"
              type="primary"
              className="candidateDetailsButton"
            >
              Pogledaj dokument
            </Button>
          )}
        </Flex>
      </Card>
    </>
  );
};
export default Documents;
