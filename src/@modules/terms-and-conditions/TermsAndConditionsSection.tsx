import { Paths } from '@lib/constant';
import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
}

const TermsAndConditionsSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('terms_and_conditions_section', className)}>
      <div className="container">
        <p className="font-semibold text-xl">
          These Terms and Conditions govern your access to and use of Billion Markets’ platform, services, and products.
          By using our platform and services, you agree to comply with and be bound by these Terms. If you do not agree
          to these Terms, please do not use our services.
        </p>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">1. Introduction</p>
          <p>
            Billion Markets provides a platform for buying, selling, and trading crypto assets, along with trading
            management, fund management, and other financial services. These services are available to individuals who
            are legally capable of entering into contracts and are in compliance with local regulations regarding
            cryptocurrencies and investments.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">2. Eligibility</p>
          <ul className="list-disc list-inside">
            <li>Be at least 18 years old or the legal age in your jurisdiction to engage in financial transactions.</li>
            <li>Have the legal capacity to enter into a binding contract.</li>
            <li>Provide accurate and up-to-date information when creating your account.</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">3. Account Registration and Security</p>
          <ul className="list-disc list-inside">
            <li>To access our services, you must create an account by providing required personal information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to notify us immediately of any unauthorized use of your account.</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">4. Services Provided</p>
          <ul className="list-disc list-inside">
            <li>Buy and Sell Crypto Assets</li>
            <li>Trading Management</li>
            <li>Fund Management</li>
            <li>Referral Program</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">5. Fees and Payments</p>
          <p>
            Billion Markets charges fees on transactions involving crypto asset purchases, sales, and other services.
            The applicable fees will be clearly communicated on our platform.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">6. Investment Risks</p>
          <p>
            Cryptocurrency trading and investments involve significant risk, including volatility and the potential loss
            of funds. You acknowledge and accept that:
          </p>
          <ul className="list-disc list-inside">
            <li>Crypto assets may fluctuate in value.</li>
            <li>You are solely responsible for your investment decisions.</li>
            <li>Billion Markets is not liable for any losses incurred from your investments or trading activities.</li>
          </ul>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">7. Referral Program</p>
          <p>
            Users can earn referral income by referring new customers to Billion Markets. Any fraudulent activity will
            result in account termination.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">8. Privacy and Data Protection</p>
          <p>
            By using our services, you agree to our Privacy Policy, which outlines how we collect, use, and protect your
            personal information.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">9. Limitation of Liability</p>
          <p>
            Billion Markets will not be liable for any direct, indirect, incidental, special, or consequential damages
            resulting from your use of our platform.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">10. Governing Law</p>
          <p>
            These Terms and Conditions will be governed by and construed in accordance with the laws of [Your
            Country/Region].
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">11. Contact Information</p>
          <p>If you have any questions or concerns, please contact us at:</p>
          <ul className="list-disc list-inside">
            <li>Email: {Paths.social.email}</li>
            <li>Address: {Paths.social.address}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditionsSection;
