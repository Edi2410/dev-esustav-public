import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { recommendationTableConfigurations } from "./recommendationsTable";
import { ColumnType } from "antd/es/table";
import { RecommendationsType } from "@types";

describe("recommendationTableConfigurations", () => {
  it("should render 'Pozitivna' with green tag when passed is 'true'", () => {
    const column = recommendationTableConfigurations.find(
      (col) => col.title === "Ocjena rada"
    );
    const record = { passed: true };
    // @ts-ignore
    const Rendered = column!.render!(null, record);
    const { getByText } = render(Rendered as React.ReactElement);
    const el = getByText("Pozitivna");
    expect(el).not.toBeNull();
    const tag = el.closest(".ant-tag");
    expect(tag).not.toBeNull();
    expect(tag?.className.includes("ant-tag-green")).toBe(true);
  });

  it("should render 'Negativna' with red tag when passed is 'false'", () => {
    const column = recommendationTableConfigurations.find(
      (col) => col.title === "Ocjena rada"
    );
    const record = { passed: false };
    // @ts-ignore
    const Rendered = column!.render!(null, record);
    const { getByText } = render(Rendered as React.ReactElement);
    const el = getByText("Negativna");
    expect(el).not.toBeNull();
    const tag = el.closest(".ant-tag");
    expect(tag).not.toBeNull();
    expect(tag?.className.includes("ant-tag-red")).toBe(true);
  });

  it('should have "eSTUDENT" column with correct dataIndex', () => {
    const column = recommendationTableConfigurations.find(
      (col) => col.title === "eSTUDENT"
    ) as ColumnType<RecommendationsType> | undefined;
    expect(column).toBeDefined();
    expect(column?.dataIndex).toEqual(["user"]);
  });


});