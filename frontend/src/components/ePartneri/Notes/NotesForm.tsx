import React, { useEffect } from "react";
import {
  PartnerNotesCreateType,
  PartnerNotesListType,
  ProjectsType,
} from "@types";

import { Button, Flex, Form, Input, Select } from "antd";
import { AcademicYearType } from "types/UserTypes";
import dayjs from "dayjs";
import { useGetAllAcademicYear } from "hooks/useGetAllAcademicYear";
import { useGetProjectsList } from "hooks/epartneri-hooks/useGetProjectsList";
import { useCreateNotes } from "hooks/epartneri-hooks/Notes/useCreateNotes";
import { useUpdateNotes } from "hooks/epartneri-hooks/Notes/useUpdateNotes";

interface Props {
  partnerId: number;
  setIsNotesModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notesData?: PartnerNotesListType;
}

const NotesForm = ({ partnerId, setIsNotesModalOpen, notesData }: Props) => {
  const [partnerNotesForm] = Form.useForm();
  const { data: academicsYear } = useGetAllAcademicYear();
  const { data: project } = useGetProjectsList();
  const addNotes = useCreateNotes();
  const updateNotes = useUpdateNotes();
  useEffect(() => {
    if (notesData) {
      partnerNotesForm.setFieldsValue({
        id: notesData.id,
        academic_year: notesData.academic_year.id,
        project: notesData.project.id,
        notes: notesData.notes,
      });
    } else {
      partnerNotesForm.resetFields();
    }
  }, [notesData, partnerNotesForm]);

  const onSubmit = (values: PartnerNotesCreateType) => {
    if (notesData) {
      updateNotes.mutate(
        {
          ...values,
          id: notesData.id,
          partner: partnerId,
          date: dayjs().format("YYYY-MM-DD"),
        },
        {
          onSuccess: () => {
            setIsNotesModalOpen(false);
          },
        }
      );
    } else {
      addNotes.mutate(
        {
          ...values,
          partner: partnerId,
          date: dayjs().format("YYYY-MM-DD"),
        },
        {
          onSuccess: () => {
            setIsNotesModalOpen(false);
          },
        }
      );
    }
  };

  return (
    <Form form={partnerNotesForm} onFinish={onSubmit}>
      <Form.Item
        name={["academic_year"]}
        rules={[
          {
            required: true,
            message: "Odaberi godinu",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Godina"
          filterOption={(input, option) => {
            return (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
        >
          {academicsYear?.map((year: AcademicYearType) => (
            <Select.Option
              key={year.id}
              value={year.id}
              label={year.description}
            >
              {year.description}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={["project"]}
        rules={[
          {
            required: true,
            message: "Odaberi projekt",
          },
        ]}
      >
        <Select
          showSearch
          placeholder="Projekt"
          filterOption={(input, option) => {
            return (option?.label ?? "")
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase());
          }}
          filterSort={(optionA, optionB) => {
            return (optionA?.label ?? "")
              .toString()
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toString().toLowerCase());
          }}
        >
          {project?.map((project: ProjectsType) => (
            <Select.Option
              key={project.id}
              value={project.id}
              label={project.project_name}
            >
              {project.project_name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name={["notes"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            message: "Unesi bilješku",
          },
        ]}
      >
        <Input.TextArea
          showCount
          placeholder="Unesi bilješku"
          style={{ height: "100px" }}
        />
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

export default NotesForm;
