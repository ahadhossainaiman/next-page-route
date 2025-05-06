import { ImagePaths } from '@lib/constant';
import { cn } from '@lib/utils';
import { Tabs } from 'antd';
import React from 'react';
import { FaCoins } from 'react-icons/fa';

interface IProps {
  className?: string;
}

const DashboardUserCard: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'dashboard_user_card max-w-sm border border-gray-500 rounded-lg bg-[var(--color-secondary-bg)] overflow-hidden w-full',
        className,
      )}
    >
      <img
        className="w-full h-56 object-cover object-center"
        src={ImagePaths.placeHolder}
        alt=""
        width={512}
        height={512}
      />
      <div className="flex items-center px-4 py-2 bg-[var(--color-bg)]">
        <FaCoins />
        <h1 className="mx-3 font-semibold text-lg">0.21</h1>
      </div>
      <div className="p-4 text-gray-300">
        <h1 className="text-2xl font-semibold">Khalid Mahmud</h1>
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: 'Referral',
              children: null,
            },
            {
              key: '2',
              label: 'Earn',
              children: null,
            },
            {
              key: '3',
              label: 'Investment',
              children: null,
            },
            {
              key: '4',
              label: 'Withdraw',
              children: null,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DashboardUserCard;
