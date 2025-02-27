import React from "react";
import { Button, Modal } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useDeleteActivity";

const { confirm } = Modal;
interface Props {
  activityID: number;
}

const showDeleteConfirm = (hoursId: number, deleteActivity: any) => {
  confirm({
    title: "Da li ste sigurni da želite obrisati aktivnost?",
    okText: "Da",
    okType: "danger",
    cancelText: "Ne",
    onOk() {
      deleteActivity.mutate(hoursId);
    },
  });
};

const DeleteActivity = ({ activityID }: Props) => {
  const DeleteActivity = useDeleteActivity();
  return (
    <>
      <Button
        icon={<IoTrashOutline size={20} />}
        onClick={() => showDeleteConfirm(activityID, DeleteActivity)}
        style={{ marginLeft: "5px" }}
      />
    </>
  );
};
export default DeleteActivity;
