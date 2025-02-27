import React, { Suspense, useState } from "react";
import { Button, Modal, Spin } from "antd";

import { ActivityForm } from "components";

const AddActivityButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        type="primary"
        size="large"
        className="addButton"
        onClick={() => setIsModalOpen(true)}
      >
        Dodaj aktivnosti
      </Button>
      <Modal
        title="Unos aktivnosti"
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
          <ActivityForm setIsModalOpen={setIsModalOpen} />
        </Suspense>
      </Modal>
    </>
  );
};

export default AddActivityButton;
