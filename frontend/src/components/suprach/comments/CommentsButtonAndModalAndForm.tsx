import React, { Suspense, useState } from "react";
import { Button, Checkbox, Flex, Form, Input, Modal, Spin, Switch } from "antd";

import { ActivityForm } from "components";
import { useCommentUser } from "hooks/suprach-hooks/useCommentUser";

interface Props {
  userToGradeId: string;
  userToGradeName: string;
}

const CommentsButtonAndModalAndForm = ({
  userToGradeId,
  userToGradeName,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAnonimno, setIsAnonimno] = useState(false);
  const commentUser = useCommentUser();

  const handleSubmit = (values: any) => {
    const sand_values = {
      notes: values?.notes,
      graded_id: userToGradeId,
      anonymous: isAnonimno ? true : false,
    };
    commentUser.mutate(sand_values, {
      onSuccess: () => setIsModalOpen(false),
    });
  };
  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Predaj komentar
      </Button>
      <Modal
        title={"Unesi komentar za: " + userToGradeName}
        style={{ top: "40px" }}
        open={isModalOpen}
        footer={null}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose={true}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            name={["notes"]}
            style={{ width: "100% " }}
            rules={[
              {
                required: true,
                message: "Komentar mora imati minimalno 50 znakova",
                min: 50,
              },
            ]}
          >
            <Input.TextArea
              showCount
              placeholder="Unesi komentar"
              style={{ height: "100px" }}
            />
          </Form.Item>
          <Flex justify="end" align="center">
            <Form.Item
              name={"anonymous"}
              style={{ width: "200px" }}
              valuePropName="checked"
            >
              <Checkbox onChange={() => setIsAnonimno(!isAnonimno)}>
                Anonimni komentar
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                <strong>Unesi komentar</strong>
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </>
  );
};

export default CommentsButtonAndModalAndForm;
