import TabBar from '@base/components/TabBar';
import { States } from '@lib/constant';
import useSessionState from '@lib/hooks/useSessionState';
import { Grid } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState, type PropsWithChildren } from 'react';
import LandingFooter from './elements/LandingFooter';
import LandingHeader from './elements/LandingHeader';

interface IProps extends PropsWithChildren {}

const LandingLayout: React.FC<IProps> = ({ children }) => {
  const router = useRouter();
  const headerRef = useRef(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [_, setHeaderHeight] = useSessionState(States.headerHeight);
  const screens = Grid.useBreakpoint();

  const handleScrollFn = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 200) {
      if (prevScrollY > currentScrollY) {
        headerRef.current.style.transform = 'translateY(0)';
        headerRef.current.classList.add('shadow-lg');
      } else {
        headerRef.current.style.transform = `translateY(-${headerRef.current.offsetHeight}px)`;
      }

      setPrevScrollY(currentScrollY);
    } else {
      headerRef.current.style.transform = 'translateY(0)';
      headerRef.current.classList.remove('shadow-lg');
      setPrevScrollY(0);
    }
  };

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerRef.current?.offsetHeight]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollFn);

    return () => window.removeEventListener('scroll', handleScrollFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prevScrollY]);

  useEffect(() => {
    router.events.on('routeChangeStart', handleScrollFn);

    return () => router.events.off('routeChangeStart', handleScrollFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return (
    <React.Fragment>
      <LandingHeader
        ref={headerRef}
        className="sticky top-0 left-0 w-full z-50 py-4 dark:bg-black/70 bg-white/70 transition-transform duration-500 backdrop-blur-lg"
      />
      <div className="relative z-10 bg-white dark:bg-black">
        {children}
        {screens.md || <TabBar />}
      </div>
      <LandingFooter />
    </React.Fragment>
  );
};

export default LandingLayout;
