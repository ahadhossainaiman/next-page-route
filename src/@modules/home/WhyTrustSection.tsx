import SectionIntro from '@base/components/SectionIntro';
import { cn } from '@lib/utils';
import React from 'react';
import { FaBalanceScale, FaChartBar, FaHeadset, FaMoneyBillWave, FaShieldAlt, FaTrophy } from 'react-icons/fa';
import WhyTrustCard from './WhyTrustCard';

const benefits = [
  {
    key: 'secure-platform',
    title: 'Secure & Reliable Platform',
    subTitle:
      'We use cutting-edge technology to ensure your crypto assets and personal data are safe. Our platform is secure, stable, and regularly updated to meet the highest industry standards.',
    icon: <FaShieldAlt size={24} />,
  },
  {
    key: 'expert-management',
    title: 'Expert Trading & Investment Management',
    subTitle:
      "Whether you're trading crypto assets, managing your investments, or exploring fund management, we offer expert insights and tools designed to help you make informed decisions and maximize returns.",
    icon: <FaChartBar size={24} />,
  },
  {
    key: 'transparent-practices',
    title: 'Transparent & Fair Practices',
    subTitle:
      'At Billion Markets, we believe in transparency. Our processes are clear, and we provide all the information you need to make confident investment choices.',
    icon: <FaBalanceScale size={24} />,
  },
  {
    key: 'multiple-earning',
    title: 'Multiple Earning Opportunities',
    subTitle:
      'Beyond trading crypto assets, we offer ways to earn through referrals and team-building. Share your referral link, build your network, and earn passive income while helping others join the crypto journey.',
    icon: <FaMoneyBillWave size={24} />,
  },
  {
    key: 'customer-support',
    title: '24/7 Customer Support',
    subTitle:
      'Our dedicated support team is always available to assist you with any questions or issues you may have, ensuring a smooth and hassle-free experience.',
    icon: <FaHeadset size={24} />,
  },
  {
    key: 'proven-track-record',
    title: 'Proven Track Record',
    subTitle:
      'With years of experience in the financial industry, Billion Markets has built a reputation for providing reliable, profitable, and secure services to investors worldwide.',
    icon: <FaTrophy size={24} />,
  },
];

interface IProps {
  className?: string;
}

const WhyTrustSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('why_trust_section', className)}>
      <div className="container">
        <SectionIntro
          className="text-center mb-16"
          title="Why Trust Billion Markets"
          subtitle="At Billion Markets, we prioritize your financial success with a commitment to security, transparency, and reliable services."
          subtitleClassName="dark:text-[var(--color-gray-300)] mt-4"
          isAfterSubtitle
        />
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {benefits.map((benefit, idx) => (
            <WhyTrustCard key={idx} benefit={benefit} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyTrustSection;
