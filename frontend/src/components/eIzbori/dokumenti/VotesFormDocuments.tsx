import React, { useState } from "react";
import { CandidateType, RoleEnum } from "types";

import { useGetNumberOfVotes } from "hooks/eizbori-hooks/useGetNumberOfVotes";
import { Button, Checkbox, Form, Radio, Switch, Typography } from "antd";
import { useSaveVotes } from "hooks/eizbori-hooks/useSaveVotes";
import { DocumentsType } from "types/VotesTypes";

interface Props {
  documentsData: DocumentsType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VotesFormDocuments = ({
  documentsData,
  setIsModalOpen,
}: Props) => {

  const saveVotes = useSaveVotes();
  const { isLoading } = saveVotes;

  const onSubmit = (values: any) => {
    var returnValue: any[] = [];
    for (const [key, value] of Object.entries(values)) {
      if (Number(key) === 0) {
        continue;
      } else {
        returnValue?.push({
          document: key,
          vote: value === undefined ? false : value,
        });
      }
    }

    saveVotes.mutate(returnValue, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
    });
  };

  return (
    <>
      <Form onFinish={onSubmit}>
        {documentsData?.map((documents: DocumentsType) => (
          <Form.Item
            key={documents.id}
            label={`${documents?.document_title}`}
            name={[documents?.id!]}
          >
            <Radio.Group>
              <Radio.Button value={true}>Za</Radio.Button>
              <Radio.Button value={false}>Protiv</Radio.Button>
            </Radio.Group>
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Unesi glasove
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default VotesFormDocuments;
