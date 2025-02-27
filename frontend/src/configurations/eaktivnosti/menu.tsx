import React from "react";
import type { MenuProps } from "antd";
import { IoListSharp, IoHeartOutline } from "react-icons/io5";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const items: MenuItem[] = [
  getItem(
    "Aktivnosti",
    "activity",
    null,
    [
      getItem(
        <div className="menuItem">
          <IoListSharp size={"20px"} />
          <span>Popis aktivnosti</span>
        </div>,
        "1"
      ),
      getItem(
        <div className="menuItem">
          <IoHeartOutline size={"18px"} />
          <span>Preporuke voditelja</span>
        </div>,
        "2"
      ),
    ],
    "group"
  ),
];
