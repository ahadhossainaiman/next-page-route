import BaseHeroWrapper from '@base/components/BaseHeroWrapper';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import AboutUsSection from '@modules/about-us/AboutUsSection';
import { IFaq } from '@modules/admin/faqs/lib/interfaces';
import { FaqsServices } from '@modules/admin/faqs/lib/services';
import FaqSection from '@modules/home/FaqSection';
import { GetServerSideProps } from 'next';
import React from 'react';

interface IProps {
  faqs: IFaq[];
}

const AboutUsPage: React.FC<IProps> = ({ faqs }) => {
  return (
    <PageWrapper title="About us">
      <BaseHeroWrapper title="About us" breadcrumb={[{ name: 'about us', slug: Paths.aboutUs }]} />
      <AboutUsSection className="py-16 md:py-20" />
      <FaqSection className="pb-12 lg:pb-24" faqs={faqs} />
    </PageWrapper>
  );
};

export default AboutUsPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const faqsPromise = FaqsServices.find({ page: 1, limit: 50 });

  const [faqsQuery] = await Promise.all([faqsPromise]);

  return {
    props: {
      faqs: faqsQuery?.data ?? [],
    },
  };
};
