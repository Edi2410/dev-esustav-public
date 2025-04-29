import React, { useState } from "react";
import { Button, Modal, QRCode, Flex, message } from "antd";
import { IoQrCodeOutline } from "react-icons/io5";
import { useUserContext } from "hooks/useUserContext";
import { useAddUserOnActivity } from "hooks/eaktivnosti-hooks/activity-hooks/useAddUserOnActivity";


const ScanQrCodeModal = () => {
  const [isScanQrModalOpen, setScanIsQrModalOpen] = useState(false);
  const { user } = useUserContext();
  const addUserOnActivity = useAddUserOnActivity();

  function saveUserActivity(result: string): void {
    const qrCodeValue = result.split(";");
    if (qrCodeValue[0] !== "esustavapp") {
      message.error("QR kod nije ispravan!");
      return;
    }
    if (user?.user?.id !== undefined || user?.academic_year?.id !== undefined) {
      if (qrCodeValue?.length === 2) {
        addUserOnActivity.mutate(
          {
            activity: Number(qrCodeValue[1]),
            user: user?.user?.id,
            academic_year: user?.academic_year?.id,
          },
          {
            onSuccess: () => setScanIsQrModalOpen(false),
          }
        );
      } else if (qrCodeValue?.length === 3) {
        addUserOnActivity.mutate(
          {
            activity: Number(qrCodeValue[1]),
            user: user?.user?.id,
            hours: Number(qrCodeValue[2]),
            academic_year: user?.academic_year?.id,
          },
          {
            onSuccess: () => setScanIsQrModalOpen(false),
          }
        );
      }
    } else {
      message.error("Aplikacije nema podatke o korisniku!");
    }
  }

  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: "5px", marginBottom: "5px" }}
        onClick={() => setScanIsQrModalOpen(true)}
      >
        Skeniraj prisutnost
      </Button>

      <Modal
        style={{ top: "40px" }}
        open={isScanQrModalOpen}
        footer={null}
        onOk={() => setScanIsQrModalOpen(false)}
        onCancel={() => {
          setScanIsQrModalOpen(false);
        }}
        destroyOnClose={true}
      >
      </Modal>
    </>
  );
};

export default ScanQrCodeModal;
