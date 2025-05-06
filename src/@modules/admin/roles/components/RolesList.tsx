import CustomSwitch from '@base/components/CustomSwitch';
import { Paths } from '@lib/constant';
import Authorization from '@modules/auth/components/Authorization';
import { getAccess } from '@modules/auth/lib/utils';
import { Button, Drawer, Form, PaginationProps, Space, Table, message } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaEdit } from 'react-icons/fa';
import { useUpdateRole } from '../lib/hooks';
import { IRole } from '../lib/interfaces';
import { RoleService } from '../lib/service';
import RolesForm from './RolesForm';

interface IProps {
  data: IRole[];
  loading: boolean;
  pagination: PaginationProps;
}

const RolesList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [updateFormInstance] = Form.useForm();
  const [messageApi, messageCtx] = message.useMessage();

  // Role update functionalities
  const [updateItem, setUpdateItem] = useState<IRole>(null);
  const updateRole = useUpdateRole({
    config: {
      onSuccess: (res) => {
        if (!res?.success) return;
        setUpdateItem(null);
        messageApi.success(res?.message);
        updateFormInstance.resetFields();
      },
    },
  });

  // Role table data source config
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
              getAccess(['role-manager-roles:update'], () => {
                updateRole.mutate({
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
        <Authorization allowedAccess={['role-manager-roles:update']}>
          <Space>
            <Button
              style={{ fontSize: 20, borderRadius: 5 }}
              onClick={async () => {
                const data = await RoleService.findById(id);
                setUpdateItem(data?.data);
              }}
            >
              <AiFillEdit />
            </Button>
            <Link href={Paths.admin.roles.editPermissions(id)}>
              <Button className="flex items-center justify-center gap-1" icon={<FaEdit size={16} />}>
                Edit Permission
              </Button>
            </Link>
          </Space>
        </Authorization>
      ),
    },
  ];
  // Role table data source config end

  return (
    <React.Fragment>
      {messageCtx}

      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={pagination} />
      <Drawer title="Update this Role" open={updateItem?.id ? true : false} onClose={() => setUpdateItem({} as IRole)}>
        <RolesForm
          form={updateFormInstance}
          initialValues={updateItem}
          loading={updateRole.isPending}
          onFinish={(values) =>
            updateRole.mutateAsync({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default RolesList;
