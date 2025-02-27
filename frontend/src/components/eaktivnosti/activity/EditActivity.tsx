import React, { Suspense, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { ActivityListType } from "types";
import { ActivityForm } from "components";
import { IoCreateOutline } from "react-icons/io5";

interface Props {
  activity: ActivityListType;
}

const EditActivity = ({ activity }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        className="editButton"
        icon={<IoCreateOutline size={20} />}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        title="Uredi aktivnost"
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
          <ActivityForm setIsModalOpen={setIsModalOpen} activity={activity} />
        </Suspense>
      </Modal>
    </>
  );
};
export default EditActivity;
