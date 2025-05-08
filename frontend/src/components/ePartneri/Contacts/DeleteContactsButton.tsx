import React from "react";

import { Button, Modal } from "antd";
import { IoTrashOutline } from "react-icons/io5";
import { useDeleteContact } from "hooks/epartneri-hooks/Contact/useDeleteContact";
import { showDeleteConfirmModal } from "utils";

const { confirm } = Modal;
interface Props {
  contactID: number;
}

const DeleteContactsButton = ({ contactID }: Props) => {
  const DeleteContact = useDeleteContact();
  return (
    <>
      <Button
        icon={<IoTrashOutline size={20} />}
        onClick={() => showDeleteConfirmModal(contactID, DeleteContact)}
        style={{ marginLeft: "5px" }}
      />
    </>
  );
};
export default DeleteContactsButton;
