export type Role = {
  id: number;
  role_group: RoleGroup;
  name: string;
  deleted: boolean;
};

export type RoleGroup = {
  id: number;
  name: string;
  deleted: boolean;
};
