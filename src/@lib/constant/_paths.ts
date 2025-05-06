import { TId } from '@base/interfaces';

export const Paths = {
  root: '/',
  underConstruction: '/under-construction',
  aboutUs: '/about-us',
  privacyPolicy: '/privacy-policy',
  termsAndConditions: '/terms-and-conditions',
  social: {
    email: 'support@billionmarkets.com',
    facebookPage: '#',
    facebookMessenger: '#',
    address: 'PORTO BELLO, Siafi Street 1-Office 401, Limassol 3042, Cyprus',
  },
  auth: {
    signIn: '/auth',
    signUp: '/auth/signup',
  },
  projects: {
    root: '/projects',
    toId: (projectId: TId) => `/projects/${projectId}`,
  },
  admin: {
    adminRoot: '/admin',
    users: {
      root: '/admin/users',
      list: '/admin/users/list',
      transactions: (userId: TId) => `/admin/users/${userId}/transactions`,
      referrals: (userId: TId) => `/admin/users/${userId}/referrals`,
    },
    customers: {
      root: '/admin/customers',
      list: '/admin/customers/list',
      transactions: (userId: TId) => `/admin/customers/${userId}/transactions`,
      referrals: (userId: TId) => `/admin/customers/${userId}/referrals`,
    },
    permissionTypes: {
      root: '/admin/permission-types',
      list: '/admin/permission-types/list',
    },
    permissions: {
      root: '/admin/permissions',
      list: '/admin/permissions/list',
    },
    roles: {
      root: '/admin/roles',
      list: '/admin/roles/list',
      editPermissions: (roleId: TId) => `/admin/roles/edit-permissions/${roleId}`,
    },
    paymentGateways: {
      root: '/admin/payment-gateways',
      list: '/admin/payment-gateways/list',
    },
    projects: {
      root: '/admin/projects',
      list: '/admin/projects/list',
      toDetails: (projectId) => `/admin/projects/${projectId}/details`,
    },
    investments: {
      root: '/admin/investments',
      list: '/admin/investments/list',
      toPayments: (investmentId) => `/admin/investments/${investmentId}/payments`,
    },
    countries: {
      root: '/admin/countries',
      list: '/admin/countries/list',
      editPaymentGateways: (pgId: TId) => `/admin/countries/edit-payment-gateways/${pgId}`,
    },
    currencies: {
      root: '/admin/currencies',
      list: '/admin/currencies/list',
    },
    userVerificationRequests: {
      root: '/admin/user-verification-requests',
      list: '/admin/user-verification-requests/list',
    },
    userTransactions: {
      root: '/admin/user-transactions',
      list: '/admin/user-transactions/list',
    },
    withdraws: {
      root: '/admin/withdraws',
      list: '/admin/withdraws/list',
    },
    faqCategories: {
      root: '/admin/faq-categories',
      list: '/admin/faq-categories/list',
    },
    faqs: {
      root: '/admin/faqs',
      list: '/admin/faqs/list',
    },
  },
  users: {
    usersRoot: '/users',
    identityVerification: '/users/identity-verification',
    addressBook: '/users/address-book',
    investments: '/users/investments',
    referrals: '/users/referrals',
    transactions: '/users/transactions',
    withdraws: '/users/withdraws',
  },
};
