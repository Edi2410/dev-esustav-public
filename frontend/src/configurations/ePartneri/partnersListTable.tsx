import React from "react";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { IoReaderOutline } from "react-icons/io5";
import { PartnerListTableType, ProjectsType } from "types";
import { useNavigate } from "react-router-dom";
import { EditPartnerButton } from "@components";
import { useGetProjectsList } from "hooks/epartneri-hooks/useGetProjectsList";

export const usePartnersListTable = () => {
  const { data: ProjectsData } = useGetProjectsList();
  const navigate = useNavigate();
  const partnersListTable: ColumnsType<PartnerListTableType> = [
    {
      title: "Pravno ime",
      dataIndex: ["partner", "legal_name"],
      filteredValue: [],
    },
    {
      title: "Ime brenda",
      dataIndex: ["partner", "brand_name"],
    },
    {
      title: "Projekti",
      dataIndex: "projects",
      filterSearch: true,
      render: (projects: string[]) => (
        <>
          {projects.map((project, index) => (
            <Tag key={index}>{project}</Tag>
          ))}
        </>
      ),
      filters: ProjectsData?.map((project: ProjectsType) => ({
        text: project.short_project_name,
        value: project.short_project_name,
      })),
      onFilter: (value, record) => {
        return record.projects
          .map((project) => project.toString())
          .includes(value.toString());
      },
    },
    {
      title: "Crna lista",
      dataIndex: ["partner", "black_list"],
      filteredValue: [],
      render: (black_list: boolean) =>
        black_list ? (
          <Tag color="#cd201f">
            <b>Na crnoj listi </b>
          </Tag>
        ) : (
          <></>
        ),
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Space wrap>
          <Button
            icon={<IoReaderOutline size={20} />}
            onClick={() => navigate(`/partners/${record.partner.id}`)}
          />
          <EditPartnerButton partnerData={record} />
        </Space>
      ),
    },
  ];

  return partnersListTable;
};

export const usePartnersListTableMobile = () => {
  const { data: ProjectsData } = useGetProjectsList();
  const navigate = useNavigate();
  const partnersListTable: ColumnsType<PartnerListTableType> = [
    {
      title: "Ime brenda",
      dataIndex: ["partner", "brand_name"],
    },
    {
      title: "Projekti",
      dataIndex: "projects",
      filterSearch: true,
      render: (projects: string[]) => (
        <>
          {projects.map((project, index) => (
            <Tag key={index}>{project}</Tag>
          ))}
        </>
      ),
      filters: ProjectsData?.map((project: ProjectsType) => ({
        text: project.short_project_name,
        value: project.short_project_name,
      })),
      onFilter: (value, record) => {
        return record.projects
          .map((project) => project.toString())
          .includes(value.toString());
      },
    },
    {
      title: "Crna lista",
      dataIndex: ["partner", "black_list"],
      filteredValue: [],
      render: (black_list: boolean) =>
        black_list ? (
          <Tag color="#cd201f">
            <b>Na crnoj listi </b>
          </Tag>
        ) : (
          <></>
        ),
    },
    {
      title: "",
      dataIndex: "",
      render: (_, record) => (
        <Space wrap>
          <Button
            icon={<IoReaderOutline size={20} />}
            onClick={() => navigate(`/partners/${record.partner.id}`)}
          />
          <EditPartnerButton partnerData={record} />
        </Space>
      ),
    },
  ];

  return partnersListTable;
};
