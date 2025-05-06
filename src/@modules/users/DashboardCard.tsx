import { FileProtectOutlined } from '@ant-design/icons';
import { cn } from '@lib/utils';
import { Button } from 'antd';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

interface IProps {
  className?: string;
}

const DashboardCard: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn('dashboard_card border border-white/15 rounded-lg p-4', className)}>
      <div className="top flex gap-2 justify-between items-center">
        <p className="text-xl font-semibold">Security</p>
        <Button type="primary" icon={<FileProtectOutlined />} shape="round">
          Low
        </Button>
      </div>
      <div className="bottom bg-[var(--color-bg)] mt-4 p-4 rounded-lg font-medium">
        <p className="text-sm text-gray-400">Verification</p>
        <p className="flex justify-between gap-2 items-center">
          Passkey <FaArrowRight />
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
