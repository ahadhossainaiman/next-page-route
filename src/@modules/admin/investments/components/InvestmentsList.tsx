import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { getAccess } from '@modules/auth/lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, Space, Table, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { InvestmentsHooks } from '../lib/hooks';
import { IInvestment } from '../lib/interfaces';
import InvestmentsFilter from './InvestmentsFilter';
import InvestmentsForm from './InvestmentsForm';

interface IProps {
  isLoading: boolean;
  data: IInvestment[];
  pagination: PaginationProps;
}

const InvestmentsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<IInvestment>(null);

  const investmentUpdateFn = InvestmentsHooks.useUpdate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setUpdateItem(null);
        messageApi.success(res.message);
      },
    },
  });

  const dataSource = data?.map((elem) => ({
    ...elem,
    key: elem?.id,
    id: elem?.id,
    name: elem?.project?.title,
    investor: elem?.user?.username,
    investedAmount: elem?.investmentAmount,
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
      render: (name, record) => (
        <p>
          {name} ({record?.project?.code || 'N/A'})
        </p>
      ),
    },
    { key: 'investor', dataIndex: 'investor', title: 'Investor' },
    { key: 'investedAmount', dataIndex: 'investedAmount', title: 'Invested Amount' },
    { key: 'profitAmount', dataIndex: 'profitAmount', title: 'Profit Amount' },
    // { key: 'returnRate', dataIndex: 'returnRate', title: 'Return Rate' },
    { key: 'lockedPeriod', dataIndex: 'lockedPeriod', title: 'Locked Period' },
    { key: 'profitReturnCount', dataIndex: 'profitReturnCount', title: 'Profit Returns' },
    { key: 'effectiveFrom', dataIndex: 'effectiveFrom', title: 'Effective From' },
    { key: 'ageInDays', dataIndex: 'ageInDays', title: 'Age (Days)' },
    { key: 'isMatured', dataIndex: 'isMatured', title: 'Matured', render: (val) => (val ? 'Yes' : 'No') },
    { key: 'hasWithdrawn', dataIndex: 'hasWithdrawn', title: 'Withdrawn', render: (val) => (val ? 'Yes' : 'No') },
    { key: 'status', dataIndex: 'status', title: 'Status' },
    { key: 'paymentStatus', dataIndex: 'paymentStatus', title: 'Payment Status' },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Action',
      align: 'center',
      render: (id) => (
        <Space>
          <Button
            onClick={() => {
              getAccess(['investments:update'], () => {
                const item = data?.find((item) => item.id === id);
                setUpdateItem(item);
              });
            }}
          >
            <AiFillEdit />
          </Button>
          <Button onClick={() => router.push(Paths.admin.investments.toPayments(id))}>Payments</Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <InvestmentsFilter
        initialValues={Toolbox.toCleanObject(router.query)}
        onChange={(values) => {
          router.push({
            query: Toolbox.toCleanObject({ ...router.query, ...values }),
          });
        }}
      />
      <Table
        loading={isLoading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: 'max-content' }}
      />
      <Drawer
        width={640}
        title={`Update ${updateItem?.project?.title}`}
        open={!!updateItem?.id}
        onClose={() => setUpdateItem(null)}
      >
        <InvestmentsForm
          formType="update"
          form={formInstance}
          initialValues={updateItem as any}
          isLoading={investmentUpdateFn.isPending}
          onFinish={(values) =>
            investmentUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default InvestmentsList;
