import React from "react";

import { Button, Modal } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteContact } from "hooks/epartneri-hooks/Contact/useDeleteContact";

const { confirm } = Modal;
interface Props {
  contactID: number;
}

const showDeleteConfirm = (contactID: number, deleteContact: any) => {
  confirm({
    title: "Da li ste sigurni da želite obrisati kontakt?",
    okText: "Da",
    okType: "danger",
    cancelText: "Ne",
    onOk() {
      deleteContact.mutate(contactID);
    },
  });
};

const DeleteContactsButton = ({ contactID }: Props) => {
  const DeleteContact = useDeleteContact();
  return (
    <>
      <Button
        icon={<IoTrashOutline size={20} />}
        onClick={() => showDeleteConfirm(contactID, DeleteContact)}
        style={{ marginLeft: "5px" }}
      />
    </>
  );
};
export default DeleteContactsButton;
