import React from "react";
import { UserData } from "@types";
import { Image, Typography } from "antd";
import type { MenuProps } from "antd";
import { IoLogOutOutline } from "react-icons/io5";

export const useNavBarItems = (user: UserData | null) => {
  const items: MenuProps["items"] = [
    {
      key: "logout",
      icon: <IoLogOutOutline size={24} />,
      label: (
        <Typography.Text strong type={"danger"}>
          Odjavi se
        </Typography.Text>
      ),
      danger: true,
      onClick: () => {
        sessionStorage.removeItem("accessToken");
        window.location.reload();
      },
    },
  ];

  return items;
};
