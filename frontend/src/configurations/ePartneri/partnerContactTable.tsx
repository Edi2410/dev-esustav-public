import { ColumnsType } from "antd/es/table";
import { PartnersContactListType } from "types";
import React, { Suspense } from "react";
import { Spin } from "antd";
import {
  AddNewContactsModal,
  DeleteContactsButton,
  EditContactModal,
} from "components";

export const usePartnerContactTable = (partnerId: number) => {
  const partnerContacTable: ColumnsType<PartnersContactListType> = [
    {
      key: "1",
      title: "Ime",
      dataIndex: ["name"],
    },
    {
      key: "2",
      title: "e-mail",
      dataIndex: ["email"],
    },
    {
      key: "3",
      title: "Broj mobitela",
      dataIndex: ["phone_number"],
    },
    {
      key: "4",
      title: "Pozicija",
      dataIndex: ["position"],
    },
    {
      key: "5",
      title: "Datum",
      dataIndex: ["date"],
    },
    {
      key: "6",
      title: (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Suspense fallback={<Spin size="small" />}>
            <AddNewContactsModal partnerId={partnerId} />
          </Suspense>
        </div>
      ),
      dataIndex: "",
      render: (render) => (
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Suspense fallback={<Spin size="small" />}>
            <DeleteContactsButton contactID={render.id} />
            <EditContactModal contactData={render} />
          </Suspense>
        </div>
      ),
    },
  ];
  return partnerContacTable;
};
