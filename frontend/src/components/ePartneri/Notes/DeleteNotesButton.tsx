import React from "react";
import { Button, Modal } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteNotes } from "hooks/epartneri-hooks/Notes/useDeleteNotes";
import { showDeleteConfirmModal } from "utils";

const { confirm } = Modal;
interface Props {
  notesID: number;
}

const DeleteNotesButton = ({ notesID }: Props) => {
  const DeleteNotes = useDeleteNotes();
  return (
    <>
      <Button
        icon={<IoTrashOutline size={20} />}
        onClick={() => showDeleteConfirmModal(notesID, DeleteNotes)}
        style={{ marginLeft: "5px" }}
      />
    </>
  );
};
export default DeleteNotesButton;
