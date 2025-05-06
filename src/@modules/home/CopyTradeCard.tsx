import { ImagePaths } from '@lib/constant';
import { cn } from '@lib/utils';
import { Button } from 'antd';
import React from 'react';

interface IProps {
  className?: string;
}

const CopyTradeCard: React.FC<IProps> = ({ className }) => {
  return (
    <div
      className={cn('copy_trade_card space-y-4 border border-gray-500 p-8 rounded-lg bg-[var(--color-bg)]', className)}
    >
      <div className="flex gap-4 items-center">
        <img src={ImagePaths.placeHolder} alt="" width={32} height={32} className="rounded-full shrink-0" />
        <div>
          <p className="font-medium">MarketPilot</p>
          <small className="text-gray-300">1/300</small>
        </div>
      </div>
      <div>
        <div className="flex gap-4 justify-between flex-wrap">
          <p className="text-gray-300">30d copiers profit</p>
          <p className="font-medium">+$0.5700</p>
        </div>
        <div className="mt-8">
          <p className="text-3xl font-medium">+470.67%</p>
          <p className="text-gray-300 uppercase">30D ROI</p>
        </div>
      </div>
      <div>
        <Button size="large" type="primary" className="w-full">
          Copy
        </Button>
      </div>
    </div>
  );
};

export default CopyTradeCard;
