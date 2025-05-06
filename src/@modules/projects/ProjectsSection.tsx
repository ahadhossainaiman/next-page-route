import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import { IMetaResponse } from '@base/interfaces';
import { cn, Toolbox } from '@lib/utils';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import ProjectCard from '@modules/home/ProjectCard';
import { Button, Form, Input, InputNumber, message, Pagination, Select } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface IProps {
  className?: string;
  projects: IProject[];
  projectsMeta: IMetaResponse;
}

const ProjectsSection: React.FC<IProps> = ({ className, projects, projectsMeta }) => {
  const router = useRouter();
  const [formInstance] = Form.useForm();
  const [messageApi, messageHolder] = message.useMessage();
  const [investProject, setInvestProject] = useState<IProject>(null);

  const investmentCreateFn = InvestmentsHooks.useCreate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setInvestProject(null);
        formInstance.resetFields();
        messageApi.success(res.message);
      },
    },
  });

  return (
    <section className={cn('projects_section', className)}>
      {messageHolder}
      <div className="container">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-4">
          {projects?.map((project) => (
            <ProjectCard
              key={project?.id}
              project={project}
              // onFinish={(project) => setInvestProject(project)}
            />
          ))}
        </div>
        {projectsMeta?.total > 12 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              defaultCurrent={projectsMeta?.page}
              total={projectsMeta?.total}
              pageSize={projectsMeta?.limit}
              onChange={(page, limit) => {
                router.push({
                  query: Toolbox.toCleanObject({ ...router.query, page, limit }),
                });
              }}
            />
          </div>
        )}
      </div>
      <BaseModalWithoutClicker
        destroyOnClose
        title={`Invest in ${investProject?.title}`}
        width={450}
        open={!!investProject}
        onCancel={() => setInvestProject(null)}
        footer={null}
      >
        <Form
          size="large"
          onFinish={(values) => {
            investmentCreateFn.mutate({
              ...values,
              project: investProject?.id,
            });
          }}
        >
          <Form.Item
            name="investmentAmount"
            rules={[
              {
                required: true,
                message: 'Amount is required!',
              },
            ]}
          >
            <InputNumber placeholder="Amount" className="w-full" />
          </Form.Item>
          <Form.Item
            name="lockedPeriod"
            rules={[
              {
                required: true,
                message: 'Locked period is required!',
              },
            ]}
          >
            <Select
              showSearch
              allowClear
              virtual={false}
              placeholder="Locked Period"
              filterOption={(input, option: any) => option?.title.toLowerCase().includes(input.toLowerCase())}
            >
              <Select.Option value={3}>3 Months</Select.Option>
              <Select.Option value={6}>6 Months</Select.Option>
              <Select.Option value={12}>12 Months</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="referredBy"
            rules={[
              {
                required: true,
                message: 'Referred username is required!',
              },
            ]}
          >
            <Input placeholder="Referred Username" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={investmentCreateFn.isPending} className="w-full">
              Confirm
            </Button>
          </Form.Item>
        </Form>
      </BaseModalWithoutClicker>
    </section>
  );
};

export default ProjectsSection;
