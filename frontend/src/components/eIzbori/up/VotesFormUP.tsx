import React, { useState } from "react";
import { CandidateType, RoleEnum } from "types";

import { useGetNumberOfVotes } from "hooks/eizbori-hooks/useGetNumberOfVotes";
import { Button, Checkbox, Form, Radio, Switch, Typography } from "antd";
import { useSaveVotes } from "hooks/eizbori-hooks/useSaveVotes";

interface Props {
  candidateData: CandidateType[];
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const VotesFormUP = ({ candidateData, setIsModalOpen }: Props) => {
  const [selectedCountPredsjednik, setSelectedCountPredsjednik] = useState(0);
  const [selectedCountPotpredsjednik, setSelectedCountPotpredsjednik] =
    useState(0);
  const saveVotes = useSaveVotes();
  const { isLoading } = saveVotes;

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

  const handleSwitchChangePredsjednik = (checked: boolean) => {
    if (!checked && selectedCountPredsjednik === 0) {
      return;
    }
    const value = selectedCountPredsjednik + (checked ? 1 : -1);
    setSelectedCountPredsjednik(value);
  };

  const handleSwitchChangePotpredsjednik = (checked: boolean) => {
    if (!checked && selectedCountPotpredsjednik === 0) {
      return;
    }
    const value = selectedCountPotpredsjednik + (checked ? 1 : -1);
    setSelectedCountPotpredsjednik(value);
  };

  return (
    <>
      <Form onFinish={onSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <Typography.Text disabled italic>
            Maksimalni broj glasova za predsjednika/cu je 1.
          </Typography.Text>
          <br />
          <Typography.Text disabled italic>
            Maksimalni broj glasova za potpredsjednika/cu je 2.
          </Typography.Text>
        </div>
        {candidateData?.map((candidate: CandidateType) => (
          <Form.Item
            key={candidate.id}
            label={`${candidate?.user.first_name} ${candidate?.user.last_name} (${candidate?.role.name})`}
            name={[candidate.id]}
          >
            <Radio.Group
              onChange={(e) => {
                if (candidate.role.name === RoleEnum.Predsjednik) {
                  handleSwitchChangePredsjednik(e.target.value);
                } else if (candidate.role.name === RoleEnum.Potpredsjednik) {
                  handleSwitchChangePotpredsjednik(e.target.value);
                }
              }}
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
            disabled={
              selectedCountPotpredsjednik > 2 || selectedCountPredsjednik > 1
            }
            loading={isLoading}
          >
            Unesi glasove
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default VotesFormUP;
