import BaseHeroWrapper from '@base/components/BaseHeroWrapper';
import SectionIntro from '@base/components/SectionIntro';
import PageWrapper from '@base/container/PageWrapper';
import { Paths } from '@lib/constant';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import { ProjectsServices } from '@modules/admin/projects/lib/services';
import ProjectSection from '@modules/home/ProjectSection';
import ProjectDescription from '@modules/projects/ProjectDescription';
import ProjectSidebar from '@modules/projects/ProjectSidebar';
import { Col, Row } from 'antd';
import { GetServerSideProps } from 'next';
import React from 'react';

interface IProps {
  projects: IProject[];
  project: IProject;
}

const ProjectPage: React.FC<IProps> = ({ projects, project }) => {
  return (
    <PageWrapper title="Project">
      <BaseHeroWrapper
        title={project?.title}
        subTitle={project?.about}
        breadcrumb={[{ name: 'projects', slug: Paths.projects.root }]}
      />
      <section className="py-12 lg:py-24">
        <div className="container">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={14} xxl={16}>
              {/* <ProjectProfitChart isLoading={false} /> */}
              {project?.banner && (
                <div className="image_container rounded-lg overflow-hidden">
                  <img src={project?.banner} alt="" className="w-full object-cover" />
                </div>
              )}
              <ProjectDescription project={project} />
            </Col>
            <Col xs={24} lg={10} xxl={8}>
              <ProjectSidebar className="sticky top-2" project={project} />
            </Col>
          </Row>
        </div>
      </section>
      <ProjectSection
        className="py-12 lg:py-24"
        sectionIntro={<SectionIntro title="Similar Assets" />}
        projects={projects}
      />
    </PageWrapper>
  );
};

export default ProjectPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const projectsPromise = ProjectsServices.find({ page: 1, limit: 4 });
  const projectPromise = ProjectsServices.findById(+params?.projectId);

  const [projectsQuery, projectQuery] = await Promise.all([projectsPromise, projectPromise]);

  if (!projectQuery?.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      projects: projectsQuery?.data ?? [],
      project: projectQuery?.data ?? {},
    },
  };
};
