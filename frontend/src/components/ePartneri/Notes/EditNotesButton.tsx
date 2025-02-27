import React, { Suspense, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { PartnerNotesListType } from "types";
import { NotesForm } from "components";
import { IoCreateOutline } from "react-icons/io5";

interface Props {
  partnerId: number;
  notesData: PartnerNotesListType;
}

const EditNotesButton = ({ notesData, partnerId }: Props) => {
  const [isModalOpen, setIsNotesModalOpen] = useState(false);
  return (
    <>
      <Button
        style={{ marginRight: "5px" }}
        className="editButton"
        icon={<IoCreateOutline size={20} />}
        onClick={() => setIsNotesModalOpen(true)}
      />
      <Modal
        title="Uredi bilješku"
        style={{ top: "40px" }}
        open={isModalOpen}
        footer={null}
        cancelText="Poništi"
        onOk={() => setIsNotesModalOpen(false)}
        onCancel={() => {
          setIsNotesModalOpen(false);
        }}
        destroyOnClose={true}
      >
        <Suspense fallback={<Spin size="small" />}>
          <NotesForm
            setIsNotesModalOpen={setIsNotesModalOpen}
            notesData={notesData}
            partnerId={partnerId}
          />
        </Suspense>
      </Modal>
    </>
  );
};
export default EditNotesButton;
