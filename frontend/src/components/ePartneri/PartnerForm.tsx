import React from "react";
import { PartnerDataType, PartnerListTableType } from "@types";
import { useEffect } from "react";
import { Button, Flex, Form, Input, Switch } from "antd";
import { useUpdatePartner } from "hooks/epartneri-hooks/useUpdatePartner";
import { useAddNewPartner } from "hooks/epartneri-hooks/useAddNewPartner";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  partnerData?: PartnerListTableType;
}

const PartnerForm = ({ setIsModalOpen, partnerData }: Props) => {
  const [partnerForm] = Form.useForm();
  const addPartner = useAddNewPartner();
  const updatePartner = useUpdatePartner();
  useEffect(() => {
    if (partnerData) {
      partnerForm.setFieldsValue({
        id: partnerData.partner.id,
        legal_name: partnerData.partner.legal_name,
        brand_name: partnerData.partner.brand_name,
        oib: partnerData.partner.oib,
        address: partnerData.partner.address,
        black_list: partnerData.partner.black_list,
      });
    } else {
      partnerForm.resetFields();
    }
  }, [partnerData, partnerForm]);

  const onSubmit = (values: PartnerDataType) => {
    if (partnerData) {
      updatePartner.mutate(
        {
          ...values,
          id: partnerData.partner.id,
          black_list: values.black_list ? true : false,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      addPartner.mutate(
        {
          ...values,
          black_list: values.black_list ? true : false,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    }
  };
  return (
    <Form form={partnerForm} onFinish={onSubmit}>
      <Form.Item
        name={["legal_name"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            max: 255,
            message: "Unesi pravno ime partnera",
          },
        ]}
      >
        <Input showCount placeholder="Pravno ime partnera" />
      </Form.Item>
      <Form.Item
        name={["brand_name"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            max: 255,
            message: "Unesi ime brenda partnera",
          },
        ]}
      >
        <Input showCount placeholder="Brend ime" />
      </Form.Item>
      <Form.Item
        name={["oib"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            max: 32,
            message: "Unesi oib partnera",
          },
        ]}
      >
        <Input showCount placeholder="OIB" />
      </Form.Item>
      <Form.Item
        name={["address"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            max: 255,
            message: "Unesi adresu partnera",
          },
        ]}
      >
        <Input showCount placeholder="Unesi adresu partnera" />
      </Form.Item>
      <Form.Item
        label="Crna lista partnera"
        name={["black_list"]}
        style={{ width: "100%" }}
      >
        <Switch defaultValue={partnerData?.partner.black_list} />
      </Form.Item>

      <Flex justify="flex-end">
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Unesi
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};
export default PartnerForm;
