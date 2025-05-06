import CustomSwitch from '@base/components/CustomSwitch';
import Authorization from '@modules/auth/components/Authorization';
import { getAccess } from '@modules/auth/lib/utils';
import { Button, Drawer, Form, PaginationProps, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { useUpdatePermissionType } from '../lib/hooks';
import { IPermissionType } from '../lib/interfaces';
import { PermissionTypesService } from '../lib/service';
import PermissionTypesForm from './PermissionTypesForm';

interface IProps {
  data?: IPermissionType[];
  loading: boolean;
  pagination?: PaginationProps;
}

const PermissionTypesList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [updateFormInstance] = Form.useForm();

  // PermissionType update functionalities
  const [updateItem, setUpdateItem] = useState<IPermissionType>(null);
  const updatePermissionType = useUpdatePermissionType({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        setUpdateItem(null);
        messageApi.success(res?.message);
        updateFormInstance.resetFields();
      },
    },
  });

  // PermissionType table data source config
  const dataSource = data?.map((x) => ({
    key: x.id,
    id: x.id,
    title: x.title,
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
      key: 'isActive',
      dataIndex: 'isActive',
      title: 'Active',
      render: (isActive, record) => {
        return (
          <CustomSwitch
            checked={isActive}
            onChange={(checked) => {
              getAccess(['role-manager-permission-types:update'], () => {
                updatePermissionType.mutate({
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
        <Authorization allowedAccess={['role-manager-permission-types:update']}>
          <Button
            style={{ fontSize: 20, borderRadius: 5 }}
            onClick={async () => {
              const data = await PermissionTypesService.findById(id);
              setUpdateItem(data?.data);
            }}
          >
            <AiFillEdit />
          </Button>
        </Authorization>
      ),
    },
  ];
  // PermissionType table data source config end

  return (
    <React.Fragment>
      {messageCtx}
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={pagination} />
      <Drawer
        title="Update this PermissionType"
        open={updateItem?.id ? true : false}
        onClose={() => setUpdateItem({} as IPermissionType)}
      >
        <PermissionTypesForm
          form={updateFormInstance}
          initialValues={updateItem}
          loading={updatePermissionType.isPending}
          onFinish={(values) =>
            updatePermissionType.mutateAsync({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default PermissionTypesList;
