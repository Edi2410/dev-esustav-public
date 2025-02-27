import React from "react";
import { Button, Flex, Image, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const NoPermission = () => {
  const navigate = useNavigate();
  return (
    <Flex gap="middle" vertical align="center" justify="center">
      <Typography.Title style={{ color: "white" }}>
        Nemaš dozvolu za pristup!
      </Typography.Title>
      <Button
        onClick={() => {
          navigate("/");
        }}
        type="primary"
        style={{
          width: "300px",
          fontWeight: "bolder",
        }}
      >
        Vrati se na početnu stranicu!
      </Button>
    </Flex>
  );
};
export default NoPermission;
