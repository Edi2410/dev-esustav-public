import React, { useEffect } from "react";
import { Form, Button, Input, DatePicker, Select, Flex } from "antd";

import {
  ActivityType,
  Team,
  ActivityListType,
  CreateActivityType,
} from "types";
import moment from "moment";
import dayjs from "dayjs";
import { useGetAllActivityType } from "hooks/eaktivnosti-hooks/activity-hooks/useGetAllActivityType";
import { useGetAllTeams } from "hooks/useGetAllTeams";
import { useUserContext } from "hooks/useUserContext";
import { useUpdateActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useUpdateActivity";
import { useAddNewActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useAddNewActivity";
import { useGetAllVirtualTeams } from "hooks/useGetAllVirtualTeams";
interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activity?: ActivityListType;
}

const ActivityForm = ({ setIsModalOpen, activity }: Props) => {
  const { data: activityTypes } = useGetAllActivityType();
  const { data: teamsData } = useGetAllTeams();
  const { data: virtualTeamsData } = useGetAllVirtualTeams();
  const { user } = useUserContext();
  const updateActivit = useUpdateActivity();
  const [activityFormValue] = Form.useForm();
  const addNewActivity = useAddNewActivity();

  useEffect(() => {
    if (activity) {
      activityFormValue.setFieldsValue({
        title: activity.title,
        description: activity.description,
        date: dayjs(activity.date),
        location: activity.location,
        team: activity?.team?.id,
        virtual_team: activity?.virtual_team?.id,
        activity_type: activity?.activity_type?.id,
      });
    } else {
      activityFormValue.resetFields();
      activityFormValue.setFieldsValue({
        team: user?.team?.id,
        virtual_team: user?.virtual_team?.id,
      });
    }
  }, [activity, activityFormValue]);

  const onSubmit = (values: any) => {
    const sandValue: CreateActivityType = {
      ...values,
      id: activity?.id,
      academic_year: user?.academic_year.id,
      responsible_user: user?.user.id,
      date: values.date.format("YYYY-MM-DD"),
      virtual_team: values.virtual_team ? values.virtual_team : null,
    };
    if (activity) {
      updateActivit.mutate(
        {
          ...sandValue,
          activity_type: activity.activity_type.id,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      addNewActivity.mutate(sandValue, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  return (
    <Form form={activityFormValue} onFinish={onSubmit}>
      <Form.Item
        name={["title"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            message: "Unesi naslov",
            max: 200,
          },
        ]}
      >
        <Input showCount placeholder="Naslov" max={200} />
      </Form.Item>
      <Form.Item
        name={["description"]}
        style={{ width: "100%" }}
        rules={[
          {
            max: 512,
            required: true,
            message: "Unesi opis",
          },
        ]}
      >
        <Input.TextArea
          showCount
          maxLength={512}
          style={{ height: "100px" }}
          placeholder="Opis aktivnosti"
        />
      </Form.Item>
      <Form.Item
        style={{ width: "100%" }}
        name={["date"]}
        rules={[{ required: true, message: "Odaberi datum" }]}
      >
        <DatePicker
          style={{ width: "100%" }}
          className="datePickerForm"
          placeholder="Odaberi datum"
          format="DD.MM.YYYY"
        />
      </Form.Item>
      <Form.Item
        name={["location"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            max: 100,
            message: "Unesi lokaciju",
          },
        ]}
      >
        <Input placeholder="Lokacija" max={100} />
      </Form.Item>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Form.Item
          label="Organizator:"
          name={["team"]}
          rules={[
            {
              required: true,
              message: "Odaberi tim",
            },
          ]}
        >
          <Select
            style={{ width: "100px" }}
            showSearch
            placeholder="Organizator"
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
            {teamsData?.map((team: Team) => (
              <Select.Option
                key={team.id}
                value={team.id}
                label={team.short_name}
              >
                {team.short_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Podtim:" name={["virtual_team"]}>
          <Select
            style={{ width: "150px" }}
            showSearch
            allowClear
            placeholder="Ukoliko postoji"
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
            {virtualTeamsData?.map((team: Team) => (
              <Select.Option
                key={team.id}
                value={team.id}
                label={team.short_name}
              >
                {team.short_name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      {activity ? null : (
        <Form.Item
          name={["activity_type"]}
          rules={[{ required: true, message: "Odaberi tip aktivnosti" }]}
        >
          <Select
            showSearch
            placeholder="Odaberi tip aktivnost"
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
            {activityTypes?.map((activiti: ActivityType) => (
              <Select.Option
                key={activiti.id}
                value={activiti.id}
                label={activiti.name}
              >
                {activiti.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      )}
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
export default ActivityForm;
