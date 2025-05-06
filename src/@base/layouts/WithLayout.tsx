import { AuthPaths, Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { useRouter } from 'next/router';
import React, { type PropsWithChildren } from 'react';
import AdminLayout from './AdminLayout';
import LandingLayout from './LandingLayout';
import UserLayout from './UserLayout';

interface IProps extends PropsWithChildren {
  pathname: string;
}

const WithLayout: React.FC<IProps> = ({ pathname, children }) => {
  const router = useRouter();

  if (router.pathname === Paths.underConstruction) return children;

  return Toolbox.isDynamicPath(AuthPaths, pathname) ? (
    pathname.includes(Paths.admin.adminRoot) ? (
      <AdminLayout>{children}</AdminLayout>
    ) : (
      <UserLayout>{children}</UserLayout>
    )
  ) : (
    <LandingLayout>{children}</LandingLayout>
  );
};

export default WithLayout;
