import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import PageHeader from '@base/components/PageHeader';
import { TId } from '@base/interfaces';
import { months } from '@lib/data/months';
import { Toolbox } from '@lib/utils';
import { Button, Col, Form, InputNumber, message, PaginationProps, Row, Select, Table, TableColumnsType } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { ProjectsHooks } from '../lib/hooks';

interface IProps {
  isLoading: boolean;
  data: { id: TId; month: string; year: number; amount: number }[];
  pagination: PaginationProps;
}

const ProjectsProfitShare: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const { projectId } = router.query;
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();

  const profitShareCreateFn = ProjectsHooks.useCreateShareProfit({
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

  const dataSource = data?.map((elem) => ({
    key: elem?.id,
    id: elem?.id,
    month: elem?.month,
    year: elem?.year,
    amount: elem?.amount,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'month',
      dataIndex: 'month',
      title: 'Month',
    },
    {
      key: 'year',
      dataIndex: 'year',
      title: 'Year',
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Amount',
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <PageHeader
        extra={
          <Button type="primary" onClick={() => setDrawerOpen(true)}>
            Create
          </Button>
        }
      />
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: true }}
      />
      <BaseModalWithoutClicker
        destroyOnClose
        title="Profit Share"
        width={450}
        open={isDrawerOpen}
        onCancel={() => setDrawerOpen(false)}
        footer={null}
      >
        <Form
          form={formInstance}
          size="large"
          onFinish={(values) => profitShareCreateFn.mutate({ id: projectId as any, data: values })}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="month"
                rules={[
                  {
                    required: true,
                    message: 'Month is required!',
                  },
                ]}
                className="!mb-0"
              >
                <Select
                  showSearch
                  virtual={false}
                  placeholder="Month"
                  filterOption={(input, option: any) => option?.label?.toLowerCase()?.includes(input?.toLowerCase())}
                  options={months.map((month) => ({
                    key: month.value,
                    label: Toolbox.toCapitalizeText(month.label),
                    value: month.value,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item
                name="year"
                rules={[
                  {
                    required: true,
                    message: 'Year is required!',
                  },
                  {
                    type: 'number',
                    min: 1900,
                    max: new Date().getFullYear(),
                    message: 'Please enter a valid 4 digit year!',
                  },
                ]}
                className="!mb-0"
              >
                <InputNumber className="w-full" placeholder="Year" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.List name="returnAmount" initialValue={[{}]}>
                {(fields, { add, remove }) => {
                  return (
                    <div className="space-y-4">
                      {fields.map(({ key, name, ...rest }) => (
                        <div
                          key={key}
                          className="relative p-4 border border-dashed border-[var(--color-primary)] rounded-md"
                        >
                          <Row gutter={[16, 16]}>
                            <p className="absolute top-0 left-4 -translate-y-1/2 bg-[var(--color-primary)] px-1.5 py-0.5 text-xs text-white rounded-md">
                              Variation {fields.length > 1 ? name + 1 : ''}
                            </p>
                            <Col xs={24} md={12}>
                              <Form.Item
                                {...rest}
                                name={[name, 'lockedPeriod']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Period is required!',
                                  },
                                ]}
                                className="!mb-0"
                              >
                                <Select
                                  showSearch
                                  allowClear
                                  virtual={false}
                                  placeholder="Period"
                                  filterOption={(input, option: any) =>
                                    option?.title.toLowerCase().includes(input.toLowerCase())
                                  }
                                >
                                  <Select.Option value={3}>3 Months</Select.Option>
                                  <Select.Option value={6}>6 Months</Select.Option>
                                  <Select.Option value={12}>12 Months</Select.Option>
                                </Select>
                              </Form.Item>
                            </Col>
                            <Col xs={24} md={12}>
                              <Form.Item
                                {...rest}
                                name={[name, 'profitPercentage']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'Profit Percentage is required!',
                                  },
                                ]}
                                className="!mb-0"
                              >
                                <InputNumber placeholder="Profit Percentage" className="w-full" />
                              </Form.Item>
                            </Col>
                          </Row>
                          <div className="flex justify-center gap-4 mt-8">
                            <Button
                              size="small"
                              type="primary"
                              ghost
                              onClick={() => add()}
                              disabled={name + 1 !== fields.length}
                            >
                              Add More
                            </Button>
                            <Button
                              size="small"
                              type="dashed"
                              onClick={() => remove(name)}
                              disabled={fields.length < 2}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </Form.List>
            </Col>
            <Col xs={24}>
              <Form.Item className="!mb-0">
                <Button type="primary" htmlType="submit" loading={false} className="w-full">
                  Share
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </BaseModalWithoutClicker>
    </React.Fragment>
  );
};

export default ProjectsProfitShare;
