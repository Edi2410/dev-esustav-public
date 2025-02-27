import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  QRCode,
  Flex,
  InputNumber,
  Typography,
  Tooltip,
} from "antd";
import { IoQrCodeOutline } from "react-icons/io5";
import { ActivityListType } from "@types";

interface Props {
  activity: ActivityListType;
}

const QrCodeModal = ({ activity }: Props) => {
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const [hours, setHours] = React.useState<number | null>(null);
  const [qrCodeValue, setQrCodeValue] = React.useState<string>("");

  useEffect(() => {
    if (hours !== null && activity?.activity_type.has_hour) {
      setQrCodeValue(
        "esustavapp;" + activity.id.toString() + ";" + hours?.toString()
      );
    } else setQrCodeValue("esustavapp;" + activity.id.toString());
  }, [hours, activity]);

  return (
    <>
      <Button
        style={{ marginRight: "5px" }}
        className="addButton"
        onClick={() => setIsQrModalOpen(true)}
        icon={<IoQrCodeOutline size={20} />}
      />

      <Modal
        style={{ top: "40px" }}
        open={isQrModalOpen}
        footer={null}
        onOk={() => setIsQrModalOpen(false)}
        onCancel={() => {
          setIsQrModalOpen(false);
        }}
        destroyOnClose={true}
      >
        {activity?.activity_type.has_hour && (
          <>
            <Typography.Text>
              Upiši broj sati kako bi dobio QR kod: {""}
            </Typography.Text>
            <InputNumber
              style={{ margin: "10px 0" }}
              placeholder="Broj sati"
              value={hours ? hours : undefined}
              min={1}
              max={64}
              onChange={(value) => setHours(value)}
            />
          </>
        )}
        {activity?.activity_type.has_hour && hours !== null ? (
          <Flex id="myqrcode" align="center" justify="center">
            <QRCode bgColor="#fff" size={256} value={qrCodeValue} />
          </Flex>
        ) : !activity?.activity_type.has_hour ? (
          <Flex id="myqrcode" align="center" justify="center">
            <QRCode bgColor="#fff" size={256} value={qrCodeValue} />
          </Flex>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
};

export default QrCodeModal;
