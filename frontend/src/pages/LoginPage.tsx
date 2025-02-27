import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import eSustavLogo from "../assets/images/esustav.png";
import background from "../assets/images/mreza.png";
import { Image } from "antd";
import { useLoginUser } from "hooks/user-hooks/useLoginUser";
import { useUserContext } from "hooks/useUserContext";
import { useGetUserData } from "hooks/user-hooks/useGetUserData";


import "../styles/loginPage.css";

export const LoginPage = () => {
  const { setUser } = useUserContext();
  const { data: userData } = useGetUserData();
  const [credential, setCredential] = useState<string>();
  const { data: _ } = useLoginUser(credential);

  useEffect(() => {
    setUser(userData);
  }, [userData, setUser]);

  const responseGoogleSuccess = async (response: any) => {
    setCredential(response.credential);
  };
  return (
    <div
      className="login"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="containerLogin">
        <Image
          className="logo"
          preview={false}
          width={"70%"}
          src={eSustavLogo}
        />
        <GoogleLogin onSuccess={responseGoogleSuccess} />
      </div>
    </div>
  );
};
