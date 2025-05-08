import PageWrapper from '@base/container/PageWrapper';
import SignInSection from '@modules/auth/components/SignInSection';

const AuthPage = () => {
  console.log(5, process.env.NEXT_PUBLIC_INTERNAL_API_URL);

  return (
    <PageWrapper title="Sign In">
      <SignInSection />
    </PageWrapper>
  );
};

export default AuthPage;
