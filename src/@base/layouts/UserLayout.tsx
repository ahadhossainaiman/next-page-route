import BrandLogo from '@base/components/BrandLogo';
import CustomLink from '@base/components/CustomLink';
import TabBar from '@base/components/TabBar';
import { Paths, States } from '@lib/constant';
import useResize from '@lib/hooks/useResize';
import useSessionState from '@lib/hooks/useSessionState';
import { cn } from '@lib/utils';
import { Button, Grid, Layout } from 'antd';
import { usePathname } from 'next/navigation';
import React, { type PropsWithChildren } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import UsersDashboardMenu from './elements/UsersDashboardMenu';
import WelcomeMenu from './elements/WelcomeMenu';

interface IProps extends PropsWithChildren {}

const UserLayout: React.FC<IProps> = ({ children }) => {
  const pathname = usePathname();
  const screens = Grid.useBreakpoint();
  const [isCollapsed, setCollapsed] = useSessionState(States.layoutSider);
  const [menu, setMenu] = useSessionState(States.menu);
  const { elemRef: headerRef, height: headerHeight } = useResize();

  const styles: any = {
    header: {
      position: 'fixed',
      left: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      paddingInline: '1rem',
      background: 'var(--color-black)',
      zIndex: 99,
    },
    sider: {
      position: 'fixed',
      top: headerHeight,
      left: !screens.md && isCollapsed ? '-100%' : screens.md ? 16 : 0,
      height: `calc(100vh - ${headerHeight}px)`,
      borderRight: screens.md ? 'none' : '1px solid var(--color-gray-300)',
      background: 'var(--color-black)',
      zIndex: 100,
    },
    menuWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingBlock: 32,
      overflowY: 'auto',
    },
    layout: {
      background: 'var(--color-black)',
      paddingLeft: !screens.md ? 0 : isCollapsed ? 100 : 300,
    },
    content: {
      paddingTop: headerHeight + 32,
      paddingBottom: 32,
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={styles.header} ref={headerRef}>
        <CustomLink href={Paths.root}>
          <BrandLogo />
        </CustomLink>
        <div className="flex items-center gap-2">
          <WelcomeMenu />
          <Button type="dashed" onClick={() => setCollapsed(!isCollapsed)} className="md:!hidden">
            {isCollapsed ? (
              <MdOutlineKeyboardDoubleArrowRight size={24} />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft size={24} />
            )}
          </Button>
        </div>
      </Layout.Header>
      <Layout style={styles.layout}>
        <Layout.Sider
          collapsible
          trigger={null}
          collapsed={screens.md && isCollapsed}
          width={240}
          style={styles.sider}
          breakpoint="md"
          onBreakpoint={(broken) => {
            if (broken) setCollapsed(true);
          }}
          onClick={(e) => {
            if (!screens.md && (e.target as HTMLAnchorElement).href) setCollapsed(true);
          }}
          className="group hover:[&_.ant-layout-sider-children]:border-r [&_.ant-layout-sider-children]:border-black/15 dark:[&_.ant-layout-sider-children]:border-white/15"
        >
          <div
            className="absolute right-0 top-24 translate-x-1/2 z-[99] border border-black/15 dark:border-white/15 rounded-full w-8 h-8 text-black/50 dark:text-white/50 justify-center items-center cursor-pointer hover:text-[var(--color-primary)] opacity-0 group-hover:opacity-100 bg-[var(--color-black)] hidden md:flex"
            onClick={() => setCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <MdOutlineKeyboardDoubleArrowRight size={24} />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft size={24} />
            )}
          </div>
          <div
            style={styles.menuWrapper}
            className="[&_.ant-menu]:!bg-transparent [&_.ant-menu]:!border-none designed_scrollbar"
          >
            <UsersDashboardMenu
              selectedKeys={[pathname]}
              openKeys={menu?.openMenuKeys}
              onOpenChange={(keys) => setMenu({ ...menu, openMenuKeys: keys })}
            />
          </div>
        </Layout.Sider>
        <Layout.Content style={styles.content} onClick={() => (screens.md ? null : setCollapsed(true))}>
          <div
            className={cn('md:h-full container', {
              'pb-12': !screens.md,
            })}
          >
            {children}
          </div>
          {screens.md || <TabBar />}
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
