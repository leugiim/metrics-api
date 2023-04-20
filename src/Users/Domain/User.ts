export interface User {
  username: string;
  password?: string;
  roles: RolesPermissions;
  companiesPermissions: string[];
}

export interface RolesPermissions {
  canWriteCompanies: boolean;
  canReadCompanies: boolean;
  canWriteMetrics: boolean;
  canReadMetrics: boolean;
}

export enum Permission {
  CAN_WRITE_COMPANIES = "canWriteCompanies",
  CAN_READ_COMPANIES = "canReadCompanies",
  CAN_WRITE_METRICS = "canWriteMetrics",
  CAN_READ_METRICS = "canReadMetrics",
}
