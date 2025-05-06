import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  title: string;
  value: number;
}

const DashboardIPCard: React.FC<IProps> = ({ className, title, value }) => {
  return (
    <div className={cn('dashboard_ip_card border dark:border-white/15 rounded-lg p-4', className)}>
      <p className="text-xs md:text-xl font-semibold">{title}</p>
      <div className="mt-4">
        <p className="text-lg md:text-3xl xl:text-5xl font-bold">{value}</p>
        {/* <span className="text-gray-300 font-medium">Investments</span> */}
      </div>
      {/* <Button shape="round" className="mt-16 w-full" size="large">
        More
      </Button> */}
    </div>
  );
};

export default DashboardIPCard;
