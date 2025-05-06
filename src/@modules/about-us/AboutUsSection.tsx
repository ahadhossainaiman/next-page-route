import { cn } from '@lib/utils';
import React from 'react';

interface IProps {
  className?: string;
}

const AboutUsSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('about_section', className)}>
      <div className="container">
        <p className="first-letter:font-semibold first-letter:text-3xl first-letter:text-[var(--color-primary)]">
          Billion Markets is a leading financial services company specializing in buying, selling, trading, and fund
          management. We provide expert financial solutions to individuals and businesses, helping them navigate the
          complexities of the market.
        </p>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">Our Mission</p>
          <p>
            Billion Markets is committed to delivering strategic insights, managing investments, and optimizing
            financial portfolios to maximize growth and value. Our goal is to empower clients with the tools and
            expertise needed to succeed in the ever-evolving financial landscape.
          </p>
        </div>
        <div className="mt-4">
          <p className="font-semibold text-[var(--color-primary)]">Why Choose Billion Markets?</p>
          <p>
            With a commitment to excellence and integrity, Billion Markets ensures that clients can make informed
            financial decisions. We leverage industry-leading strategies and in-depth market analysis to help businesses
            and individuals achieve their financial objectives efficiently.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
