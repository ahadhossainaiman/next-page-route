import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import { Grid } from 'antd';
import React from 'react';
import { FaChartLine, FaDollarSign, FaSearch } from 'react-icons/fa';
import HowWorkCard from './HowWorkCard';

const items = [
  {
    key: 'search',
    title: 'Search',
    subTitle: 'Searching for products and services on Billion Markets is quick and efficient.',
    icon: <FaSearch size={48} />,
  },
  {
    key: 'invest',
    title: 'Invest',
    subTitle: 'Investing with Billion Markets is simple and straightforward.',
    icon: <FaChartLine size={48} />,
  },
  {
    key: 'earn',
    title: 'Earn',
    subTitle: 'At Billion Markets, there are multiple ways for you to earn and grow your wealth.',
    icon: <FaDollarSign size={48} />,
  },
];

interface IProps {
  className?: string;
}

const HowWorkSection: React.FC<IProps> = ({ className }) => {
  const screens = Grid.useBreakpoint();

  return (
    <section className={cn('how_work_section', className)}>
      <div className="container">
        <SectionIntro
          className="text-center mb-16"
          title="How It Work"
          subtitleClassName="dark:text-[var(--color-gray-300)] mt-4"
          subtitle="Stacks is a production-ready library of stackable content blocks built in React Native."
          isAfterSubtitle
        />
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-16">
          {items.map((item, idx) => (
            <HowWorkCard key={idx} isLast={screens.lg && !screens.xl ? [1, 2].includes(idx) : idx === 2} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWorkSection;
