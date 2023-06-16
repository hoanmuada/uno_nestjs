export interface JwtPayload {
  id: number;
  userName: string;
  phoneNumber: string;
  fullName: string;
  roleId: number;
}

export enum UserRole {
  RIDER = 1,
  DRIVER = 2,
  ADMIN = 3,
}
