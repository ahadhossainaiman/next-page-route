// import SectionIntro from '@base/components/SectionIntro';
// import PageWrapper from '@base/container/PageWrapper';
// import { States } from '@lib/constant';
// import useSessionState from '@lib/hooks/useSessionState';
// import { IProject } from '@modules/admin/projects/lib/interfaces';
// import { ProjectsServices } from '@modules/admin/projects/lib/services';
// import FaqSection from '@modules/home/FaqSection';
// import FunFactSection from '@modules/home/FunFactSection';
// import HeroSection from '@modules/home/HeroSection';
// import HowWorkSection from '@modules/home/HowWorkSection';
// import MarketUpdateSection from '@modules/home/MarketUpdateSection';
// import ProjectSection from '@modules/home/ProjectSection';
// import StartJourneySection from '@modules/home/StartJourneySection';
// import WhyTrustSection from '@modules/home/WhyTrustSection';
// import { GetServerSideProps } from 'next';

// interface IProps {
//   projects: IProject[];
//   faqs: IFaq[];
// }

// const HomePage: React.FC<IProps> = ({ projects, faqs }) => {
//   const [headerHeight] = useSessionState(States.headerHeight);

//   return (
//     <PageWrapper title="Home">
//       <HeroSection
//         className="py-12 lg:py-24 flex items-center"
//         style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}
//       />
//       <MarketUpdateSection className="py-12 lg:py-24" />
//       <ProjectSection
//         className="py-12 lg:py-24"
//         sectionIntro={<SectionIntro title="Digital Assets" />}
//         projects={projects}
//       />
//       <HowWorkSection className="py-12 lg:py-24" />
//       <StartJourneySection className="py-12 lg:py-24" />
//       <WhyTrustSection className="py-12 lg:py-24" />
//       {/* <DownloadAppSection className="py-12 lg:py-24" /> */}
//       <FunFactSection className="py-12 lg:py-24" />
//       <FaqSection className="py-12 lg:py-24" faqs={faqs} />
//     </PageWrapper>
//   );
// };

// export default HomePage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const projectsPromise = ProjectsServices.find({ page: 1, limit: 12 });
//   const faqsPromise = FaqsServices.find({ page: 1, limit: 60 });

//   const [projectsQuery, faqsQuery] = await Promise.all([projectsPromise, faqsPromise]);

//   return {
//     props: {
//       projects: projectsQuery?.data ?? [],
//       faqs: faqsQuery?.data ?? [],
//     },
//   };
// };

import React from 'react'

export default function index() {
  return (
    <div>index</div>
  )
}
