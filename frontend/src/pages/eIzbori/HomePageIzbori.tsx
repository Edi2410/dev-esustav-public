import React, { Suspense } from "react";
import "../../styles/eizbori.css";
import { useGetElectionsType } from "hooks/eizbori-hooks/useGetElectionsType";
import { Spin, Typography } from "antd";
import {
  ElectionsVoditelji,
  ElectionsUP,
  ElectionsDocuments,
} from "@components";

export const HomePageIzbori = () => {
  const { data: electionsType } = useGetElectionsType();

  return (
    <div className="footerSize" style={{ margin: "0 2%" }}>
      {electionsType?.for_leadership ? (
        <Suspense fallback={<Spin size="small" />}>
          <ElectionsVoditelji elections={electionsType} />
        </Suspense>
      ) : electionsType?.for_up ? (
        <Suspense fallback={<Spin size="small" />}>
          <ElectionsUP elections={electionsType} />
        </Suspense>
      ) : electionsType?.for_documents ? (
        <ElectionsDocuments elections={electionsType} />
      ) : (
        <Typography.Title style={{ color: "white" }}>
          Trenutno nema aktivnih izbora
        </Typography.Title>
      )}
    </div>
  );
};
