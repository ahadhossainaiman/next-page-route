import { Env } from '.environments';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import ThemeToggler from '@base/components/ThemeToggler';
import { Paths } from '@lib/constant';
import { AuthHooks } from '@modules/auth/lib/hooks';
import { useAuthSession } from '@modules/auth/lib/utils';
import ProfileCard from '@modules/ProfileCard';
import { Button, Dropdown } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';

const signOutFn = AuthHooks.useSignOut;

interface IProps {
  isDashboard?: boolean;
}

const UserWelcomeMenu: React.FC<IProps> = ({ isDashboard = false }) => {
  const router = useRouter();
  const { user } = useAuthSession();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const items = [
    ...(isDashboard
      ? [
          {
            key: 'Dashboard',
            icon: <MdDashboard />,
            label: 'Dashboard',
            onClick: () => router.push(Paths.users.usersRoot),
          },
        ]
      : []),
    {
      key: 'Profile',
      icon: <AiOutlineUser />,
      label: 'Profile',
      onClick: () => setProfileModalOpen(true),
    },
    {
      key: 'Signout',
      icon: <AiOutlineLogout />,
      label: 'Sign out',
      onClick: signOutFn,
    },
  ];

  return (
    <React.Fragment>
      <Dropdown
        dropdownRender={() => {
          return (
            <div className="bg-[var(--color-secondary-bg)] p-4 border border-gray-300 rounded-lg shadow-sm">
              <p className="font-medium text-xs text-[var(--color-gray-500)]">Welcome to {Env.webTitle}</p>
              <p className="font-semibold">{user?.name}</p>
              <ul className="flex flex-col gap-2 border-t border-t-gray-300 pt-4 mt-4">
                {items.map((item) => (
                  <li
                    key={item.key}
                    className="flex items-center gap-2 select-none hover:text-[var(--color-primary)] transition-colors duration-500 cursor-pointer"
                    onClick={item.onClick}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center border-t border-t-gray-300 pt-4 mt-4">
                <ThemeToggler />
              </div>
            </div>
          );
        }}
      >
        <Button className="rounded-full">
          <FaUser />
        </Button>
      </Dropdown>
      <BaseModalWithoutClicker
        destroyOnClose
        footer={null}
        width={580}
        open={isProfileModalOpen}
        onCancel={() => setProfileModalOpen(false)}
        classNames={{ content: '!bg-transparent !shadow-none' }}
      >
        <ProfileCard user={user} />
      </BaseModalWithoutClicker>
    </React.Fragment>
  );
};

export default UserWelcomeMenu;
