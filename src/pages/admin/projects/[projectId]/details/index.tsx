import PageHeader from '@base/components/PageHeader';
import ProjectsDetails from '@modules/admin/projects/components/ProjectsDetails';
import ProjectsInvestorsList from '@modules/admin/projects/components/ProjectsInvestorsList';
import ProjectsProfitShare from '@modules/admin/projects/components/ProjectsProfitShare';
import { ProjectsHooks } from '@modules/admin/projects/lib/hooks';
import { Tabs, type TabsProps } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const ProjectDetailsPage = () => {
  const router = useRouter();
  const { projectId } = router.query;
  const [activeTab, setActiveTab] = useState(1);

  const projectQuery = ProjectsHooks.useFindById({
    id: projectId as string,
    config: {
      queryKey: [],
      enabled: !!projectId,
    },
  });

  const investorsQuery = ProjectsHooks.useFindInvestorsById({
    id: +projectId,
    config: {
      queryKey: [],
      enabled: activeTab === 2,
    },
  });

  const profitSharesQuery = ProjectsHooks.useFindProfitSharesById({
    id: +projectId,
    config: {
      queryKey: [],
      enabled: activeTab === 3,
    },
  });

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Details',
      children: <ProjectsDetails project={projectQuery.data?.data} />,
    },
    {
      key: '2',
      label: 'Investors',
      children: (
        <ProjectsInvestorsList isLoading={projectQuery.isLoading} data={investorsQuery.data?.data} pagination={null} />
      ),
    },
    {
      key: '3',
      label: 'Profit Share',
      children: (
        <ProjectsProfitShare
          isLoading={profitSharesQuery.isLoading}
          data={profitSharesQuery.data?.data}
          pagination={null}
        />
      ),
    },
  ];

  return (
    <React.Fragment>
      <PageHeader title={projectQuery.data?.success && <p>{projectQuery.data?.data?.title}</p>} onBack={router.back} />
      <Tabs defaultActiveKey="1" items={items} onChange={(activeKey) => setActiveTab(+activeKey)} />
    </React.Fragment>
  );
};

export default ProjectDetailsPage;
