import { IUser } from '@modules/admin/users/lib/interfaces';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Table } from 'antd';
import React from 'react';

interface IProps {
  isLoading: boolean;
  data: IUser[];
  pagination: PaginationProps;
}

const ProjectsInvestorsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const dataSource = data?.map((elem) => ({
    key: elem?.id,
    id: elem?.id,
    name: elem?.name,
    phone: elem?.phoneNumber,
    email: elem?.email,
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
      key: 'phone',
      dataIndex: 'phone',
      title: 'Phone',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
    },
  ];

  return (
    <Table loading={isLoading} dataSource={dataSource} columns={columns} pagination={pagination} scroll={{ x: true }} />
  );
};

export default ProjectsInvestorsList;
