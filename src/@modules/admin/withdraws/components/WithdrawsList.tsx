import { Toolbox } from '@lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, Popover, Space, Table, message } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { WithdrawsHooks } from '../lib/hooks';
import { IWithdraw } from '../lib/interfaces';
import WithdrawsFilter from './WithdrawsFilter';
import WithdrawsForm from './WithdrawsForm';

interface IProps {
  isLoading: boolean;
  data: IWithdraw[];
  pagination: PaginationProps;
}

const WithdrawsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<IWithdraw>(null);

  const withdrawUpdateFn = WithdrawsHooks.useUpdate({
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
    isActive: elem?.isActive,
    createdAt: elem?.createdAt,
    createdBy: elem?.createdBy?.name,
    updatedAt: elem?.updatedAt,
    updatedBy: elem?.updatedBy?.name,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'name',
      dataIndex: ['user', 'username'],
      title: 'Username',
    },
    {
      key: 'withdrawFund',
      dataIndex: 'withdrawFund',
      title: 'Withdraw Fund',
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Amount',
      render: (_, record) => (
        <p className="flex flex-wrap items-center gap-1">
          {record?.amount}
          {record?.note && (
            <Popover content={<>{record?.note}</>}>
              <FaInfoCircle style={{ cursor: 'pointer' }} />
            </Popover>
          )}
        </p>
      ),
    },
    {
      key: 'wallet',
      dataIndex: ['wallet', 'address'],
      title: 'Wallet',
    },
    {
      title: 'Coin',
      dataIndex: ['wallet', 'coin'],
      key: 'coin',
    },
    {
      title: 'Currency Unit',
      dataIndex: ['wallet', 'currencyUnit'],
      key: 'currencyUnit',
    },
    {
      key: 'transactionTime',
      dataIndex: 'transactionTime',
      title: 'Transaction Time',
      render: (date) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss a') : '-'),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Status',
    },
    {
      key: 'approvedAt',
      dataIndex: 'approvedAt',
      title: 'Approved At',
      render: (date) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss a') : '-'),
    },
    {
      key: 'id',
      dataIndex: 'id',
      title: 'Action',
      align: 'center',
      render: (id) => (
        <Space direction="vertical">
          <Button
            onClick={() => {
              withdrawUpdateFn.mutate({
                id,
                data: { status: 'APPROVED' },
              });
            }}
          >
            Approve
          </Button>
          <Button
            onClick={() => {
              withdrawUpdateFn.mutate({
                id,
                data: { status: 'DECLINED' },
              });
            }}
          >
            Decline
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <WithdrawsFilter
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
        scroll={{ x: true }}
      />
      <Drawer
        width={640}
        // title={`Update ${updateItem?.title}`}
        open={!!updateItem?.id}
        onClose={() => setUpdateItem(null)}
      >
        <WithdrawsForm
          formType="update"
          form={formInstance}
          initialValues={updateItem as any}
          isLoading={withdrawUpdateFn.isPending}
          onFinish={(values) =>
            withdrawUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default WithdrawsList;
