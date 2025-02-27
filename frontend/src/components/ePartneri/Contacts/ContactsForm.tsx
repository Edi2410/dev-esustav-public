import React, { useEffect } from "react";
import {
  PartnerDataType,
  PartnersContactCreateType,
  PartnersContactListType,
} from "@types";
import { Button, Flex, Form, Input, Switch } from "antd";
import dayjs from "dayjs";
import { useCreateContact } from "hooks/epartneri-hooks/Contact/useCreateContact";
import { useUpdateContact } from "hooks/epartneri-hooks/Contact/useUpdateContact";

interface Props {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  partnerId: number;
  contactData?: PartnersContactListType;
}

const ContactsForm = ({
  setIsModalOpen,
  contactData,
  partnerId,
}: Props) => {
  const [partnerContactForm] = Form.useForm();
  const addContact = useCreateContact();
  const updatePartner = useUpdateContact();
  useEffect(() => {
    if (contactData) {
      partnerContactForm.setFieldsValue({
        id: contactData.id,
        email: contactData.email,
        name: contactData.name,
        position: contactData.position,
        phone_number: contactData.phone_number,
      });
    } else {
      partnerContactForm.resetFields();
    }
  }, [partnerContactForm, partnerContactForm]);

  const onSubmit = (values: PartnersContactCreateType) => {
    if (contactData) {
      updatePartner.mutate(
        {
          ...values,
          id: contactData.id,
          partner: partnerId,
          date: dayjs().format("YYYY-MM-DD"),
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      addContact.mutate(
        {
          ...values,
          partner: partnerId,
          date: dayjs().format("YYYY-MM-DD"),
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
    <Form form={partnerContactForm} onFinish={onSubmit}>
      <Form.Item
        name={["name"]}
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            max: 255,
            message: "Unesi ime i prezime osobe",
          },
        ]}
      >
        <Input showCount placeholder="Ime i prezime kontakt osobe" />
      </Form.Item>
      <Form.Item
        name={["email"]}
        style={{ width: "100%" }}
        rules={[
          {
            max: 255,
          },
        ]}
      >
        <Input showCount placeholder="Email" />
      </Form.Item>
      <Form.Item
        name={["phone_number"]}
        style={{ width: "100%" }}
        rules={[
          {
            max: 255,
          },
        ]}
      >
        <Input showCount placeholder="Broj mobitela" />
      </Form.Item>
      <Form.Item
        name={["position"]}
        style={{ width: "100%" }}
        rules={[
          {
            max: 255,
          },
        ]}
      >
        <Input showCount placeholder="Unesi poziciju kontakta" />
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
export default ContactsForm;
