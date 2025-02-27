import React, { Suspense } from "react";
import { Card, Spin, Tabs } from "antd";
import type { TabsProps } from "antd";
import {
  CommentsAndGradesForSpecial,
  CommentsOverview,
  GradesOverview,
  UsersWhoNotFillSuprach,
} from "@components";

export const suprachOverviewTabsItems: TabsProps["items"] = [
  {
    key: "1",
    label: "Ocjene",
    children: (
      <Suspense fallback={<Spin size="small" />}>
        <GradesOverview />
      </Suspense>
    ),
  },
  {
    key: "2",
    label: "Komentari",
    children: (
      <Suspense fallback={<Spin size="small" />}>
        <CommentsOverview />
      </Suspense>
    ),
  },
];

export const suprachOverviewTabsItemsAdmin: TabsProps["items"] = [
  {
    key: "1",
    label: "Ocjene",
    children: (
      <Suspense fallback={<Spin size="small" />}>
        <GradesOverview />
      </Suspense>
    ),
  },
  {
    key: "2",
    label: "Komentari",
    children: (
      <Suspense fallback={<Spin size="small" />}>
        <CommentsOverview />
      </Suspense>
    ),
  },
  {
    key: "3",
    label: "Ocjene i komentari za posebne",
    children: (
      <Suspense fallback={<Spin size="small" />}>
        <CommentsAndGradesForSpecial />
      </Suspense>
    ),
  },
  {
    key: "4",
    label: "Osobe koju nisu ispunile",
    children: (
      <Suspense fallback={<Spin size="small" />}>
        <UsersWhoNotFillSuprach />
      </Suspense>
    ),
  },
];
