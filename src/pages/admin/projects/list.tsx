import BaseSearch from '@base/components/BaseSearch';
import PageHeader from '@base/components/PageHeader';
import PageWrapper from '@base/container/PageWrapper';
import { Toolbox } from '@lib/utils';
import ProjectsForm from '@modules/admin/projects/components/ProjectsForm';
import ProjectsList from '@modules/admin/projects/components/ProjectsList';
import { ProjectsHooks } from '@modules/admin/projects/lib/hooks';
import { IProjectsFilter } from '@modules/admin/projects/lib/interfaces';
import Authorization from '@modules/auth/components/Authorization';
import WithAuthorization from '@modules/auth/components/WithAuthorization';
import { Button, Drawer, Form, message, Tag } from 'antd';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProjectsPage = () => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const { page = 1, limit = 10, ...rest } = Toolbox.parseQueryParams<IProjectsFilter>(router.asPath);

  const projectsQuery = ProjectsHooks.useFind({
    options: {
      ...rest,
      page,
      limit,
    },
  });

  const projectCreateFn = ProjectsHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setDrawerOpen(false);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  return (
    <PageWrapper>
      {messageHolder}
      <PageHeader
        title="Projects"
        subTitle={<BaseSearch />}
        tags={[<Tag key={1}>Total: {projectsQuery.data?.meta?.total || 0}</Tag>]}
        extra={
          <Authorization allowedAccess={['projects:write']}>
            <Button type="primary" onClick={() => setDrawerOpen(true)}>
              Create
            </Button>
          </Authorization>
        }
      />
      <ProjectsList
        isLoading={projectsQuery.isLoading}
        data={projectsQuery.data?.data}
        pagination={{
          current: page,
          pageSize: limit,
          total: projectsQuery.data?.meta?.total,
          onChange: (page, limit) =>
            router.push({
              query: Toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />
      <Drawer width={640} title="Create a new project" open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <ProjectsForm
          form={formInstance}
          initialValues={{ isActive: true }}
          isLoading={projectCreateFn.isPending}
          onFinish={(values) => projectCreateFn.mutate(values)}
        />
      </Drawer>
    </PageWrapper>
  );
};

export default WithAuthorization(ProjectsPage, { allowedAccess: ['projects:read'] });
