import React from "react";
import type { ColumnsType } from "antd/es/table";
import type { VotesResultsType } from "types";
import {
  IoCheckmarkDoneCircleOutline,
  IoCloseCircleOutline,
} from "react-icons/io5";
import { Flex, Tag } from "antd";

export const VotesColumns: ColumnsType<VotesResultsType> = [
  {
    title: "Kandidat",
    dataIndex: "candidate",
    key: "candidate",
  },
  {
    title: "Tim",
    dataIndex: "team",
    key: "team",
  },
  {
    title: "Pozicija",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Za",
    dataIndex: "votes_yes",
    key: "votes_yes",
  },
  {
    title: "Protiv",
    dataIndex: "votes_no",
    key: "votes_no",
  },
  {
    title: "",
    render: (_, record) =>
      record.votes_yes > record.votes_no ? (
        <Tag
          color="success"
          icon={
            <Flex>
              <IoCheckmarkDoneCircleOutline />
            </Flex>
          }
          style={{ padding: "3px" }}
        />
      ) : (
        <Tag
          color="error"
          icon={
            <Flex>
              <IoCloseCircleOutline />
            </Flex>
          }
          style={{ padding: "3px" }}
        />
      ),
  },
];
