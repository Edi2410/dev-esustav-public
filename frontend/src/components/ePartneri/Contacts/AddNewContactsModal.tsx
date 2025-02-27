import React, { Suspense, useState } from "react";
import { Button, Modal, Spin } from "antd";

import { ContactsForm } from "components";

interface Props {
  partnerId: number;
}

const AddNewContactsModal = ({ partnerId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        size="large"
        className="addButton"
        onClick={() => setIsModalOpen(true)}
      >
        Dodaj kontakt
      </Button>
      <Modal
        title="Dodaj kontakt partneru"
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
          <ContactsForm setIsModalOpen={setIsModalOpen} partnerId={partnerId} />
        </Suspense>
      </Modal>
    </>
  );
};
export default AddNewContactsModal;
