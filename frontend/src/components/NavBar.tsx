import React from "react";
import { Layout, Image, Button, Dropdown } from "antd";

import { useMediaQuery } from "react-responsive";
import Logo from "../assets/images/esustav.png";

import { useNavigate } from "react-router-dom";
import { useNavBarItems } from "@configurations";
import "../styles/mainLayout.css";
import { useUserContext } from "hooks/useUserContext";

const layoutStyle: React.CSSProperties = {
  background: "#c5272f",
  flexDirection: "row",
  backgroundColor: "#c5272f",
  width: "100%",
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
};

const NavBar: React.FC = () => {
  const { user } = useUserContext();
  const items = useNavBarItems(user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery({
    query: "(max-width: 562px)",
  });
  const removePhoto = useMediaQuery({
    query: "(max-width: 1000px)",
  });

  return (
    <Layout style={layoutStyle} className="container">
      <Image
        src={Logo}
        style={{ padding: "20px 0px" }}
        height={"100%"}
        width={"150px"}
        preview={false}
        onClick={() => navigate("/")}
      />
      <Dropdown
        menu={{ items }}
        placement="bottomRight"
        trigger={["click"]}
        arrow
      >
        <Button
          className="profileButton"
          icon={
            <Image
              src={user?.user?.photo}
              height={28}
              width={28}
              preview={false}
            />
          }
        >
          {isMobile ? (
            <>
              {user?.user?.first_name} {user?.user?.last_name[0]}
              {"."}
            </>
          ) : (
            <>
              {user?.user?.first_name} {user?.user?.last_name}
            </>
          )}
        </Button>
      </Dropdown>
    </Layout>
  );
};
export default NavBar;
