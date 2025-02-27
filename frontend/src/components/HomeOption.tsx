import React from "react";
import { Image } from "antd";
import { useRef } from "react";

import "../styles/homeOption.css";

interface Props {
  onClick: () => void;
  image: string;
}

const HomeOption = ({ image, onClick }: Props) => {
  const windowWidth = useRef(window.innerWidth);
  return (
    <div
      className=" homeOption"
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <Image
        src={image}
        width={windowWidth.current < 480 ? windowWidth.current - 40 : 480}
        preview={false}
      />
    </div>
  );
};
export default HomeOption;
