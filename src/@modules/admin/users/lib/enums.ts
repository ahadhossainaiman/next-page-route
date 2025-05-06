export enum ENUM_USERS_TYPES {
  Internal = 'Internal',
  Customer = 'Customer',
}

export type TUsersType = keyof typeof ENUM_USERS_TYPES;
export const usersTypes = Object.values(ENUM_USERS_TYPES);
