import React, { useEffect, useState } from "react";
import { CandidateType } from "types";

import { useGetNumberOfVotes } from "hooks/eizbori-hooks/useGetNumberOfVotes";
import { Button, Form, Radio, Typography } from "antd";
import { useSaveVotes } from "hooks/eizbori-hooks/useSaveVotes";
import { NumberOfVotesType } from "types/VotesTypes";

interface Props {
  candidateData: CandidateType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VotesFormVoditelji = ({
  candidateData,
  setIsModalOpen,
}: Props) => {
  const { data: numberOfVotes } = useGetNumberOfVotes();
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [selectedCount, setSelectedCount] =
    useState<NumberOfVotesType[]>(numberOfVotes);
  const saveVotes = useSaveVotes();

  const { isLoading } = saveVotes;

  useEffect(() => {
    if (numberOfVotes) {
      setSelectedCount(numberOfVotes);
    }
  }, [numberOfVotes]);

  const onSubmit = (values: any) => {
    var returnValue: any[] = [];
    for (const [key, value] of Object.entries(values)) {
      if (Number(key) === 0) {
        continue;
      } else {
        returnValue?.push({
          candidate: key,
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
  const handleSwitchChange = (checked: boolean, candidate: CandidateType) => {
    var newValue = selectedCount;
    newValue = newValue?.map((item, index) =>
      item.team.id === candidate.team.id
        ? {
            ...item,
            number_of_votes: checked
              ? item.number_of_votes - 1
              : item.number_of_votes < numberOfVotes[index].number_of_votes
              ? item.number_of_votes + 1
              : item.number_of_votes,
          }
        : item
    );
    const hasNegativeVote = newValue?.some(
      (votes: NumberOfVotesType) => votes.number_of_votes < 0
    );

    setDisableButton(hasNegativeVote);
    setSelectedCount(newValue);
  };

  return (
    <>
      <Form onFinish={onSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <Typography.Text disabled italic>
            Maksimalni broj glasova po timu je:
            <br />
            {numberOfVotes?.map((votes: NumberOfVotesType) => (
              <div key={votes.id}>
                {votes.team.name}: {votes.number_of_votes} <br />
              </div>
            ))}
          </Typography.Text>
        </div>
        {candidateData?.map((candidate: CandidateType) => (
          <Form.Item
            key={candidate.id}
            label={`${candidate?.user.first_name} ${candidate?.user.last_name} (${candidate?.team.short_name})`}
            name={[candidate.id]}
          >
            <Radio.Group
              onChange={(e) => handleSwitchChange(e.target.value, candidate)}
            >
              <Radio.Button value={true}>Za</Radio.Button>
              <Radio.Button value={false}>Protiv</Radio.Button>
            </Radio.Group>
          </Form.Item>
        ))}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={disableButton}
            loading={isLoading}
          >
            Unesi glasove
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default VotesFormVoditelji;
