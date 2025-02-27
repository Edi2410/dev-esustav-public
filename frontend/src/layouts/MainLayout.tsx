import React from "react";
import { Flex, Layout, Typography } from "antd";
import { NavBar, RoutesList } from "components";
import background from "../assets/images/mreza.png";
import { useMediaQuery } from "react-responsive";

export const MainLayout = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 562px)",
  });
  return (
    <Layout
      className="homeLayout"
      style={{ backgroundImage: `url(${background})` }}
    >
      <Layout.Header className="homeHeader">
        <NavBar />
      </Layout.Header>
      <RoutesList />

      <Layout.Footer className="homeFooter">
        <div className="footerColumn" style={{ textAlign: "left" }}>
          <Typography.Text style={{ color: "white" }}>
            {isMobile
              ? "eSUSTAV ©2023 eSTUDENT"
              : "eSUSTAV ©2023 Created by IT (E.G.) for eSTUDENT"}
          </Typography.Text>
        </div>
        <div className="footerColumn" style={{ textAlign: "center" }}>
          <Typography.Text strong style={{ color: "white" }}>
            {isMobile
              ? "it.podrska@estudent.hr"
              : "IT podrška: it.podrska@estudent.hr"}
          </Typography.Text>
        </div>
        {!isMobile && (
          <div className="footerColumn" style={{ textAlign: "right" }}>
            <Typography.Text style={{ color: "white" }}>
              v0.8.0 beta
            </Typography.Text>
          </div>
        )}
      </Layout.Footer>
    </Layout>
  );
};
