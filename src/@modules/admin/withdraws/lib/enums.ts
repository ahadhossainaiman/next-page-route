export enum ENUM_WITHDRAWS_TYPES {
  INVESTMENT = 'INVESTMENT',
  EARNINGS = 'EARNINGS',
}

export type TWithdrawsType = keyof typeof ENUM_WITHDRAWS_TYPES;
export const withdrawsTypes = Object.values(ENUM_WITHDRAWS_TYPES);
