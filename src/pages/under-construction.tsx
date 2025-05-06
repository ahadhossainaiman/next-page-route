import PageWrapper from '@base/container/PageWrapper';
import { ImagePaths } from '@lib/constant';

const UnderConstructionPage = () => {
  return (
    <PageWrapper title="Under Construction">
      <section className="under_construction_section py-14">
        <div className="container">
          <img src={ImagePaths.underConstruction} alt="under construction" className="w-96 h-auto mx-auto" />
        </div>
      </section>
    </PageWrapper>
  );
};

export default UnderConstructionPage;
