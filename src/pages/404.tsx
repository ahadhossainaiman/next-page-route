import PageWrapper from '@base/container/PageWrapper';

const NotFoundPage = () => {
  return (
    <PageWrapper title="404">
      <section>
        <div className="container">
          <div className="flex flex-col justify-center items-center h-screen gap-4 py-8">
            <h3 className="text-2xl font-semibold text-[var(--color-primary)]">404</h3>
            <p className="text-gray-500">Oops! Looks like you are lost.</p>
            <div className="animate-bounce mt-8">
              <svg
                className="w-12 h-12 mx-auto text-[var(--color-primary)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export default NotFoundPage;
