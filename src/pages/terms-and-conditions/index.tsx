import BaseHeroWrapper from '@base/components/BaseHeroWrapper';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import TermsAndConditionsSection from '@modules/terms-and-conditions/TermsAndConditionsSection';

const TermsAndConditionsPage = () => {
  return (
    <PageWrapper title="Terms And Conditions">
      <BaseHeroWrapper
        title="Terms And Conditions"
        breadcrumb={[{ name: 'terms and conditions', slug: Paths.termsAndConditions }]}
      />
      <TermsAndConditionsSection className="py-16 md:py-20" />
    </PageWrapper>
  );
};

export default TermsAndConditionsPage;
