import BrandLogo from '@base/components/BrandLogo';
import CustomLink from '@base/components/CustomLink';
import ThemeToggler from '@base/components/ThemeToggler';
import { Paths } from '@lib/constant';
import { cn } from '@lib/utils';
import { AuthHooks } from '@modules/auth/lib/hooks';
import { useAuthSession } from '@modules/auth/lib/utils';
import { Button, Grid } from 'antd';
import { type ClassValue } from 'clsx';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import Menu from './Menu';
import UserWelcomeMenu from './UserWelcomeMenu';

interface IProps {
  className?: ClassValue;
}

const signOutFn = AuthHooks.useSignOut;

const LandingHeader = React.forwardRef<HTMLElement, IProps>(({ className }, ref) => {
  const router = useRouter();
  const { isLoading, isAuthenticate } = useAuthSession();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const screens = Grid.useBreakpoint();

  return (
    <React.Fragment>
      <header className={cn('header', className)} ref={ref}>
        <div className="container">
          <div className="wrapper flex items-center gap-4">
            <CustomLink href={Paths.root}>
              <BrandLogo />
            </CustomLink>
            {isLoading || isAuthenticate || (screens.md && <ThemeToggler />)}
            <div className="ml-auto flex items-center gap-4">
              {isLoading ||
                (isAuthenticate ? (
                  <React.Fragment>
                    <UserWelcomeMenu isDashboard />
                    <Button type="primary" size="large" ghost onClick={signOutFn}>
                      <IoMdLogOut />
                    </Button>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {router.pathname === Paths.auth.signIn || (
                      <CustomLink href={Paths.auth.signIn}>
                        <Button type="primary" size="large" ghost>
                          <IoMdLogIn />
                        </Button>
                      </CustomLink>
                    )}
                    {/* {router.pathname === Paths.auth.signUp || (
                      <CustomLink href={Paths.auth.signUp}>
                        <Button type="primary" size="large" ghost>
                          Sign Up
                        </Button>
                      </CustomLink>
                    )} */}
                  </React.Fragment>
                ))}
            </div>
            <Button size="large" type="primary" onClick={() => setMenuOpen(true)}>
              <FaBars />
            </Button>
          </div>
        </div>
      </header>
      <Menu isOpen={isMenuOpen} onChangeOpen={() => setMenuOpen(false)} />
    </React.Fragment>
  );
});

LandingHeader.displayName = 'LandingHeader';

export default LandingHeader;
