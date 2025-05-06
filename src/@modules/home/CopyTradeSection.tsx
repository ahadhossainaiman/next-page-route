import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import React from 'react';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CopyTradeCard from './CopyTradeCard';

interface IProps {
  className?: string;
}

const CopyTradeSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('copy_trade_section', className)}>
      <div className="container">
        <SectionIntro
          className="text-center mb-16"
          subtitleClassName="text-[var(--color-gray-300)]"
          title="Trade smart, just copy trade!"
          subtitle="Copy top traders and discover strategies to earn like a pro effortlessly."
        />
        <div className="slider_wrapper">
          <div className="slider_content">
            <Swiper
              spaceBetween={25}
              modules={[Scrollbar]}
              scrollbar={{ el: '.cts_scrollbar' }}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1200: {
                  slidesPerView: 4,
                },
              }}
            >
              {[...Array(10)].map((_, idx) => (
                <SwiperSlide key={idx}>
                  <CopyTradeCard />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="slider_controller mt-8">
            <div className="cts_scrollbar h-2 w-9/12 mx-auto bg-gray-500 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CopyTradeSection;
