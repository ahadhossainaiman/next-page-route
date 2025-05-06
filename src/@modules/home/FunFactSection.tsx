import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
}

const FunFactSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('fun_fact_section', className)}>
      <div className="container">
        <div className="wrapper grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-2 lg:gap-4">
          <div className="relative text-center">
            <p className="text-8xl dark:text-gray-300 opacity-15">120%</p>
            <p className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-2.5 uppercase underline decoration-[var(--color-primary)] font-semibold">
              Yearly Return
            </p>
          </div>
          <div className="relative text-center">
            <p className="text-8xl dark:text-gray-300 opacity-15">1M$</p>
            <p className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-2.5 uppercase underline decoration-[var(--color-primary)] font-semibold">
              Managed Fund
            </p>
          </div>
          <div className="relative text-center">
            <p className="text-8xl dark:text-gray-300 opacity-15">5000</p>
            <p className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-2.5 uppercase underline decoration-[var(--color-primary)] font-semibold">
              Number of Customer
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FunFactSection;
