import React from "react";
import { CertificateRequirementsType } from "@types";
import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useUpdateCertificateRequirementsStatus } from "hooks/einfo-hooks/useUpdateCertificateRequirementsStatus";

interface Props {
  value: CertificateRequirementsType;
  type: "suprach_1" | "suprach_2" | "zivotopis" | "bootcamp";
}

const InfoAdminUpdateSpecificRow = ({ value, type }: Props) => {
  const updateStatus = useUpdateCertificateRequirementsStatus();
  var chacked = false;

  switch (type) {
    case "suprach_1":
      chacked = value.suprach_1;
      break;
    case "suprach_2":
      chacked = value.suprach_2;
      break;
    case "zivotopis":
      chacked = value.zivotopis;
      break;
    case "bootcamp":
      chacked = value.bootcamp;
      break;
    default:
      break;
  }

  function handleChange(e: CheckboxChangeEvent): void {
    const sendValue = {
      ...value,
      academic_year: value.academic_year.id,
      user: value.user.id,
    };
    switch (type) {
      case "suprach_1":
        sendValue.suprach_1 = e.target.checked;
        break;
      case "suprach_2":
        sendValue.suprach_2 = e.target.checked;
        break;
      case "zivotopis":
        sendValue.zivotopis = e.target.checked;
        break;
      case "bootcamp":
        sendValue.bootcamp = e.target.checked;
        break;
      default:
        break;
    }
    updateStatus.mutate(sendValue);
  }

  return (
    <>
      <Checkbox defaultChecked={chacked} onChange={handleChange}>
        {" "}
        Ispunio
      </Checkbox>
    </>
  );
};
export default InfoAdminUpdateSpecificRow;
