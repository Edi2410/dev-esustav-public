import React, { Suspense, useState } from "react";
import { Button, Modal, Spin } from "antd";
import { ActivityListType, PartnersContactListType } from "types";
import { ActivityForm, ContactsForm } from "components";
import { IoCreateOutline } from "react-icons/io5";

interface Props {
  contactData: PartnersContactListType;
}

const EditActivity = ({ contactData }: Props) => {
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
        title="Uredi kontakt"
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
          <ContactsForm
            setIsModalOpen={setIsModalOpen}
            contactData={contactData}
            partnerId={contactData?.partner?.id!}
          />
        </Suspense>
      </Modal>
    </>
  );
};
export default EditActivity;
