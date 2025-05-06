import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IProject } from '@modules/admin/projects/lib/interfaces';
import ProjectCard from '@modules/home/ProjectCard';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import React, { useState } from 'react';

interface IProps {
  className?: string;
  projects: IProject[];
}

const DashboardProjects: React.FC<IProps> = ({ className, projects }) => {
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
    <React.Fragment>
      {messageHolder}
      <div className={className}>
        {projects?.map((project) => (
          <ProjectCard
            key={project?.id}
            project={project}
            // onFinish={(project) => setInvestProject(project)}
          />
        ))}
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
    </React.Fragment>
  );
};

export default DashboardProjects;
