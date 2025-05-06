import CustomSwitch from '@base/components/CustomSwitch';
import { Paths } from '@lib/constant';
import { Toolbox } from '@lib/utils';
import { getAccess } from '@modules/auth/lib/utils';
import type { PaginationProps, TableColumnsType } from 'antd';
import { Button, Drawer, Form, Space, Table, Tag, message } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaEye } from 'react-icons/fa';
import { ProjectsHooks } from '../lib/hooks';
import { IProject } from '../lib/interfaces';
import ProjectsFilter from './ProjectsFilter';
import ProjectsForm from './ProjectsForm';

interface IProps {
  isLoading: boolean;
  data: IProject[];
  pagination: PaginationProps;
}

const ProjectsList: React.FC<IProps> = ({ isLoading, data, pagination }) => {
  const router = useRouter();
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const [updateItem, setUpdateItem] = useState<IProject>(null);

  const statusColors = {
    CLOSE: 'orange',
    OPEN: 'green',
  };

  const projectUpdateFn = ProjectsHooks.useUpdate({
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
    name: elem?.title,
    value: elem?.value,
    status: elem?.status,
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
      key: 'code',
      dataIndex: 'code',
      title: 'Code',
      render: (code) => code || 'N/A',
    },
    {
      key: 'investmentReceived',
      dataIndex: 'investmentReceived',
      title: 'Investment Received',
    },
    {
      key: 'profitShared',
      dataIndex: 'profitShared',
      title: 'Profit Shared',
    },
    {
      key: 'totalInvestor',
      dataIndex: 'totalInvestor',
      title: 'Total Investor',
    },
    {
      key: 'value',
      dataIndex: 'value',
      title: 'value',
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
              getAccess(['projects:update'], () => {
                projectUpdateFn.mutate({
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
        <Space>
          <Button onClick={() => router.push(Paths.admin.projects.toDetails(id))}>
            <FaEye />
          </Button>
          <Button
            onClick={() => {
              getAccess(['projects:update'], () => {
                const item = data?.find((item) => item.id === id);
                setUpdateItem(item);
              });
            }}
          >
            <AiFillEdit />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageHolder}
      <ProjectsFilter
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
        title={`Update ${updateItem?.title}`}
        open={!!updateItem?.id}
        onClose={() => setUpdateItem(null)}
      >
        <ProjectsForm
          formType="update"
          form={formInstance}
          initialValues={updateItem}
          isLoading={projectUpdateFn.isPending}
          onFinish={(values) =>
            projectUpdateFn.mutate({
              id: updateItem?.id,
              data: values,
            })
          }
        />
      </Drawer>
    </React.Fragment>
  );
};

export default ProjectsList;
