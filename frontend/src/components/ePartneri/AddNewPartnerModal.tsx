
import React from "react";
import { Suspense, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { PartnerForm, } from "components";

const AddNewPartnerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        size="large"
        className="addButton"
        onClick={() => setIsModalOpen(true)}
      >
        Dodaj partnera
      </Button>
      <Modal
        title="Dodaj partnera"
        style={{ top: "40px" }}
        open={isModalOpen}
        footer={null}
        cancelText="Poništi"
        onOk={() => setIsModalOpen(false)}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        destroyOnClose={true}
      >
        <Suspense fallback={<Spin size="small" />}>
          <PartnerForm setIsModalOpen={setIsModalOpen} />
        </Suspense>
      </Modal>
    </>
  );
};
export default AddNewPartnerModal;
