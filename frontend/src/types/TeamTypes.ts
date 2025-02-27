export type TeamGroups = {
  id: number;
  name: string;
  short_name: string;
  deleted: boolean;
  active: boolean;
  virtual: boolean;
};

export type Team = {
  id: number;
  name: string;
  short_name: string;
  deleted: boolean;
  active: boolean;
  description: string;
  TeamGroups: TeamGroups;
};

export type VirtualTeam = {
  id: number;
  name: string;
  short_name: string;
  deleted: boolean;
  active: boolean;
  description: string;
  TeamGroups: TeamGroups;
};

export type NumberOfVotesPerUserType = {
  id: number;
  number_of_votes: number;
  team: number;
};
