import CustomSwitch from '@base/components/CustomSwitch';
import { Toolbox } from '@lib/utils';
import { ENUM_PAYMENT_STATUSES } from '@modules/admin/investments/lib/enums';
import { getAccess } from '@modules/auth/lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, Image, Modal, Space, Table, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { UserVerificationRequestsHooks } from '../lib/hooks';
import { IUserVerificationRequest } from '../lib/interfaces';
import UserVerificationRequestsFilter from './UserVerificationRequestsFilter';
import UserVerificationRequestsForm from './UserVerificationRequestsForm';

interface IProps {
  isLoading: boolean;
  data: IUserVerificationRequest[];
  pagination: PaginationProps;
}

const UserVerificationRequestsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [viewFormInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<IUserVerificationRequest>(null);
  const [viewItem, setViewItem] = useState<IUserVerificationRequest>(null);

  const statusColors = {
    Pending: 'orange',
    Approved: 'green',
    Declined: 'red',
  };

  const userVerificationRequestUpdateFn = UserVerificationRequestsHooks.useUpdate({
    config: {
      onSuccess: (res) => {
        if (!res.success) {
          messageApi.error(res.message);
          return;
        }

        setUpdateItem(null);
        setViewItem(null);
        messageApi.success(res.message);
      },
    },
  });

  const dataSource = data?.map((elem) => ({
    ...elem,
    key: elem?.id,
    id: elem?.id,
    name: elem?.title,
    status: elem?.status,
    isActive: elem?.isActive,
    createdAt: elem?.createdAt,
    createdBy: elem?.createdBy?.name,
    updatedAt: elem?.updatedAt,
    updatedBy: elem?.updatedBy?.name,
  }));

  const columns: TableColumnsType<(typeof dataSource)[number]> = [
    {
      key: 'content',
      dataIndex: 'content',
      title: 'Content',
      render: (content) => <Image src={content} alt="" className="!h-16 !w-16" />,
    },
    {
      key: 'name',
      dataIndex: ['user', 'username'],
      title: 'Username',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Title',
    },
    {
      key: 'contentType',
      dataIndex: 'contentType',
      title: 'Content Type',
    },
    {
      key: 'identificationNumber',
      dataIndex: 'identificationNumber',
      title: 'Identification Number',
      render: (identificationNumber) => identificationNumber || 'N/A',
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
      key: 'isActive',
      dataIndex: 'isActive',
      title: 'Active',
      render: (isActive, record) => {
        return (
          <CustomSwitch
            checked={isActive}
            onChange={(checked) => {
              getAccess(['user-verification-requests:update'], () => {
                userVerificationRequestUpdateFn.mutate({
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
      render: (id, record) => (
        <Space>
          {/* <Button
            onClick={() => {
              const item = data?.find((item) => item.id === id);
              setViewItem(item);
            }}
          >
            View
          </Button> */}
          <Button
            onClick={() => {
              getAccess(['user-verification-requests:update'], () => {
                const item = data?.find((item) => item.id === id);
                setUpdateItem(item);
              });
            }}
          >
            <AiFillEdit />
          </Button>
          <Space direction="vertical">
            <Button
              disabled={[ENUM_PAYMENT_STATUSES.Approved, ENUM_PAYMENT_STATUSES.Declined].includes(
                record?.status as any,
              )}
              onClick={() => {
                userVerificationRequestUpdateFn.mutate({
                  id,
                  data: { status: ENUM_PAYMENT_STATUSES.Approved },
                });
              }}
            >
              Approve
            </Button>
            <Button
              disabled={[ENUM_PAYMENT_STATUSES.Approved, ENUM_PAYMENT_STATUSES.Declined].includes(
                record?.status as any,
              )}
              onClick={() => {
                userVerificationRequestUpdateFn.mutate({
                  id,
                  data: { status: ENUM_PAYMENT_STATUSES.Declined },
                });
              }}
            >
              Decline
            </Button>
          </Space>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <UserVerificationRequestsFilter
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
      <Modal width={640} title={viewItem?.title} open={!!viewItem?.id} onCancel={() => setViewItem(null)} footer={null}>
        <UserVerificationRequestsForm
          formType="view"
          form={viewFormInstance}
          initialValues={viewItem}
          isLoading={userVerificationRequestUpdateFn.isPending}
          onFinish={(values) =>
            userVerificationRequestUpdateFn.mutate({
              id: viewItem?.id,
              data: values,
            })
          }
        />
      </Modal>
      <Drawer
        width={640}
        title={`Update ${updateItem?.title}`}
        open={!!updateItem?.id}
        onClose={() => setUpdateItem(null)}
      >
        <UserVerificationRequestsForm
          formType="update"
          form={formInstance}
          initialValues={updateItem}
          isLoading={userVerificationRequestUpdateFn.isPending}
          onFinish={(values) =>
            userVerificationRequestUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default UserVerificationRequestsList;
