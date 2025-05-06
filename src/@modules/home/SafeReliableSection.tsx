import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import React from 'react';
import SafeReliableCard from './SafeReliableCard';

interface IProps {
  className?: string;
}

const SafeReliableSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('safe_reliable_section', className)}>
      <div className="container">
        <SectionIntro
          className="text-center mb-16"
          title="Safe and reliable"
          subtitle="We are committed to safeguarding your assets and ensuring the security of your information."
          subtitleClassName="text-[var(--color-gray-300)] mt-4"
          isAfterSubtitle
        />
        <div className="wrapper">
          <video
            loop
            muted
            autoPlay
            src="https://img.bgstatic.com/video/msg/Safe-5s-1732170834-2x.mp4"
            className="md:max-h-[320px] mx-auto"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
            <SafeReliableCard />
            <SafeReliableCard />
            <SafeReliableCard />
            <SafeReliableCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafeReliableSection;
