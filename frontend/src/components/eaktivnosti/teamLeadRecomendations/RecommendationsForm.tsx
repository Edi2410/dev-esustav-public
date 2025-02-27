import React from "react";
import { Form, Button, Input, Checkbox, Flex } from "antd";

import { RecommendationsType } from "types";
import { useAddUserRecomendations } from "hooks/eaktivnosti-hooks/teamLeadRecomendations-hooks/useAddUserRecomendations";
import { useUserContext } from "hooks/useUserContext";
interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: RecommendationsType;
}
const RecommendationsForm = ({ setIsModalOpen, data }: Props) => {
  const { user } = useUserContext();
  const addRecommendations = useAddUserRecomendations();

  const onSubmit = (values: any) => {
    const sendData = {
      ...values,
      user: data.user_id,
      passed: values.passed ? true : false,
      recommender: user?.user.id,
      academic_year: user?.academic_year.id,
    };
    addRecommendations.mutate(sendData, {
      onSuccess: () => setIsModalOpen(false),
    });
    setIsModalOpen(false);
  };

  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        initialValue={data.recommendation}
        name={["recommendation"]}
        style={{ width: "100%" }}
        rules={[
          {
            max: 1500,
            required: true,
            message: "Unesi preporuku",
          },
        ]}
      >
        <Input.TextArea
          showCount
          maxLength={1500}
          style={{ height: "300px" }}
          placeholder="Unesi preporuku"
        />
      </Form.Item>
      <Form.Item
        label="Pozitivna ocjena rada:"
        name="passed"
        valuePropName="checked"
        initialValue={data.passed}
      >
        <Checkbox />
      </Form.Item>

      <Flex justify="flex-end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Unesi
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default RecommendationsForm;
