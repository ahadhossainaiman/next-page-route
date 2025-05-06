import BaseHeroWrapper from '@base/components/BaseHeroWrapper';
import PageWrapper from '@base/container/PageWrapper';
import { IMetaResponse } from '@base/interfaces';
import { Paths } from '@lib/constant';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import { ProjectsServices } from '@modules/admin/projects/lib/services';
import ProjectsSection from '@modules/projects/ProjectsSection';
import { GetServerSideProps } from 'next';

interface IProps {
  projects: IProject[];
  projectsMeta: IMetaResponse;
}

const ProjectsPage: React.FC<IProps> = ({ projects, projectsMeta }) => {
  return (
    <PageWrapper title="Projects">
      <BaseHeroWrapper title="Projects" breadcrumb={[{ name: 'home', slug: Paths.root }]} />
      <ProjectsSection className="py-12 lg:py-24" projects={projects} projectsMeta={projectsMeta} />
    </PageWrapper>
  );
};

export default ProjectsPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const projectsPromise = ProjectsServices.find({ page: +query?.page || 1, limit: +query?.limit || 12 });

  const [projectsQuery] = await Promise.all([projectsPromise]);

  return {
    props: {
      projects: projectsQuery?.data ?? [],
      projectsMeta: projectsQuery?.meta ?? {},
    },
  };
};
