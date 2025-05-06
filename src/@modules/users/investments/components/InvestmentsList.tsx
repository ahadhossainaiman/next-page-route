import BaseExpandableTable from '@base/components/BaseExpandableTable';
import BaseModalWithoutClicker from '@base/components/BaseModalWithoutClicker';
import { InvestmentsHooks } from '@modules/admin/investments/lib/hooks';
import { IInvestment } from '@modules/admin/investments/lib/interfaces';
import InvestPaymentForm from '@modules/projects/InvestPaymentForm';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Form, message, Tag } from 'antd';
import React, { useState } from 'react';

interface IProps {
  isLoading: boolean;
  data: IInvestment[];
  pagination: PaginationProps;
}

const InvestmentsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const [investment, setInvestment] = useState<IInvestment>(null);
  const [paymentFormInstance] = Form.useForm();
  const [messageApi, messageHolder] = message.useMessage();

  const statusColors = {
    CLOSE: 'orange',
    OPEN: 'green',
  };

  const investmentPaymentCreateFn = InvestmentsHooks.useCreatePayment({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        paymentFormInstance.resetFields();
        messageApi.success(res.message);
        setInvestment(null);
      },
    },
  });

  const dataSource = data?.map((elem) => ({
    key: elem?.id,
    id: elem?.id,
    name: elem?.project?.title,
    investmentAmount: elem?.investmentAmount,
    profitAmount: elem?.profitAmount,
    returnRate: elem?.returnRate,
    lockedPeriod: elem?.lockedPeriod,
    profitReturnCount: elem?.profitReturnCount,
    effectiveFrom: elem?.effectiveFrom,
    ageInDays: elem?.ageInDays,
    isMatured: elem?.isMatured,
    hasWithdrawn: elem?.hasWithdrawn,
    status: elem?.status,
    paymentStatus: elem?.paymentStatus,
    isActive: elem?.isActive,
    createdAt: elem?.createdAt,
    createdBy: elem?.createdBy?.name,
    updatedAt: elem?.updatedAt,
    updatedBy: elem?.updatedBy?.name,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Name',
    },
    {
      key: 'investmentAmount',
      dataIndex: 'investmentAmount',
      title: 'Investment Amount',
    },
    {
      key: 'lockedPeriod',
      dataIndex: 'lockedPeriod',
      title: 'Locked Period',
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
      render: (status) => (
        <Tag className="me-0" color={statusColors[status] || 'default'}>
          {status}
        </Tag>
      ),
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Action',
      align: 'center',
      render: (id, record) => (
        <Button onClick={() => setInvestment(record as any)} disabled={record?.paymentStatus !== 'Pending'}>
          Pay
        </Button>
      ),
    },
  ];

  return (
    <>
      {messageHolder}
      <BaseExpandableTable
        loading={isLoading}
        dataSource={dataSource}
        columns={columns as any}
        pagination={pagination}
        scroll={{ x: true }}
        className="transparent_table"
      />
      <BaseModalWithoutClicker
        destroyOnClose
        title="Make Payment"
        width={520}
        open={!!investment}
        onCancel={() => setInvestment(null)}
        footer={null}
      >
        <InvestPaymentForm
          form={paymentFormInstance}
          isLoading={investmentPaymentCreateFn.isPending}
          initialValues={{ investmentAmount: investment?.investmentAmount }}
          onFinish={(values) => investmentPaymentCreateFn.mutate({ id: investment?.id, data: values })}
        />
      </BaseModalWithoutClicker>
    </>
  );
};

export default InvestmentsList;
