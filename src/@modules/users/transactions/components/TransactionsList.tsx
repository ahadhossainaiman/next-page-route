import BaseExpandableTable from '@base/components/BaseExpandableTable';
import { ENUM_USERS_TYPES } from '@modules/admin/users/lib/enums';
import { useAuthSession } from '@modules/auth/lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Popover, Table } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { ITransaction } from '../lib/interfaces';

interface IProps {
  isLoading: boolean;
  data: ITransaction[];
  pagination: PaginationProps;
}

const TransactionsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const { user } = useAuthSession();

  const dataSource = data?.map((elem) => ({
    ...elem,
    key: elem?.id,
    id: elem?.id,
    amount: elem?.amount,
    approvedAt: elem?.approvedAt,
    transactionFor: elem?.transactionFor,
    transactionType: elem?.transactionType,
    transactionTime: elem?.transactionTime,
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
      key: 'transactionType',
      dataIndex: 'transactionType',
      title: 'Transaction Type',
    },
    {
      key: 'transactionFor',
      dataIndex: 'transactionFor',
      title: 'Transaction For',
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
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
    },
    {
      title: 'Currency Unit',
      dataIndex: 'currencyUnit',
      key: 'currencyUnit',
    },
    {
      key: 'approvedAt',
      dataIndex: 'approvedAt',
      title: 'Approved At',
      render: (date) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss a') : '-'),
    },
    {
      key: 'approvedBy',
      dataIndex: 'approvedBy',
      title: 'Approved',
      render: (approvedBy) => approvedBy?.username || 'N/A',
    },
    {
      key: 'transactionTime',
      dataIndex: 'transactionTime',
      title: 'Transaction Time',
      render: (date) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss a') : '-'),
    },
  ];

  return user?.type === ENUM_USERS_TYPES.Customer ? (
    <BaseExpandableTable
      loading={isLoading}
      dataSource={dataSource}
      columns={columns as any}
      pagination={pagination}
      scroll={{ x: true }}
      className="transparent_table"
    />
  ) : (
    <Table loading={isLoading} dataSource={dataSource} columns={columns} pagination={pagination} scroll={{ x: true }} />
  );
};

export default TransactionsList;
