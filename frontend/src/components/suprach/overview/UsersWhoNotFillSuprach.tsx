import { UserData } from "@types";
import { Card, List } from "antd";
import { useGetUsersWhoNotFillSuprach } from "hooks/suprach-hooks/useGetUsersWhoNotFillSuprach";
import React from "react";

const UsersWhoNotFillSuprach = () => {
  const { data: usersWhoNotFillSuprach } = useGetUsersWhoNotFillSuprach();

  return (
    <div
      className="containerShadowBottomRadius footerSize"
      style={{ backgroundColor: "white", padding: "10px" }}
    >
      <Card
        title={
          "Broj osoba koje nisu ispunile suprach: " +
          usersWhoNotFillSuprach?.length
        }
        bordered={false}
      >
        <List
          dataSource={usersWhoNotFillSuprach}
          renderItem={(item: UserData) => (
            <List.Item>{item?.user?.username}</List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default UsersWhoNotFillSuprach;
