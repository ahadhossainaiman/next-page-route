export type TPermission = (typeof Permissions)[keyof typeof Permissions];

export const Permissions = {
  FORBIDDEN: 'FORBIDDEN',

  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',

  CUSTOMERS_READ: 'customers:read',
  CUSTOMERS_WRITE: 'customers:write',
  CUSTOMERS_UPDATE: 'customers:update',
  CUSTOMERS_DELETE: 'customers:delete',

  ROLE_MANAGER_PERMISSION_TYPES_READ: 'role-manager-permission-types:read',
  ROLE_MANAGER_PERMISSION_TYPES_WRITE: 'role-manager-permission-types:write',
  ROLE_MANAGER_PERMISSION_TYPES_UPDATE: 'role-manager-permission-types:update',
  ROLE_MANAGER_PERMISSION_TYPES_DELETE: 'role-manager-permission-types:delete',

  ROLE_MANAGER_PERMISSIONS_READ: 'role-manager-permissions:read',
  ROLE_MANAGER_PERMISSIONS_WRITE: 'role-manager-permissions:write',
  ROLE_MANAGER_PERMISSIONS_UPDATE: 'role-manager-permissions:update',
  ROLE_MANAGER_PERMISSIONS_DELETE: 'role-manager-permissions:delete',

  ROLE_MANAGER_ROLES_READ: 'role-manager-roles:read',
  ROLE_MANAGER_ROLES_WRITE: 'role-manager-roles:write',
  ROLE_MANAGER_ROLES_UPDATE: 'role-manager-roles:update',
  ROLE_MANAGER_ROLES_DELETE: 'role-manager-roles:delete',

  PAYMENT_GATEWAYS_READ: 'payment-gateways:read',
  PAYMENT_GATEWAYS_WRITE: 'payment-gateways:write',
  PAYMENT_GATEWAYS_UPDATE: 'payment-gateways:update',
  PAYMENT_GATEWAYS_DELETE: 'payment-gateways:delete',

  PROJECTS_READ: 'projects:read',
  PROJECTS_WRITE: 'projects:write',
  PROJECTS_UPDATE: 'projects:update',
  PROJECTS_DELETE: 'projects:delete',

  INVESTMENTS_READ: 'investments:read',
  INVESTMENTS_WRITE: 'investments:write',
  INVESTMENTS_UPDATE: 'investments:update',
  INVESTMENTS_DELETE: 'investments:delete',

  COUNTRIES_READ: 'countries:read',
  COUNTRIES_WRITE: 'countries:write',
  COUNTRIES_UPDATE: 'countries:update',
  COUNTRIES_DELETE: 'countries:delete',

  CURRENCIES_READ: 'currencies:read',
  CURRENCIES_WRITE: 'currencies:write',
  CURRENCIES_UPDATE: 'currencies:update',
  CURRENCIES_DELETE: 'currencies:delete',

  USER_VERIFICATION_REQUESTS_READ: 'user-verification-requests:read',
  USER_VERIFICATION_REQUESTS_WRITE: 'user-verification-requests:write',
  USER_VERIFICATION_REQUESTS_UPDATE: 'user-verification-requests:update',
  USER_VERIFICATION_REQUESTS_DELETE: 'user-verification-requests:delete',

  FAQ_CATEGORIES_READ: 'faq-categories:read',
  FAQ_CATEGORIES_WRITE: 'faq-categories:write',
  FAQ_CATEGORIES_UPDATE: 'faq-categories:update',
  FAQ_CATEGORIES_DELETE: 'faq-categories:delete',

  FAQS_READ: 'faqs:read',
  FAQS_WRITE: 'faqs:write',
  FAQS_UPDATE: 'faqs:update',
  FAQS_DELETE: 'faqs:delete',
} as const;
