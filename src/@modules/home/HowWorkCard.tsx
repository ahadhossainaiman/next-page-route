import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  isLast?: boolean;
  item: { key: string; title: string; subTitle: string; icon: React.ReactElement };
}

const HowWorkCard: React.FC<IProps> = ({ className, isLast = false, item }) => {
  return (
    <div className={cn('how_work_card relative', className)}>
      <div className="space-y-4 text-center">
        <div className="w-12 mx-auto">{item.icon}</div>
        <div className="space-y-2">
          <p className="dark:text-gray-300 text-sm">Step 1</p>
          <p className="font-medium">{item.title}</p>
          <p className="dark:text-gray-300">{item.subTitle}</p>
        </div>
      </div>
      {isLast || <img src="/images/line.png" alt="" className="absolute top-4 -right-28 hidden lg:block" />}
    </div>
  );
};

export default HowWorkCard;
