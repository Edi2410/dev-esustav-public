import { Button, Modal, Spin } from "antd";
import React, { Suspense, useState } from "react";
import { RecommendationsType } from "types";
import { IoCreateOutline } from "react-icons/io5";
import { RecommendationsForm } from "components";

interface Props {
  data: RecommendationsType;
}

const RecommendationsModal = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        className="editButton"
        icon={<IoCreateOutline size={20} />}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        title="Dodaj preporuku"
        style={{ top: "40px" }}
        width={"80%"}
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
          <RecommendationsForm setIsModalOpen={setIsModalOpen} data={data} />
        </Suspense>
      </Modal>
    </>
  );
};
export default RecommendationsModal;
