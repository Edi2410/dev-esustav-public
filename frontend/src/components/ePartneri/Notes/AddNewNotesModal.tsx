import React from "react";
import { NotesForm } from "@components";
import { Button, Modal, Spin } from "antd";
import { Suspense, useState } from "react";

interface Props {
  partnerId: number;
}

const AddNewNotesModal = ({ partnerId }: Props) => {
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        size="large"
        className="addButton"
        onClick={() => setIsNotesModalOpen(true)}
      >
        Dodaj bilješku za partnera
      </Button>
      <Modal
        title="Dodaj bilješku za partnera"
        style={{ top: "40px" }}
        open={isNotesModalOpen}
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
            partnerId={partnerId}
          />
        </Suspense>
      </Modal>
    </>
  );
};

export default AddNewNotesModal;
