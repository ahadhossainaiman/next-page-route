import { cn } from '@lib/utils';
import React from 'react';
import { RiArrowDropRightLine } from 'react-icons/ri';

interface IProps {
  className?: string;
}

const SafeReliableCard: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn('safe_reliable_card space-y-2 bg-[var(--color-secondary-bg)] p-4 rounded-lg', className)}>
      <p className="text-2xl font-medium">Protection Fund</p>
      <p className="text-gray-300">Our $612 M Protection Fund ensures the security of your assets</p>
      <div className="bg-[var(--color-bg)] inline-flex rounded-full w-8 h-8 justify-center items-center">
        <RiArrowDropRightLine size={32} />
      </div>
    </div>
  );
};

export default SafeReliableCard;
