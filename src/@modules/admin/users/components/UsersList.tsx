import CustomSwitch from '@base/components/CustomSwitch';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { getAccess } from '@modules/auth/lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, Space, Table, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { UsersHooks } from '../lib/hooks';
import { IUser } from '../lib/interfaces';
import UsersFilter from './UsersFilter';
import UsersForm from './UsersForm';

interface IProps {
  isLoading: boolean;
  data: IUser[];
  pagination: PaginationProps;
}

const UsersList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<IUser>(null);

  const userUpdateFn = UsersHooks.useUpdate({
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
    key: elem?.id,
    id: elem?.id,
    username: elem?.username,
    name: elem?.name,
    phone: elem?.phoneNumber,
    email: elem?.email,
    balance: elem?.balance,
    totalEarned: elem?.totalEarned,
    totalInvested: elem?.totalInvested,
    totalWithdrawed: elem?.totalWithdrawed,
    referredBy: elem?.referredBy,
    isKYCVerified: elem?.isKYCVerified,
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
      render: (_, record) => {
        return (
          <React.Fragment>
            <Tag color={record?.isKYCVerified ? 'green' : 'yellow'}>
              {record?.isKYCVerified ? 'Verified' : 'Unverified'}
            </Tag>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Username:</p>
              <p>{record?.username}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Name:</p>
              <p>{record?.name}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Balance:</p>
              <p>{record?.balance}</p>
            </div>
          </React.Fragment>
        );
      },
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: 'Phone / Email',
      render: (_, record) => {
        return (
          <React.Fragment>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Phone:</p>
              <p>{record?.phone || 'N/A'}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Email:</p>
              <p>{record?.email}</p>
            </div>
          </React.Fragment>
        );
      },
    },
    {
      key: 'amount',
      dataIndex: 'totalEarned',
      title: 'Amount',
      render: (_, record) => {
        return (
          <React.Fragment>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Earned:</p>
              <p>{record?.totalEarned}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Withdrawed:</p>
              <p>{record?.totalWithdrawed}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Invested:</p>
              <p>{record?.totalInvested}</p>
            </div>
          </React.Fragment>
        );
      },
    },
    {
      key: 'referredBy',
      dataIndex: 'referredBy',
      title: 'Referred',
      render: (_, record) => {
        return (
          <React.Fragment>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Username:</p>
              <p>{record?.referredBy?.username}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="font-medium">Name:</p>
              <p>{record?.referredBy?.name}</p>
            </div>
          </React.Fragment>
        );
      },
    },
    // {
    //   key: 'createdAt',
    //   dataIndex: 'createdAt',
    //   title: 'History',
    //   render: (_, record) => {
    //     return (
    //       <React.Fragment>
    //         {record?.createdAt && (
    //           <div className="flex justify-between gap-2">
    //             <p className="font-medium">Created At:</p>
    //             <p>{dayjs(record?.createdAt).format('DD-MM-YYYY hh:mm:ss a')}</p>
    //           </div>
    //         )}

    //         {record?.createdBy && (
    //           <div className="flex justify-between gap-2">
    //             <p className="font-medium">Created By:</p>
    //             <p>{record?.createdBy}</p>
    //           </div>
    //         )}

    //         {record?.updatedAt && record?.updatedBy && (
    //           <div className="flex justify-between gap-2">
    //             <p className="font-medium">Updated At:</p>
    //             <p>{dayjs(record?.updatedAt).format('DD-MM-YYYY hh:mm:ss a')}</p>
    //           </div>
    //         )}

    //         {record?.updatedBy && (
    //           <div className="flex justify-between gap-2">
    //             <p className="font-medium">Updated By:</p>
    //             <p>{record?.updatedBy}</p>
    //           </div>
    //         )}
    //       </React.Fragment>
    //     );
    //   },
    // },
    {
      key: 'isActive',
      dataIndex: 'isActive',
      title: 'Active',
      render: (isActive, record) => {
        return (
          <CustomSwitch
            checked={isActive}
            onChange={(checked) => {
              getAccess(['users:update'], () => {
                userUpdateFn.mutate({
                  id: record?.id,
                  data: {
                    isActive: checked,
                  },
                });
              });
            }}
          />
        );
      },
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
              getAccess(['users:update'], () => {
                const item = data?.find((item) => item.id === id);
                setUpdateItem(item);
              });
            }}
          >
            <AiFillEdit />
          </Button>
          <Button onClick={() => router.push(Paths.admin.users.transactions(id))}>Transactions</Button>
          <Button onClick={() => router.push(Paths.admin.users.referrals(id))}>Referrals</Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <UsersFilter
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
        title={`Update ${updateItem?.name}`}
        open={!!updateItem?.id}
        onClose={() => setUpdateItem(null)}
      >
        <UsersForm
          formType="update"
          form={formInstance}
          initialValues={{
            ...updateItem,
            roles: updateItem?.roles?.map((role) => role?.id) as any,
          }}
          isLoading={userUpdateFn.isPending}
          onFinish={(values) =>
            userUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default UsersList;
