import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  benefit: { key: string; title: string; subTitle: string; icon: React.ReactElement };
}

const WhyTrustCard: React.FC<IProps> = ({ className, benefit }) => {
  return (
    <div className={cn('why_trust_card space-y-2 bg-[var(--color-bg)] p-4 rounded-lg', className)}>
      {benefit.icon}
      <p className="text-xl font-medium">{benefit.title}</p>
      <p className="dark:text-gray-300">{benefit.subTitle}</p>
    </div>
  );
};

export default WhyTrustCard;
