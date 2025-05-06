import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
  step: { key: string; title: string; subTitle: string; icon: React.ReactElement };
}

const StartJourneyCard: React.FC<IProps> = ({ className, step }) => {
  return (
    <div className={cn('start_journey_card space-y-2 bg-[var(--color-secondary-bg)] p-4 rounded-lg', className)}>
      <p className="text-xl font-medium flex items-center gap-2">
        {step.icon} {step.title}
      </p>
      <p className="dark:text-gray-300">{step.subTitle}</p>
    </div>
  );
};

export default StartJourneyCard;
