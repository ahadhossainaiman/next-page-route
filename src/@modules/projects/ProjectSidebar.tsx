import { IProject } from '@modules/admin/projects/lib/interfaces';
import React from 'react';
import ProjectSidebarInvestCard from './ProjectSidebarInvestCard';

interface IProps {
  className?: string;
  project: IProject;
}

const ProjectSidebar: React.FC<IProps> = ({ className, project }) => {
  return (
    <div className={className}>
      <ProjectSidebarInvestCard project={project} />
    </div>
  );
};

export default ProjectSidebar;
