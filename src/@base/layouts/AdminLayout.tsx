import BrandLogo from '@base/components/BrandLogo';
import CustomLink from '@base/components/CustomLink';
import ThemeToggler from '@base/components/ThemeToggler';
import { Paths, States } from '@lib/constant';
import useSessionState from '@lib/hooks/useSessionState';
import { cn } from '@lib/utils';
import { Button, Grid, Layout } from 'antd';
import { usePathname } from 'next/navigation';
import React, { type PropsWithChildren } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from 'react-icons/md';
import AdminDashboardMenu from './elements/AdminDashboardMenu';
import WelcomeMenu from './elements/WelcomeMenu';

interface IProps extends PropsWithChildren {}

const AdminLayout: React.FC<IProps> = ({ children }) => {
  const pathname = usePathname();
  const screens = Grid.useBreakpoint();
  const [isCollapsed, setCollapsed] = useSessionState(States.layoutSider);
  const [menu, setMenu] = useSessionState(States.menu);

  const styles: any = {
    sider: {
      position: 'fixed',
      left: !screens.md && isCollapsed ? '-100%' : 0,
      height: '100vh',
      borderRight: screens.md ? 'none' : '1px solid var(--color-gray-300)',
      background: 'var(--color-black)',
      overflow: 'hidden',
      zIndex: 100,
    },
    menuWrapper: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: `calc(100vh - ${screens.md && isCollapsed ? 50 : 85}px)`,
      overflowY: 'auto',
    },
    layout: {
      background: 'var(--color-black)',
      paddingLeft: !screens.md ? 0 : isCollapsed ? 75 : 280,
    },
    header: {
      position: 'fixed',
      right: 0,
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      paddingLeft: !screens.md ? (isCollapsed ? 16 : 300) : isCollapsed ? 100 : 300,
      paddingRight: '1rem',
      background: 'var(--color-black)',
      zIndex: 99,
    },
    content: {
      padding: 16,
      marginTop: 65,
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        collapsible
        trigger={null}
        collapsed={screens.md && isCollapsed}
        width={280}
        style={styles.sider}
        breakpoint="md"
        onBreakpoint={(broken) => {
          if (broken) setCollapsed(true);
        }}
        onClick={(e) => {
          if (!screens.md && (e.target as HTMLAnchorElement).href) setCollapsed(true);
        }}
      >
        <div className="flex justify-center py-4">
          <CustomLink
            href={Paths.root}
            className={cn({
              'px-2': screens.md && isCollapsed,
            })}
          >
            <BrandLogo />
          </CustomLink>
        </div>
        <div
          style={styles.menuWrapper}
          className="[&_.ant-menu]:!bg-transparent [&_.ant-menu]:!border-none designed_scrollbar"
        >
          <AdminDashboardMenu
            selectedKeys={[pathname]}
            openKeys={menu?.openMenuKeys}
            onOpenChange={(keys) => setMenu({ ...menu, openMenuKeys: keys })}
          />
        </div>
      </Layout.Sider>
      <Layout style={styles.layout} onClick={() => (screens.md ? null : setCollapsed(true))}>
        <Layout.Header style={styles.header}>
          <Button
            type="text"
            onClick={(e) => {
              e.stopPropagation();
              setCollapsed(!isCollapsed);
            }}
          >
            {isCollapsed ? (
              <MdOutlineKeyboardDoubleArrowRight size={24} />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft size={24} />
            )}
          </Button>
          <div className="flex gap-2 items-center">
            <ThemeToggler />
            <WelcomeMenu />
          </div>
        </Layout.Header>
        <Layout.Content style={styles.content}>
          <div className="bg-gray-100/50 dark:bg-[var(--color-secondary-bg)] md:h-full p-8 rounded-3xl">{children}</div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
