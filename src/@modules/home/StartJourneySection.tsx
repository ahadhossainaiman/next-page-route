import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import { Col, Row } from 'antd';
import React from 'react';
import { FaChartLine, FaExchangeAlt, FaSearch, FaUserPlus, FaUsers } from 'react-icons/fa';
import StartJourneyCard from './StartJourneyCard';

const steps = [
  {
    key: 'create-account',
    title: 'Create Your Account',
    subTitle:
      'Sign up on Billion Markets and get access to a wide range of crypto assets, trading management services, and investment opportunities.',
    icon: <FaUserPlus size={24} />,
  },
  {
    key: 'explore-assets',
    title: 'Explore Crypto Assets',
    subTitle:
      'Browse through a variety of digital assets available for buying and selling. Learn about the potential of different cryptocurrencies and decide which ones align with your goals.',
    icon: <FaSearch size={24} />,
  },
  {
    key: 'start-trading',
    title: 'Start Trading',
    subTitle:
      'Buy and sell crypto assets with ease. Utilize our intuitive platform to trade in real time and take advantage of market movements to maximize your profits.',
    icon: <FaExchangeAlt size={24} />,
  },
  {
    key: 'earn-investments',
    title: 'Earn from Investments',
    subTitle:
      'As you invest in crypto, you can generate returns from market fluctuations. Keep track of your investments and grow your wealth over time.',
    icon: <FaChartLine size={24} />,
  },
  {
    key: 'referral-team',
    title: 'Referral & Team Building',
    subTitle:
      'Share your referral link with others and earn commissions when they make investments. Build a team of crypto enthusiasts, and earn passive income through their activities.',
    icon: <FaUsers size={24} />,
  },
];

interface IProps {
  className?: string;
}

const StartJourneySection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('start_journey_section', className)}>
      <div className="container">
        <SectionIntro className="text-center mb-16" title="Start Your Crypto Journey with Billion Markets" />
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={12}>
            <img src="/images/temp/start_journey.png" alt="" className="object-cover h-full rounded-lg" />
          </Col>
          <Col xs={24} xl={12}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, idx) => (
                <StartJourneyCard key={idx} step={step} />
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default StartJourneySection;
