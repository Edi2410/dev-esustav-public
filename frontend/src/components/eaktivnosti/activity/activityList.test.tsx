import React from "react";
import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ActivityList from "./ActivityList";

// MOCKS:
const mockTeam = { id: 1, name: "Test tim", TeamGroups: { id: 1, name: "IT" } };
const mockVirtualTeam = { id: 3, name: "Virtual tim" };
const mockUser = {
  id: 2,
  first_name: "Ivo",
  last_name: "Ivić",
  role: { name: "Voditelj" },
  team: mockTeam,
  team_group: { id: 1, name: "Informacijske tehnologije" },
};
const mockActivityType = { id: 12, name: "Mentorstvo", has_hour: true };
const mockAcademicYearType = { id: 2, name: "2023/24" };
const mockActivityListItem = {
  id: 7,
  title: "Radionica React",
  description: "Nauči React",
  date: "2024-06-11",
  location: "CARNET",
  responsible_user: mockUser,
  team: mockTeam,
  virtual_team: mockVirtualTeam,
  activity_type: mockActivityType,
  academic_year: mockAcademicYearType,
};

let useMediaQueryMock: any;
vi.mock("react-responsive", () => ({
  useMediaQuery: (...args: any) => useMediaQueryMock?.(...args),
}));

vi.mock("hooks/eaktivnosti-hooks/activity-hooks/useGetAllActivity", () => ({
  useGetAllActivity: () => ({
    data: [mockActivityListItem],
    isLoading: false,
  }),
}));

vi.mock("hooks/useUserContext", () => ({
  useUserContext: () => ({
    user: mockUser,
  }),
}));

vi.mock("configurations", () => ({
  useActivityTableConfigurations: () => [
    { title: "Naziv", dataIndex: "title", key: "title" },
  ],
  useActivityTableConfigurationsWithoutPersonAndLocation: () => [
    { title: "Naziv", dataIndex: "title", key: "title" },
  ],
}));

vi.mock("../ActivityCards", () => ({
  ActivityCards: () => <div>Mock Card</div>,
}));

vi.mock("components", () => ({
  AddActivityButton: () => <button>Add Aktivnost</button>,
  UserOnActivityModal: () => <div>Modal</div>,
}));

describe("ActivityList", () => {
  beforeEach(() => {
    useMediaQueryMock = vi.fn(() => false);
  });

  it("radi snapshot za list view (desktop)", () => {
    useMediaQueryMock = vi.fn(() => false); // desktop
    const { asFragment } = render(<ActivityList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("radi snapshot za card view (mobile)", () => {
    useMediaQueryMock = vi.fn(({ query }) => query === "(max-width: 562px)");
    const { asFragment } = render(<ActivityList />);
    expect(asFragment()).toMatchSnapshot();
  });
});