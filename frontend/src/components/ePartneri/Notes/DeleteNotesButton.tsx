import React from "react";
import { Button, Modal } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteNotes } from "hooks/epartneri-hooks/Notes/useDeleteNotes";

const { confirm } = Modal;
interface Props {
  notesID?: number;
}

const showDeleteConfirm = (DeleteNotes: any, notesID?: number) => {
  confirm({
    title: "Da li ste sigurni da želite obrisati bilješku?",
    okText: "Da",
    okType: "danger",
    cancelText: "Ne",
    onOk() {
      DeleteNotes.mutate(notesID);
    },
  });
};

const DeleteNotesButton = ({ notesID }: Props) => {
  const DeleteNotes = useDeleteNotes();
  return (
    <>
      <Button
        icon={<IoTrashOutline size={20} />}
        onClick={() => showDeleteConfirm(DeleteNotes, notesID)}
        style={{ marginLeft: "5px" }}
      />
    </>
  );
};
export default DeleteNotesButton;
