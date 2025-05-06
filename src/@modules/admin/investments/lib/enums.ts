export enum ENUM_PAYMENT_STATUSES {
  Pending = 'Pending',
  Declined = 'Declined',
  Approved = 'Approved',
}

export type TPaymentStatus = keyof typeof ENUM_PAYMENT_STATUSES;
export const paymentStatuses = Object.values(ENUM_PAYMENT_STATUSES);
