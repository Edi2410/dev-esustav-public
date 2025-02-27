import React, { useState } from "react";
import { NoPermission } from "components";
import { Button, Card, Checkbox, Flex, Form, Input, Radio } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetQuestions } from "hooks/suprach-hooks/useGetQuestions";
import { QuestionType } from "@types";

import "../../styles/suprach.css";
import { useGreadeUser } from "hooks/suprach-hooks/useGreadeUser";
import { useUserContext } from "hooks/useUserContext";

export const GreadingUserPage = () => {
  const { user } = useUserContext();
  if (!user?.permissions?.suprach) {
    return <NoPermission />;
  }
  const navigate = useNavigate();
  const [isAnonimno, setIsAnonimno] = useState(false);
  const { userToGradeId, isSpecialUser, name } = useParams<{
    userToGradeId: string;
    isSpecialUser: string;
    name: string;
  }>();
  const gradeUser = useGreadeUser();
  const { data: questions } = useGetQuestions(userToGradeId, isSpecialUser);

  const handleSubmit = (values: any) => {
    var sand_values = {};
    var questions = [];

    for (const value in values) {
      if (value !== "notes" && value !== "anonymous") {
        questions.push({
          question_id: value,
          grade: values[value],
        });
      } else {
        sand_values = {
          ...sand_values,
          anonymous: isAnonimno ? true : false,
          questions: questions,
          graded_id: userToGradeId,
          special: isSpecialUser === "true" ? true : false,
          [value]: values[value] ? values[value] : false,
        };
      }
    }

    gradeUser.mutate(sand_values, {
      onSuccess: () => {
        navigate(`/suprach`);
      },
    });
  };

  return (
    <div className="footerSize" style={{ margin: "0 2%" }}>
      <Flex justify="center" wrap="wrap" gap="small" vertical align="center">
        <Card style={{ width: "100%" }} title={name}>
          <Form onFinish={handleSubmit}>
            {questions?.map((question: QuestionType) => (
              <Form.Item
                key={question.id}
                name={question.id}
                rules={[
                  {
                    required: true,
                    message: "Odaberi ocjenu",
                  },
                ]}
              >
                <Card
                  key={question.id}
                  title={question.description}
                  style={{ width: "100%" }}
                >
                  <Radio.Group
                    key={question.id}
                    size="large"
                    buttonStyle="solid"
                    style={{ width: "100%" }}
                  >
                    <Radio.Button value="1" className="radioButton">
                      1
                    </Radio.Button>
                    <Radio.Button value="2" className="radioButton">
                      2
                    </Radio.Button>
                    <Radio.Button value="3" className="radioButton">
                      3
                    </Radio.Button>
                    <Radio.Button value="4" className="radioButton">
                      4
                    </Radio.Button>
                    <Radio.Button value="5" className="radioButton">
                      5
                    </Radio.Button>
                  </Radio.Group>
                </Card>
              </Form.Item>
            ))}

            <Flex justify="center" vertical align="center">
              <Form.Item
                name={["notes"]}
                style={{ width: "80% " }}
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
                  <strong>Predaj ocjene</strong>
                </Button>
              </Form.Item>
            </Flex>
          </Form>
        </Card>
      </Flex>
    </div>
  );
};
