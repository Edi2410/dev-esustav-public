import React, { Suspense, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { PartnerListTableType, PartnerNotesListType } from "types";
import { PartnerForm } from "components";
import { IoCreateOutline } from "react-icons/io5";

interface Props {
  partnerData: PartnerListTableType;
}

const EditPartnerButton = ({ partnerData }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <Button
        style={{ marginRight: "5px" }}
        className="editButton"
        icon={<IoCreateOutline size={20} />}
        onClick={() => setIsModalOpen(true)}
      />
      <Modal
        title="Uredi pratnera"
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
          <PartnerForm
            partnerData={partnerData}
            setIsModalOpen={setIsModalOpen}
          />
        </Suspense>
      </Modal>
    </>
  );
};
export default EditPartnerButton;
