import { cn } from '@lib/utils';
import { Button, Divider } from 'antd';
import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface IProps {
  className?: string;
  onFinish: () => void;
}

const IdentityVerificationCard: React.FC<IProps> = ({ className, onFinish }) => {
  return (
    <div className={cn('dashboard_card border dark:border-white/15 rounded-lg p-4', className)}>
      <p className="font-semibold text-lg">Level 1 identity verification</p>
      <p className="dark:text-gray-300 mt-2">
        To comply with local laws and regulations, please complete identity verification to access all services.
      </p>
      <div className="bottom bg-[var(--color-bg)] mt-4 p-4 rounded-lg font-medium">
        <p>Account perks after verification</p>
        <ul className="space-y-2 mt-2 dark:text-gray-400">
          <li className="flex gap-2 justify-between">
            Withdrawals <FaCheckCircle color="green" />
          </li>
          <li className="flex gap-2 justify-between">
            Crypto deposit <FaCheckCircle color="green" />
          </li>
          <li className="flex gap-2 justify-between">
            Fiat deposit <FaCheckCircle color="green" />
          </li>
          <li className="flex gap-2 justify-between">
            P2P trading <FaCheckCircle color="green" />
          </li>
        </ul>
        <Divider />
        <p>Verification requirements</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>Government-issued documents</li>
          <li>Face recognition verification</li>
          <li>Estimated review time: 60m</li>
        </ul>
        <Button
          type="primary"
          className="dark:!bg-white dark:!text-[var(--color-primary)] w-full mt-8"
          shape="round"
          size="large"
          onClick={onFinish}
        >
          Verify
        </Button>
      </div>
    </div>
  );
};

export default IdentityVerificationCard;
