import CustomSwitch from '@base/components/CustomSwitch';
import Authorization from '@modules/auth/components/Authorization';
import { getAccess } from '@modules/auth/lib/utils';
import { Button, Drawer, Form, PaginationProps, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useUpdatePermission } from '../lib/hooks';
import { IPermission } from '../lib/interfaces';
import { PermissionsService } from '../lib/service';
import PermissionsForm from './PermissionsForm';

interface IProps {
  data: IPermission[];
  loading: boolean;
  pagination: PaginationProps;
}

const PermissionsList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [updateFormInstance] = Form.useForm();
  const [messageApi, messageCtx] = message.useMessage();

  // Permission update functionalities
  const [updateItem, setUpdateItem] = useState<IPermission>(null);
  const updatePermission = useUpdatePermission({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        setUpdateItem(null);
        messageApi.success(res?.message);
        updateFormInstance.resetFields();
      },
    },
  });

  // Permission table data source config
  const dataSource = data?.map((x) => ({
    key: x.id,
    id: x.id,
    title: x.title,
    permissionType: x.permissionType?.title,
    isActive: x.isActive,
  }));

  const columns: ColumnsType<(typeof dataSource)[number]> = [
    {
      title: 'S/N',
      key: 'index',
      render: (_, __, index) => (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'permission Type',
      dataIndex: 'permissionType',
      key: 'permissionType',
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
              getAccess(['role-manager-permissions:update'], () => {
                updatePermission.mutate({
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
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id) => (
        <Authorization allowedAccess={['role-manager-permissions:update']}>
          <Button
            style={{ fontSize: 20, borderRadius: 5 }}
            onClick={async () => {
              const data = await PermissionsService.findById(id);
              setUpdateItem(data?.data);
            }}
          >
            <AiFillEdit />
          </Button>
        </Authorization>
      ),
    },
  ];
  // Permission table data source config end

  return (
    <React.Fragment>
      {messageCtx}
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={pagination} />
      <Drawer
        title="Update this Permission"
        open={updateItem?.id ? true : false}
        onClose={() => setUpdateItem({} as IPermission)}
      >
        <PermissionsForm
          form={updateFormInstance}
          initialValues={{
            ...updateItem,
            permissionType: updateItem?.permissionType?.id,
          }}
          loading={updatePermission.isPending}
          onFinish={(values) =>
            updatePermission.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default PermissionsList;
