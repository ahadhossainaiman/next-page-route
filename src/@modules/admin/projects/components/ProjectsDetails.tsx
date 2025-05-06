import { Descriptions } from 'antd';
import React from 'react';
import { IProject } from '../lib/interfaces';

interface IProps {
  project: IProject;
}

const ProjectsDetails: React.FC<IProps> = ({ project }) => {
  return (
    <React.Fragment>
      <Descriptions
        size="small"
        layout="vertical"
        column={{ xs: 1, md: 2, lg: 2, xl: 4, xxl: 4 }}
        bordered
        labelStyle={{ fontWeight: 600 }}
      >
        <Descriptions.Item label="Code">{project?.code || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Value">{project?.value || 'N/A'}</Descriptions.Item>
        <Descriptions.Item label="Status">{project?.status || 'N/A'}</Descriptions.Item>
      </Descriptions>
      <div className="mt-8" dangerouslySetInnerHTML={{ __html: project?.description }}></div>
    </React.Fragment>
  );
};

export default ProjectsDetails;
