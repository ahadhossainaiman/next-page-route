import BaseExpandableTable from '@base/components/BaseExpandableTable';
import { IWithdraw } from '@modules/admin/withdraws/lib/interfaces';
import type { PaginationProps, TableColumnsType } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface IProps {
  isLoading: boolean;
  data: IWithdraw[];
  pagination: PaginationProps;
}

const WithdrawsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
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
      key: 'withdrawFund',
      dataIndex: 'withdrawFund',
      title: 'Withdraw Fund',
    },
    {
      key: 'amount',
      dataIndex: 'amount',
      title: 'Amount',
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
      key: 'note',
      dataIndex: 'note',
      title: 'Note',
    },
    {
      key: 'approvedAt',
      dataIndex: 'approvedAt',
      title: 'Approved At',
      render: (date) => (date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss a') : '-'),
    },
  ];

  return (
    <BaseExpandableTable
      loading={isLoading}
      dataSource={dataSource}
      columns={columns as any}
      pagination={pagination}
      scroll={{ x: true }}
      className="transparent_table"
    />
  );
};

export default WithdrawsList;
