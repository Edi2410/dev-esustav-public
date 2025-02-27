import { Button, Flex, InputNumber, List, Modal, Select, message } from "antd";
import { useAddUserOnActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useAddUserOnActivity";
import { useDeleteUserOnActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useDeleteUserOnActivity";
import { useGetUserOnActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useGetUserOnActivity";
import { useUserContext } from "hooks/useUserContext";
import { useGetAllUsers } from "hooks/user-hooks/useGetAllUsers";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";
import { ActivityListType, User, UserOnActivityType } from "types";

interface Props {
  isUserModalActive: boolean;
  setIsUserModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  activity?: ActivityListType;
  setActivity: React.Dispatch<
    React.SetStateAction<ActivityListType | undefined>
  >;
}
const UserOnActivityModal = ({
  isUserModalActive,
  setIsUserModalActive,
  activity,
  setActivity,
}: Props) => {
  const { user } = useUserContext();
  const { data: usersData } = useGetAllUsers();
  const addUserOnActivity = useAddUserOnActivity();
  const deleteUserOnActivity = useDeleteUserOnActivity();
  const [selected, setSelected] = React.useState(null);
  const [hours, setHours] = React.useState<number | null>(null);
  const { data: userOnActivity, isLoading } = useGetUserOnActivity(
    activity?.id
  );
  return (
    <Modal
      title="Unesi prisutne eSTUDENTe"
      width={"80%"}
      open={isUserModalActive}
      footer={null}
      onCancel={() => {
        setIsUserModalActive(false);
        setActivity(undefined);
      }}
      onOk={() => setIsUserModalActive(false)}
    >
      <Flex>
        {activity?.activity_type.has_hour ? (
          <InputNumber
            placeholder="Broj sati"
            value={hours ? hours : undefined}
            style={{ marginRight: "5px" }}
            min={0}
            max={64}
            onChange={(value) => setHours(value)}
          />
        ) : (
          <></>
        )}
        <Select
          style={{ width: "250px" }}
          showSearch
          value={selected}
          placeholder="Odaberi eSTUDENTa"
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
          onSelect={(value) => {
            if (activity?.activity_type.has_hour) {
              if (hours) {
                if (activity?.id && value) {
                  addUserOnActivity.mutate({
                    activity: activity?.id ? activity.id : 0,
                    user: value,
                    hours: hours ? hours : 0,
                    academic_year: user?.academic_year?.id,
                  });
                }
              } else {
                message.info("Unesi broj sati");
              }
            } else {
              if (activity?.id && value) {
                addUserOnActivity.mutate({
                  activity: activity?.id ? activity.id : 0,
                  user: value,
                  academic_year: user?.academic_year?.id,
                });
              }
            }
            setSelected(null);
            setHours(null);
          }}
        >
          {usersData?.map((user: User) => (
            <Select.Option key={user.id} value={user.id} label={user.username}>
              {user.username}
            </Select.Option>
          ))}
        </Select>
      </Flex>
      <List
        loading={isLoading}
        dataSource={userOnActivity}
        renderItem={(item: UserOnActivityType, index) => (
          <List.Item key={index}>
            <List.Item.Meta title={item.user.username} />
            <List.Item.Meta title={item.hours} />
            <Button
              icon={<IoTrashOutline size={20} />}
              onClick={() => deleteUserOnActivity.mutate(item.id)}
              style={{ marginLeft: "5px" }}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};
export default UserOnActivityModal;
