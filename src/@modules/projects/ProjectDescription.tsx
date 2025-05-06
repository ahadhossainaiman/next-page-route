import { IProject } from '@modules/admin/projects/lib/interfaces';
import { Tabs, TabsProps } from 'antd';
import React from 'react';
import ProjectFinancialChart from './ProjectFinancialChart';
import ProjectDocument from './ProjectDocument';

interface IProps {
  project: IProject;
}

const ProjectDescription: React.FC<IProps> = ({ project }) => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Details',
      children: (
        <React.Fragment>
          <p className="text-2xl font-medium">About the Project</p>
          <div className="mt-2" dangerouslySetInnerHTML={{ __html: project?.description }}></div>
        </React.Fragment>
      ),
    },
    {
      key: '2',
      label: 'Financials',
      children: <ProjectFinancialChart isLoading={false} data={{ BNB: 500, BTC: 1000, USDT: 70 }} />,
    },
    {
      key: '3',
      label: 'Documents',
      children: <ProjectDocument />,
    },
  ];

  return <Tabs defaultActiveKey="1" items={items} />;
};

export default ProjectDescription;
