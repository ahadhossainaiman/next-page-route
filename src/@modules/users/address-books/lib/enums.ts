export enum ENUM_ADDRESS_BOOK_COIN_TYPES {
  BEP20 = 'BEP20',
}

export type TAddressBookCoinType = keyof typeof ENUM_ADDRESS_BOOK_COIN_TYPES;
export const addressBookCoinTypes = Object.values(ENUM_ADDRESS_BOOK_COIN_TYPES);

export enum ENUM_ADDRESS_BOOK_CURRENCY_UNIT_TYPES {
  USDT = 'USDT',
}

export type TAddressBookCurrencyUnitType = keyof typeof ENUM_ADDRESS_BOOK_CURRENCY_UNIT_TYPES;
export const addressBookCurrencyUnitTypes = Object.values(ENUM_ADDRESS_BOOK_CURRENCY_UNIT_TYPES);
