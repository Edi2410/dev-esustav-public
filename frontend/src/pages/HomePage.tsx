import React, { Suspense } from "react";
import { Layout, Spin, Flex } from "antd";
import { HomeOption } from "components";
import { useNavigate } from "react-router-dom";
import eAKTIVNOSTIicon from "../assets/images/eAKTIVNOSTI-icon.svg";
import eINFOicon from "../assets/images/eINFO-icon.svg";
import ePARTNERIicon from "../assets/images/ePARTNERI-icon.svg";
import eIZBORIicon from "../assets/images/eIZBORI-icon.svg";
import eADMINicon from "../assets/images/eADMIN-icon.svg";
import SUPRACHicon from "../assets/images/znamo_da_je_suprach-icon.svg";
import { useUserContext } from "hooks/useUserContext";

import "../styles/homePage.css";
import "../styles/navbarHeader.css";

const { Content } = Layout;

export const HomePage = () => {
  const { user } = useUserContext();

  const navigate = useNavigate();
  return (
    <Layout className="layoutHome">
      <div className="footerSize">
        <Content className="container">
          <Flex justify="center" align="center" wrap="wrap" gap="middle">
            {user?.permissions?.aktivnosti ? (
              <Suspense fallback={<Spin size="small" />}>
                <HomeOption
                  image={eAKTIVNOSTIicon}
                  onClick={() => {
                    navigate("/activity");
                  }}
                />
              </Suspense>
            ) : null}
            {user?.permissions?.info ? (
              <Suspense fallback={<Spin size="small" />}>
                <HomeOption
                  image={eINFOicon}
                  onClick={() => {
                    navigate("/info");
                  }}
                />
              </Suspense>
            ) : null}
            {user?.permissions?.partneri ? (
              <Suspense fallback={<Spin size="small" />}>
                <HomeOption
                  image={ePARTNERIicon}
                  onClick={() => {
                    navigate("/partners");
                  }}
                />
              </Suspense>
            ) : null}
            {user?.permissions?.izbori ? (
              <Suspense fallback={<Spin size="small" />}>
                <HomeOption
                  image={eIZBORIicon}
                  onClick={() => {
                    navigate("/elections");
                  }}
                />
              </Suspense>
            ) : null}
            {user?.permissions?.suprach ? (
              <Suspense fallback={<Spin size="small" />}>
                <HomeOption
                  image={SUPRACHicon}
                  onClick={() => {
                    navigate("/suprach");
                  }}
                />
              </Suspense>
            ) : null}
            {user?.permissions?.admin ? (
              <Suspense fallback={<Spin size="small" />}>
                <HomeOption
                  image={eADMINicon}
                  onClick={() => {
                    navigate("/admin");
                  }}
                />
              </Suspense>
            ) : null}
          </Flex>
        </Content>
      </div>
    </Layout>
  );
};
