export type TRole = (typeof Roles)[keyof typeof Roles];

export const Roles = {
  SUPER_ADMIN: 'Super Admin',
} as const;
