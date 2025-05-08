import React from "react";
import { Button, Modal } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useDeleteActivity";
import { showDeleteConfirmModal } from "utils";

const { confirm } = Modal;
interface Props {
  activityID: number;
}

const DeleteActivity = ({ activityID }: Props) => {
  const DeleteActivity = useDeleteActivity();
  return (
    <>
      <Button
        icon={<IoTrashOutline size={20} />}
        onClick={() => showDeleteConfirmModal(activityID, DeleteActivity)}
        style={{ marginLeft: "5px" }}
      />
    </>
  );
};
export default DeleteActivity;
