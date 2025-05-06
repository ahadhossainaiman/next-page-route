import { ENUM_THEME_TYPES } from '@lib/enums/theme.enum';

interface IStates {
  [name: string]: {
    key: string;
    initialValue: any;
  };
}

export const States: IStates = {
  theme: {
    key: '_tm45678',
    initialValue: ENUM_THEME_TYPES.SYSTEM,
  },
  headerHeight: {
    key: '_sd24122',
    initialValue: 0,
  },
  menu: {
    key: 'menu',
    initialValue: {
      openMenuKeys: [],
    },
  },
  layoutSider: {
    key: '_sd24327',
    initialValue: false,
  },
  investment: {
    key: '_sd34377',
    initialValue: {
      projectId: null,
      lockedPeriod: null,
      investmentAmount: 100,
      referredBy: null,
    },
  },
};
