import BaseHeroWrapper from '@base/components/BaseHeroWrapper';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import PrivacyPolicySection from '@modules/privacy-policy/PrivacyPolicySection';

const PrivacyPolicyPage = () => {
  return (
    <PageWrapper title="Privacy Policy">
      <BaseHeroWrapper title="Privacy Policy" breadcrumb={[{ name: 'privacy policy', slug: Paths.privacyPolicy }]} />
      <PrivacyPolicySection className="py-16 md:py-20" />
    </PageWrapper>
  );
};

export default PrivacyPolicyPage;
