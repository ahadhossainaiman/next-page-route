import InfiniteScrollSelect from '@base/components/InfiniteScrollSelect';
import { ProjectsHooks } from '@modules/admin/projects/lib/hooks';
import { IProjectsFilter } from '@modules/admin/projects/lib/interfaces';
import { Button, Col, Form, FormInstance, InputNumber, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { IInvestmentCreate } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IInvestmentCreate>;
  onFinish: (values: IInvestmentCreate) => void;
}

const InvestmentsForm: React.FC<IProps> = ({ isLoading, form, formType = 'create', initialValues, onFinish }) => {
  const [projectsOption, setProjectsOption] = useState<IProjectsFilter>({
    page: 1,
    limit: 20,
    searchTerm: null,
  });

  const projectsQuery = ProjectsHooks.useFind({
    options: {
      ...projectsOption,
    },
  });

  useEffect(() => {
    form.resetFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, initialValues]);

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={onFinish}>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            name="investmentAmount"
            rules={[
              {
                required: true,
                message: 'Amount is required!',
              },
            ]}
            className="!mb-0"
          >
            <InputNumber placeholder="Amount" className="w-full" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            name="lockedPeriod"
            rules={[
              {
                required: true,
                message: 'Locked period is required!',
              },
            ]}
            className="!mb-0"
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
        </Col>
        <Col xs={24}>
          <Form.Item className="!mb-0" name="project">
            <InfiniteScrollSelect
              allowClear
              showSearch
              virtual={false}
              placeholder="Project"
              loading={projectsQuery.isLoading}
              meta={projectsQuery.data?.meta}
              filters={projectsOption}
              onObserver={(v) => setProjectsOption(v)}
              onStateChange={(v) => setProjectsOption(v)}
              options={projectsQuery.data?.data.map((project) => ({
                key: project?.id,
                label: project?.title,
                value: project?.id,
              }))}
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="text-right !mb-0">
            <Button loading={isLoading} type="primary" htmlType="submit">
              {formType === 'create' ? 'Submit' : 'Update'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default InvestmentsForm;
